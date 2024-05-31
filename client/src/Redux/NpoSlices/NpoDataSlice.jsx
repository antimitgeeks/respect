import { createSlice } from '@reduxjs/toolkit'

const initialState = { data:{

} }

const NpoDataSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   setNpoData:(state,action)=>
    {
        state.data= action.payload
    }
   
  },
})

export const {setNpoData } = NpoDataSlice.actions
export default NpoDataSlice.reducer;