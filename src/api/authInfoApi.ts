import axios, { AxiosResponse } from 'axios'
import { AuthInfo } from '../features/authInfoSlice'
import { apiUrl, getApiConfig } from './common'

export const getAuthInfosApi = async () => {
  const config = await getApiConfig()
  return axios.get(`${apiUrl}/auth_infos`, config).then((response: AxiosResponse<AuthInfo[]>) => response.data)
}

export const createAuthInfoApi = async (postData: AuthInfo) => {
  const config = await getApiConfig()
  const data = {
    auth_info: postData,
  }
  return axios.post(`${apiUrl}/auth_infos/`, data, config).then((response: AxiosResponse<AuthInfo>) => response.data)
}

export const updateAuthInfoApi = async (postData: AuthInfo) => {
  const config = await getApiConfig()
  const data = {
    auth_info: postData,
  }
  return axios
    .patch(`${apiUrl}/auth_infos/${postData.id}`, data, config)
    .then((response: AxiosResponse<AuthInfo>) => response.data)
}

export const deleteAuthInfoApi = async (authInfoId: string) => {
  const config = await getApiConfig()
  return axios.delete(`${apiUrl}/auth_infos/${authInfoId}`, config)
}
