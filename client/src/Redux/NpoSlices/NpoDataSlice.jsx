import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  data:{ },
  linksData:{}
}

const NpoDataSlice = createSlice({
  name: 'NpoSlice',
  initialState,
  reducers: {
   setNpoData:(state,action)=>
    {
        state.data= action.payload
    },
    setLinkData:(state,action)=>
      {
          state.linksData= action.payload
      }
   
  },
})

export const {setNpoData ,setLinkData} = NpoDataSlice.actions
export default NpoDataSlice.reducer;