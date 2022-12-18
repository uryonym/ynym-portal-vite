import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import './LoadingScreen.scss'

const LoadingScreen: FC = () => {
  return (
    <Box className='loading-main'>
      <Typography variant='h3'>Loading...</Typography>
    </Box>
  )
}

export default LoadingScreen
