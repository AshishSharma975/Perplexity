import {Server} from "socket.io";


let io;
export function initServerSocket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    });

    console.log("Socket server initialized");
    
    io.on("connection",(socket)=>{
        console.log("User connected",socket.id);

        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);
        })
    })
}

export function getIo(){
    if(!io){
        throw new Error("Socket not initialized");
    }
    return io;
}   