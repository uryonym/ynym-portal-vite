import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import BottomAppBar from '../components/BottomAppBar'
import './HomeScreen.scss'

const HomeScreen: FC = () => {
  return (
    <>
      <Box className='home-main'>
        <Typography variant='h2'>ynym-portal</Typography>
      </Box>
      <BottomAppBar />
    </>
  )
}

export default HomeScreen
