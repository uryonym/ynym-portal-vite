import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createCarApi, deleteCarApi, getCarsApi, updateCarApi } from '../api/carApi'
import { RootState } from '../app/store'

export type Car = {
  id?: string
  name: string
  maker: string
  model: string
  model_year: number
  license_plate?: string
  tank_capacity?: number
  uid?: string
  created_at?: Date
  updated_at?: Date
}

export type CarState = {
  cars: Car[]
  currentCar?: Car
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CarState = {
  cars: [],
  currentCar: undefined,
  status: 'idle',
}

export const getCars = createAsyncThunk<Car[], undefined, { rejectValue: string }>(
  'car/getCars',
  async (_, { rejectWithValue }) => {
    try {
      return await getCarsApi()
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return []
    }
  }
)

export const createCar = createAsyncThunk<Car, Car, { rejectValue: string }>(
  'car/createCar',
  async (car, { rejectWithValue }) => {
    try {
      return await createCarApi(car)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return car
    }
  }
)

export const updateCar = createAsyncThunk<Car, Car, { rejectValue: string }>(
  'car/updateCar',
  async (car, { rejectWithValue }) => {
    try {
      return await updateCarApi(car)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return car
    }
  }
)

export const deleteCar = createAsyncThunk<string, string, { rejectValue: string }>(
  'car/deleteCar',
  async (carId, { rejectWithValue }) => {
    try {
      await deleteCarApi(carId)
      return carId
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return ''
    }
  }
)

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCurrentCar: (state, action: PayloadAction<Car | undefined>) => {
      state.currentCar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.cars = action.payload
      state.currentCar = undefined
      state.status = 'idle'
    })
    builder.addCase(getCars.rejected, (state, action) => {
      state.cars = []
      state.currentCar = undefined
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(createCar.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.cars = [...state.cars, action.payload]
      state.status = 'idle'
    })
    builder.addCase(createCar.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(updateCar.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.cars = state.cars.map((x) => (x.id === action.payload.id ? action.payload : x))
      state.status = 'idle'
    })
    builder.addCase(updateCar.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(deleteCar.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((x) => x.id !== action.payload)
      state.status = 'idle'
    })
    builder.addCase(deleteCar.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })
  },
})

export const { setCurrentCar } = carSlice.actions

export const selectCar = (state: RootState) => state.car

export default carSlice.reducer
