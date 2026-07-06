import { MongoClient } from 'mongodb';
import PROJECTS from '../src/projects.json' with { type: 'json' };

// Simple types for Vercel Serverless Functions
interface VercelRequest {
  method?: string;
  headers: { [key: string]: any };
  body: any;
  query: { [key: string]: string | string[] };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
  end: () => void;
}


let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(); // It will use database from connection string (like "portfolio" or default)

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('projects');

    // 1. GET Request - Get all projects
    if (req.method === 'GET') {
      let projects = await collection.find({}).toArray();

      // If DB is empty, seed it with projects from projects.json
      if (projects.length === 0) {
        const initial = PROJECTS.map((p, idx) => ({
          id: `project-${idx}-${Date.now()}`,
          title: p.title,
          desc: p.desc,
          tags: p.tags,
          github: p.github,
          live: p.live
        }));
        await collection.insertMany(initial);
        projects = initial;
      }

      // Format clean response
      const formattedProjects = projects.map((p: any) => ({
        id: p.id,
        title: p.title,
        desc: p.desc,
        tags: p.tags,
        github: p.github,
        live: p.live
      }));

      return res.status(200).json(formattedProjects);
    }

    // For POST, PUT, DELETE - Verify Admin Password
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured on the server.' });
    }

    if (!token || token !== adminPassword) {
      return res.status(401).json({ error: 'Ruxsat etilmagan: Parol noto\'g\'ri.' });
    }

    // 2. POST Request - Add new project
    if (req.method === 'POST') {
      const { id, title, desc, tags, github, live } = req.body;
      if (!title || !desc) {
        return res.status(400).json({ error: 'Sarlavha va Tavsif talab qilinadi.' });
      }

      const newProject = {
        id: id || `project-${Date.now()}`,
        title,
        desc,
        tags: Array.isArray(tags) ? tags : [],
        github: github || '#',
        live: live || '#'
      };

      await collection.insertOne(newProject);
      return res.status(201).json(newProject);
    }

    // 3. PUT Request - Update existing project
    if (req.method === 'PUT') {
      const { id, title, desc, tags, github, live } = req.body;
      if (!id || !title || !desc) {
        return res.status(400).json({ error: 'ID, Sarlavha va Tavsif talab qilinadi.' });
      }

      const result = await collection.findOneAndUpdate(
        { id: id },
        {
          $set: {
            title,
            desc,
            tags: Array.isArray(tags) ? tags : [],
            github: github || '#',
            live: live || '#'
          }
        },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({ error: 'Loyiha topilmadi.' });
      }

      // return document directly
      const updatedProj = {
        id,
        title,
        desc,
        tags: Array.isArray(tags) ? tags : [],
        github: github || '#',
        live: live || '#'
      };

      return res.status(200).json(updatedProj);
    }

    // 4. DELETE Request - Delete project
    if (req.method === 'DELETE') {
      const id = req.query.id as string || req.body.id;
      if (!id) {
        return res.status(400).json({ error: 'Loyiha ID si talab qilinadi.' });
      }

      const result = await collection.deleteOne({ id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Loyiha topilmadi.' });
      }

      return res.status(200).json({ message: 'Loyiha muvaffaqiyatli o\'chirildi.', id });
    }

    return res.status(405).json({ error: 'Metod ruxsat etilmagan.' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Server xatoligi: ' + error.message });
  }
}
