import axios, { AxiosResponse } from 'axios'
import { Task, TaskList } from '../features/taskSlice'
import { apiUrl, getApiConfig } from './common'

export const getTaskListsApi = async () => {
  const config = await getApiConfig()
  return axios.get(`${apiUrl}/task_lists`, config).then((response: AxiosResponse<TaskList[]>) => response.data)
}

export const createTaskApi = async (postData: Task) => {
  const config = await getApiConfig()
  const data = {
    task: postData,
  }
  return axios.post(`${apiUrl}/tasks/`, data, config).then((response: AxiosResponse<Task>) => response.data)
}

export const updateTaskApi = async (postData: Task) => {
  const config = await getApiConfig()
  const data = {
    task: postData,
  }
  return axios
    .patch(`${apiUrl}/tasks/${postData.id}`, data, config)
    .then((response: AxiosResponse<Task>) => response.data)
}

export const deleteTaskApi = async (taskId: string) => {
  const config = await getApiConfig()
  return axios.delete(`${apiUrl}/tasks/${taskId}`, config)
}
