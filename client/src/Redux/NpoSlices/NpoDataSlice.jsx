import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: '',
  linksData: '',
  PreviewData: ''
}

const NpoDataSlice = createSlice({
  name: 'NpoSlice',
  initialState,
  reducers: {
    setNpoData: (state, action) => {
      state.data = action.payload
    },
    setPreviewData: (state, action) => {
      state.PreviewData = action.payload
    },
    setLinkData: (state, action) => {
      state.linksData = action.payload
    }

  },
})

export const { setNpoData, setLinkData,setPreviewData } = NpoDataSlice.actions
export default NpoDataSlice.reducer;