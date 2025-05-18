import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../_redux/_sliceuser'

const store = configureStore({
  reducer: {
     auth: authSlice,
  },
});


export default store