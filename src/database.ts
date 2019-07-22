import * as mongoose from 'mongoose';
import { Logger } from '@overnightjs/logger';

export function start(url): Promise<typeof import('mongoose')> {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  return mongoose.connect(url);
}

export function disconnect(): Promise<void> {
  Logger.Imp('Disconnected from MongoDB.');
  return mongoose.disconnect();
}
