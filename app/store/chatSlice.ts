import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UIDataTypes, UIMessage, UITools } from 'ai';

type ChatState = {
  input: string;
  chatMessages: UIMessage<unknown, UIDataTypes, UITools>[];
};


const initialState: ChatState = {
  input: '',
  chatMessages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    setChatMessages(
      state,
      action: PayloadAction<UIMessage<unknown, UIDataTypes, UITools>[]>,
    ) {
      state.chatMessages = action.payload;
    },

    clearInput(state) {
      state.input = '';
    },
  },
});

export const { setInput, clearInput, setChatMessages } = chatSlice.actions;

export const inputSelector = (state: RootState) => state.chatSlice.input;
export const chatMessagesSelector = (state: RootState) =>
  state.chatSlice.chatMessages;

export default chatSlice.reducer;
