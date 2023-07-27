import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { profileReducer } from './reducers/profileReducer';
import { courseReducer } from './reducers/courseReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
  },
});

export default store;
export const server = 'https://fightclub-server.onrender.com/api/v1';
