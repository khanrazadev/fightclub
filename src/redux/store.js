import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { profileReducer } from './reducers/profileReducer';
import { courseReducer } from './reducers/courseReducer';
import { subscriptionReducer } from './reducers/subscriptionReducer';
import { adminReducer } from './reducers/adminReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
  },
});

export default store;
export const server = 'https://fightclub-server.onrender.com/api/v1';
