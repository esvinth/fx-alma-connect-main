import { MongoClient, Collection, Db } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://alumini:alumini@cluster0.aipm5qd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'fx_alumni_connect';

let client: MongoClient | null = null;

export async function connectToDatabase() {
  try {
    if (!client) {
      client = await MongoClient.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    }
    return client.db(DB_NAME);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function getCollection<T>(collectionName: string): Promise<Collection<T>> {
  const db = await connectToDatabase();
  return db.collection<T>(collectionName);
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    console.log('Disconnected from MongoDB');
  }
}

// Helper function to handle database operations with error handling
export async function withDatabase<T>(
  operation: (db: Db) => Promise<T>
): Promise<T> {
  try {
    const db = await connectToDatabase();
    return await operation(db);
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}
