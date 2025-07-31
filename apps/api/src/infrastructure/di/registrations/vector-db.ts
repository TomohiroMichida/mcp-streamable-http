import { container } from 'tsyringe';
import { PineconeVectorDBClient } from '../../services/vector-db/PineconeVectorDBClient.interface';
import type { VectorDBClient } from '../../services/vector-db/VectorDBClient';

export function registerVectorDB() {
  container.register<VectorDBClient>('VectorDBClient', {
    useValue: new PineconeVectorDBClient({
      apiKey: process.env.PINECONE_API_KEY || 'not_needed_for_local',
      hostUrl: process.env.PINECONE_HOST_URL || 'http://localhost:5080',
    }),
  });
}
