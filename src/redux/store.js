import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { profileReducer } from './reducers/profileReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
export const server = 'https://fightclub-server.onrender.com/api/v1';
