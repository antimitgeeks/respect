import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Slices/loginSlice'
import CreateApi from '../services/apiService';
import NpoDataSlice from './NpoSlices/NpoDataSlice';

const Store = configureStore({
    reducer: {
        loginSlice: loginSlice,
        NpoDataSlice:NpoDataSlice,
        [CreateApi.reducerPath]:CreateApi.reducer

    },
    middleware: (defmiddleWare) =>
        defmiddleWare().concat(CreateApi.middleware)
})


export default Store;