import type { CreateIndexOptions} from '@pinecone-database/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import type { VectorDBClient } from './VectorDBClient';

export class PineconeVectorDBClient implements VectorDBClient {
  private pinecone: Pinecone;

  constructor(config: { apiKey: string; hostUrl: string }) {
    this.pinecone = new Pinecone({
      apiKey: config.apiKey,
      controllerHostUrl: config.hostUrl,
    });
  }

  async initIndex(_options: CreateIndexOptions): Promise<void> {
    await this.pinecone.createIndex({
      name: 'example',
      spec: {
        serverless: {
          cloud: 'aws',
          region: process.env.PINECONE_REGION || 'us-east-1',
        },
      },
    });
    throw new Error('not implemented');
  }
}
