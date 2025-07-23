import type { CreateIndexOptions } from '@pinecone-database/pinecone';

export interface VectorDBClient {
  /** インデックス初期化 */
  initIndex(options: CreateIndexOptions): Promise<void>;
}
