import 'reflect-metadata';
import { registerVectorDB } from './registrations/vector-db';
import { registerGenerativeAI } from './registrations/generative-ai';

export function configureContainer() {
  // ここにDIしたいサービスを追記する
  registerVectorDB();
  registerGenerativeAI();
}
