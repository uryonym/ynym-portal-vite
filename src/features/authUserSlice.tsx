import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect, signOut, User } from 'firebase/auth'
import { firebaseAuth } from '../app/firebase'
import { RootState } from '../app/store'

export interface AuthUserState {
  isInitialized: boolean
  isAuthenticated: boolean
  user: User | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthUserState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  status: 'idle',
}

const provider = new GoogleAuthProvider()

export const login = createAsyncThunk<User | null, User | undefined, { rejectValue: string }>(
  'authUser/signIn',
  async (user, { rejectWithValue }) => {
    try {
      if (!user) {
        await signInWithRedirect(firebaseAuth, provider)
        const result = await getRedirectResult(firebaseAuth)
        if (result) {
          return result.user
        }
        return null
      }
      return user
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return null
    }
  }
)

export const logout = createAsyncThunk<void, undefined, { rejectValue: string }>(
  'authUser/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(firebaseAuth)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isInitialized = true
      state.isAuthenticated = true
      state.user = action.payload
      state.status = 'idle'
    })
    builder.addCase(login.rejected, (state, action) => {
      state.user = null
      state.status = 'failed'
      console.log(action.error)
    })
    builder.addCase(logout.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.isInitialized = true
      state.isAuthenticated = false
      state.user = null
      state.status = 'idle'
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.user = null
      state.status = 'failed'
      console.log(action.error)
    })
  },
})

export const selectAuthUser = (state: RootState) => state.authUser

export default authUserSlice.reducer
