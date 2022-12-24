import { Box, Button } from '@mui/material'
import { FC } from 'react'
import { useAppDispatch } from '../app/hooks'
import BottomAppBar from '../components/BottomAppBar'
import { login } from '../features/authUserSlice'
import './LoginScreen.scss'

const LoginScreen: FC = () => {
  const dispatch = useAppDispatch()

  const handleClickSignIn = () => {
    dispatch(login())
  }

  return (
    <>
      <Box className='login-main'>
        <Button variant='contained' onClick={handleClickSignIn}>
          サインイン
        </Button>
      </Box>
      <BottomAppBar />
    </>
  )
}

export default LoginScreen
