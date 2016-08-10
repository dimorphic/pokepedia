const dbConfig = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/pokepedia';

export default dbConfig;
