import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authInfoReducer from '../features/authInfoSlice'
import authUserReducer from '../features/authUserSlice'
import carReducer from '../features/carSlice'
import taskReducer from '../features/taskSlice'

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    task: taskReducer,
    authInfo: authInfoReducer,
    car: carReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
