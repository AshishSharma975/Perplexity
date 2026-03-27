import { io } from "socket.io-client";

let socket = null;


export const initializeSocketConnection = () => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });
  }

  return socket;
};

// ✅ GET SOCKET
export const getSocket = () => socket;


// ========================
// 📤 EMIT EVENTS
// ========================

// send message
export const sendMessage = (data) => {
  if (!socket) return;
  socket.emit("send_message", data);
};

// get chats
export const getChats = () => {
  if (!socket) return;
  socket.emit("get_chats");
};

// join chat
export const joinChat = (chatId) => {
  if (!socket) return;
  socket.emit("join_chat", chatId);
};


// ========================
// 📩 LISTEN EVENTS
// ========================

// receive message
export const onReceiveMessage = (callback) => {
  if (!socket) return;

  socket.on("receive_message", (data) => {
    callback(data);
  });
};

// receive chats
export const onReceiveChats = (callback) => {
  if (!socket) return;

  socket.on("receive_chats", (data) => {
    callback(data);
  });
};