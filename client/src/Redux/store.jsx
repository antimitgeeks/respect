import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Slices/loginSlice'
import CreateApi from '../services/apiService';

const Store = configureStore({
    reducer: {
        loginSlice: loginSlice,
        [CreateApi.reducerPath]:CreateApi.reducer

    },
    middleware: (defmiddleWare) =>
        defmiddleWare().concat(CreateApi.middleware)
})


export default Store;