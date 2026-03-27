import { initializeSocketConnection } from "../service/chat.socket";

const useChat = () => {

  const handleGetChats = () => {
    console.log("GET CHATS");
  };

  const handleSendMessage = ({ message, chatId }) => {
    console.log("SEND", message, chatId);
  };

  const handleOpenChat = (chatId, chats) => {
    console.log("OPEN CHAT", chatId);
  };

  return {
    initializeSocketConnection,
    handleGetChats,
    handleSendMessage,
    handleOpenChat
  };
};

export default useChat;