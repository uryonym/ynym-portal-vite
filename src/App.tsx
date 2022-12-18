import { onAuthStateChanged, User } from 'firebase/auth'
import { FC, useCallback, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { firebaseAuth } from './app/firebase'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { login, logout, selectAuthUser } from './features/authUserSlice'
import AuthInfoScreen from './screens/AuthInfoScreen'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import TaskScreen from './screens/TaskScreen'
import './App.css'

const App: FC = () => {
  const { isInitialized, isAuthenticated } = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeScreen />,
    },
    {
      path: 'task',
      element: <TaskScreen />,
    },
    {
      path: 'auth_info',
      element: <AuthInfoScreen />,
    },
  ])

  const refresh = useCallback(
    async (user: User) => {
      return await dispatch(login(user))
    },
    [dispatch]
  )

  useEffect(() => {
    const f = async () => {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (user != null && !isAuthenticated) {
          return await refresh(user)
        }
        if (user == null && !isAuthenticated) {
          dispatch(logout())
        }
      })
    }
    f()
  }, [])

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <RouterProvider router={router} />
}

export default App
