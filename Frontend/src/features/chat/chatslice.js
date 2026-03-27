import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: {},
  currentChatId: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;

      if (!state.chats[chatId]) {
        state.chats[chatId] = { messages: [] };
      }

      state.chats[chatId].messages.push(message);
    }
  }
});

export const { setChats, setCurrentChatId, addMessage } = chatSlice.actions;
export default chatSlice.reducer;