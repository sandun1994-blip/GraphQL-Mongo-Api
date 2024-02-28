
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://sandun:${process.env.DB_PWD}@cluster0.u9m5bdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function setupDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log('start');
    await client.connect();
    const db = client.db('sample_mflix')
    // Send a ping to confirm a successful connection
   return {client,db,
    users: db.collection('users'),
    movies: db.collection('movies'),
    name:'sandun'
   }
  } catch(err){
    console.log(err,'data base error');
    return {}
  }
}
setupDatabase().catch(console.dir);
