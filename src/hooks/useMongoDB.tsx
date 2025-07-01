
import { useState, useEffect } from 'react';
import { loginAnonymous, getCollection, watchCollection } from '@/services/mongodb';
import { useToast } from './use-toast';

export function useMongoDB<T = any>(
  collectionName: string,
  filter = {},
  realtime = true
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let isActive = true;
    let watcherCleanup: (() => void) | null = null;

    async function fetchData() {
      try {
        // Ensure we're logged in
        const user = await loginAnonymous();
        if (!user) {
          throw new Error("Failed to authenticate with MongoDB");
        }

        // Get the collection
        const collection = getCollection(collectionName);
        
        // Fetch initial data
        const initialData = await collection.find(filter);
        if (isActive) {
          setData(initialData);
          setLoading(false);
        }

        // Set up real-time updates if requested
        if (realtime) {
          // Fix the call to watchCollection with the correct parameters
          const watcher = await watchCollection(
            collectionName,
            (change) => {
              if (!isActive) return;
              
              // Handle different types of change events
              if (change.operationType === 'insert') {
                setData(prev => [...prev, change.fullDocument]);
                toast({
                  title: "New item added",
                  description: `A new item was added to ${collectionName}`,
                });
              } else if (change.operationType === 'update') {
                setData(prev => 
                  prev.map(item => 
                    // @ts-ignore - _id is not in the type but will be present in MongoDB documents
                    item._id === change.documentKey._id ? { ...item, ...change.updateDescription.updatedFields } : item
                  )
                );
              } else if (change.operationType === 'delete') {
                setData(prev => 
                  // @ts-ignore - _id is not in the type but will be present in MongoDB documents
                  prev.filter(item => item._id !== change.documentKey._id)
                );
              } else if (change.operationType === 'replace') {
                setData(prev => 
                  prev.map(item => 
                    // @ts-ignore - _id is not in the type but will be present in MongoDB documents
                    item._id === change.documentKey._id ? change.fullDocument : item
                  )
                );
              }
            }
          );
          
          watcherCleanup = () => {
            watcher?.return?.();
          };
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (isActive) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isActive = false;
      if (watcherCleanup) {
        watcherCleanup();
      }
    };
  }, [collectionName, JSON.stringify(filter), realtime, toast]);

  // Function to add a new document
  async function addDocument(document: Omit<T, '_id'>) {
    try {
      const collection = getCollection(collectionName);
      return await collection.insertOne(document);
    } catch (err) {
      console.error("Error adding document:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  }

  // Function to update a document
  async function updateDocument(id: string, update: Partial<T>) {
    try {
      const collection = getCollection(collectionName);
      return await collection.updateOne({ _id: id }, { $set: update });
    } catch (err) {
      console.error("Error updating document:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  }

  // Function to delete a document
  async function deleteDocument(id: string) {
    try {
      const collection = getCollection(collectionName);
      return await collection.deleteOne({ _id: id });
    } catch (err) {
      console.error("Error deleting document:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  }

  return {
    data,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument
  };
}
