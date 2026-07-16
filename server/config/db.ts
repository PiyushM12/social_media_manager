 import mongoose from "mongoose"
 import dns from "node:dns"

 // The mongodb+srv:// scheme needs a DNS SRV lookup. Some networks' default
 // resolvers refuse SRV queries (querySrv ECONNREFUSED), so use a public
 // resolver that supports them for reliable local development.
 dns.setServers(["8.8.8.8", "1.1.1.1"])

 const connectDB = async()=>{
    try{
        mongoose.connection.on("connected",async()=>{
            console.log('Mongodb connected')
        });
        await mongoose.connect(process.env.MONGODB_URI!)
    }
    catch (error:any){
        console.error(error)
        process.exit(1)
    }
 }
 export default connectDB;