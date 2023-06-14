import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {},
  reducers: {
    add: (state, action) => ({ ...state, 0: action.payload }),
    remove: (state, action) => {
      const { [action.payload]: _, ...newState } = state;
      return newState;
    },
    addID: (state, action) => ({ ...state, 1: action.payload }),
    addChatLog: (state, action) => {
      const { chatID } = state[1];
      const updatedFriends = state[0].friends.map((friend) => {
        if (friend.id === chatID) {
          return {
            ...friend,
            chatlog: [...friend.chatlog, action.payload],
          };
        }
        return friend;
      });

      return { ...state, 0: { ...state[0], friends: updatedFriends } };
    },
  },
});

export const { add, remove, addID, addChatLog } = chatSlice.actions;
export default chatSlice.reducer;
