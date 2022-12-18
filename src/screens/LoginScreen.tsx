import { Box, Button, Typography } from '@mui/material'
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
        <Typography variant='h3'>SignIn</Typography>
        <Button variant='contained' onClick={handleClickSignIn}>
          SignIn
        </Button>
      </Box>
      <BottomAppBar />
    </>
  )
}

export default LoginScreen
