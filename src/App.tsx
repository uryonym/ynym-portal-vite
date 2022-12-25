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
import RefuelingScreen from './screens/RefuelingScreen'
import TaskScreen from './screens/TaskScreen'
import './App.scss'

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
    {
      path: 'refueling',
      element: <RefuelingScreen />,
    },
  ])

  const refresh = useCallback(
    async (user: User) => {
      await dispatch(login(user))
    },
    [dispatch]
  )

  useEffect(() => {
    const f = async (): Promise<void> => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user != null && !isAuthenticated) {
          refresh(user)
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
