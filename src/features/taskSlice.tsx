import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createTaskApi, deleteTaskApi, getTaskListsApi, updateTaskApi } from '../api/taskApi'
import { RootState } from '../app/store'

export type Task = {
  id?: string
  title: string
  description?: string
  dead_line?: Date | null
  is_complete: boolean
  uid?: string
  task_list_id: string
  created_at?: Date
  updated_at?: Date
}

export type TaskList = {
  id: string
  name: string
  uid: string
  share_uid: string
  tasks: Task[]
  created_at: Date
  updated_at: Date
}

export type TaskState = {
  taskLists: TaskList[]
  currentTaskListId?: string
  currentTask?: Task
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TaskState = {
  taskLists: [],
  currentTaskListId: undefined,
  currentTask: undefined,
  status: 'idle',
}

export const getTaskLists = createAsyncThunk<TaskList[], undefined, { rejectValue: string }>(
  'task/getTaskLists',
  async (_, { rejectWithValue }) => {
    try {
      return await getTaskListsApi()
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return []
    }
  }
)

export const createTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  'task/createTask',
  async (task, { rejectWithValue }) => {
    try {
      return await createTaskApi(task)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return task
    }
  }
)

export const updateTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  'task/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      return await updateTaskApi(task)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return task
    }
  }
)

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'task/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskApi(taskId)
      return taskId
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return ''
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTaskListId: (state, action: PayloadAction<string>) => {
      state.currentTaskListId = action.payload
    },
    setCurrentTask: (state, action: PayloadAction<Task | undefined>) => {
      state.currentTask = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskLists.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getTaskLists.fulfilled, (state, action) => {
      state.taskLists = action.payload
      state.currentTaskListId = action.payload[0].id
      state.currentTask = undefined
      state.status = 'idle'
    })
    builder.addCase(getTaskLists.rejected, (state, action) => {
      state.taskLists = []
      state.currentTaskListId = undefined
      state.currentTask = undefined
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(createTask.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      const updateTaskLists = state.taskLists.slice(0, state.taskLists.length)
      const taskListIndex = updateTaskLists.findIndex((x) => x.id === action.payload.task_list_id)
      updateTaskLists[taskListIndex].tasks = [...updateTaskLists[taskListIndex].tasks, action.payload]
      state.taskLists = updateTaskLists
      state.status = 'idle'
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(updateTask.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const updateTaskLists = state.taskLists.slice(0, state.taskLists.length)
      const taskListIndex = updateTaskLists.findIndex((x) => x.id === action.payload.task_list_id)
      const tasks = updateTaskLists[taskListIndex].tasks.map((x) => (x.id === action.payload.id ? action.payload : x))
      if (tasks) {
        updateTaskLists[taskListIndex].tasks = tasks
        state.taskLists = updateTaskLists
      }
      state.status = 'idle'
    })
    builder.addCase(updateTask.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })

    builder.addCase(deleteTask.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const updateTaskLists = state.taskLists.slice(0, state.taskLists.length)
      const taskListIndex = updateTaskLists.findIndex((x) => x.id === state.currentTaskListId)
      const tasks = updateTaskLists[taskListIndex].tasks.filter((x) => x.id !== action.payload)
      updateTaskLists[taskListIndex].tasks = tasks
      state.taskLists = updateTaskLists
      state.status = 'idle'
    })
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.status = 'failed'
      console.log(action.error)
    })
  },
})

export const { setCurrentTaskListId, setCurrentTask } = taskSlice.actions

export const selectTask = (state: RootState) => state.task

export default taskSlice.reducer
