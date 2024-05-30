import { createSlice } from '@reduxjs/toolkit'

const initialState = { data:{} }

const LoginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   setLoginData:(state,action)=>
    {
        state.data= action.payload
    }
   
  },
})

export const {setLoginData } = LoginSlice.actions
export default LoginSlice.reducer;