import { container } from 'tsyringe';
import { PineconeVectorDBClient } from '../../infrastructure/vector-db/PineconeVectorDBClient.interface';
import type { VectorDBClient } from '../../infrastructure/vector-db/VectorDBClient';

export function registerVectorDB() {
  container.register<VectorDBClient>('VectorDBClient', {
    useValue: new PineconeVectorDBClient({
      apiKey: process.env.PINECONE_API_KEY || 'not_needed_for_local',
      hostUrl: process.env.PINECONE_HOST_URL || 'http://localhost:5080',
    }),
  });
}
