import axios, { AxiosResponse } from 'axios'
import { Car } from '../features/carSlice'
import { apiUrl, getApiConfig } from './common'

export const getCarsApi = async () => {
  const config = await getApiConfig()
  return axios.get(`${apiUrl}/cars`, config).then((response: AxiosResponse<Car[]>) => response.data)
}

export const createCarApi = async (postData: Car) => {
  const config = await getApiConfig()
  const data = {
    car: postData,
  }
  return axios.post(`${apiUrl}/cars/`, data, config).then((response: AxiosResponse<Car>) => response.data)
}

export const updateCarApi = async (postData: Car) => {
  const config = await getApiConfig()
  const data = {
    car: postData,
  }
  return axios
    .patch(`${apiUrl}/cars/${postData.id}`, data, config)
    .then((response: AxiosResponse<Car>) => response.data)
}

export const deleteCarApi = async (carId: string) => {
  const config = await getApiConfig()
  return axios.delete(`${apiUrl}/cars/${carId}`, config)
}
