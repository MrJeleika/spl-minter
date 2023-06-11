

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { HYDRATE} from 'next-redux-wrapper'




export type MintingStatus = "none" | "minting" | "success" | "error";


export interface IInitialState{
  tokenName: string
  tokenSymbol: string
  tokenDescription: string
  tokenImg: string
  isDarkTheme: boolean
  mintingStatus: MintingStatus;
}

const initialState: IInitialState = {
  tokenName: '',
  tokenSymbol: '',
  tokenDescription: '',
  tokenImg: '',
  isDarkTheme: false,
  mintingStatus: 'none'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTokenName: (state, action: PayloadAction<string>) => {
      state.tokenName = action.payload
    },
    setTokenSymbol: (state, action: PayloadAction<string>) => {
      state.tokenSymbol = action.payload
    },
    setTokenDescription: (state, action: PayloadAction<string>) => {
      state.tokenDescription = action.payload
    },
    setTokenImg: (state, action: PayloadAction<string>) => {
      state.tokenImg = action.payload
    },
    setDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload
    },
    setMintingStatus: (state, action: PayloadAction<MintingStatus>) => {
      state.mintingStatus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE as any, (state: IInitialState, action) => {
      if (action.payload) {
        state.tokenName = action.payload.app.tokenName;
        state.tokenSymbol = action.payload.app.tokenSymbol;
        state.tokenDescription = action.payload.app.tokenDescription;
        state.tokenImg = action.payload.app.tokenImg;
        state.isDarkTheme = action.payload.app.isDarkTheme;
        state.mintingStatus = action.payload.app.mintingStatus;
      }
    });
  },
})

export const {
  setTokenDescription,
  setTokenImg,
  setTokenName,
  setTokenSymbol,
  setDarkTheme,
  setMintingStatus
} = appSlice.actions
export default appSlice.reducer
