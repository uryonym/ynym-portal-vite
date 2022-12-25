import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAuthInfoApi, deleteAuthInfoApi, getAuthInfosApi, updateAuthInfoApi } from '../api/authInfoApi'
import { RootState } from '../app/store'

export type AuthInfo = {
  id?: string
  service_name: string
  login_id: string
  password?: string
  other?: string
  created_at?: Date
  updated_at?: Date
}

export type AuthInfoState = {
  authInfos: AuthInfo[]
  currentAuthInfo?: AuthInfo
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthInfoState = {
  authInfos: [],
  currentAuthInfo: undefined,
  status: 'idle',
}

export const getAuthInfos = createAsyncThunk<AuthInfo[], undefined, { rejectValue: string }>(
  'authInfo/getAuthInfos',
  async (_, { rejectWithValue }) => {
    try {
      return await getAuthInfosApi()
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return []
    }
  }
)

export const createAuthInfo = createAsyncThunk<AuthInfo, AuthInfo, { rejectValue: string }>(
  'authInfo/createAuthInfo',
  async (authInfo, { rejectWithValue }) => {
    try {
      return await createAuthInfoApi(authInfo)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return authInfo
    }
  }
)

export const updateAuthInfo = createAsyncThunk<AuthInfo, AuthInfo, { rejectValue: string }>(
  'authInfo/updateAuthInfo',
  async (authInfo, { rejectWithValue }) => {
    try {
      return await updateAuthInfoApi(authInfo)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return authInfo
    }
  }
)

export const deleteAuthInfo = createAsyncThunk<string, string, { rejectValue: string }>(
  'authInfo/deleteAuthInfo',
  async (authInfoId, { rejectWithValue }) => {
    try {
      await deleteAuthInfoApi(authInfoId)
      return authInfoId
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return ''
    }
  }
)

export const authInfoSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setCurrentAuthInfo: (state, action: PayloadAction<AuthInfo | undefined>) => {
      state.currentAuthInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthInfos.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getAuthInfos.fulfilled, (state, action) => {
      state.authInfos = action.payload
      state.currentAuthInfo = undefined
      state.status = 'idle'
    })
    builder.addCase(getAuthInfos.rejected, (state, action) => {
      state.authInfos = []
      state.currentAuthInfo = undefined
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(createAuthInfo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(createAuthInfo.fulfilled, (state, action) => {
      state.authInfos = [...state.authInfos, action.payload]
      state.status = 'idle'
    })
    builder.addCase(createAuthInfo.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(updateAuthInfo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateAuthInfo.fulfilled, (state, action) => {
      state.authInfos = state.authInfos.map((x) => (x.id === action.payload.id ? action.payload : x))
      state.status = 'idle'
    })
    builder.addCase(updateAuthInfo.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(deleteAuthInfo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(deleteAuthInfo.fulfilled, (state, action) => {
      state.authInfos = state.authInfos.filter((x) => x.id !== action.payload)
      state.status = 'idle'
    })
    builder.addCase(deleteAuthInfo.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })
  },
})

export const { setCurrentAuthInfo } = authInfoSlice.actions

export const selectAuthInfo = (state: RootState) => state.authInfo

export default authInfoSlice.reducer
