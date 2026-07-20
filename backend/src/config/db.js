import dns from 'dns';
import mongoose from 'mongoose';

// Router DNS often fails SRV lookups for MongoDB Atlas; use public resolvers.
dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDB(uri) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
}
