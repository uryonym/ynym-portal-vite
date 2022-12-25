import { Box, Drawer, Typography } from '@mui/material'
import { FC, useState } from 'react'
import AuthInfoDetail from '../components/authInfo/AuthInfoDetail'
import AuthInfoNew from '../components/authInfo/AuthInfoNew'
import BottomAppBar from '../components/BottomAppBar'
import CarSubMenu from '../components/car/CarSubMenu'
import './RefuelingScreen.scss'

const RefuelingScreen: FC = () => {
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)

  return (
    <>
      <Box className='refueling-main'>
        <Typography variant='h4'>燃費記録</Typography>
      </Box>
      <Drawer anchor='bottom' open={isNewOpen} onClose={() => setIsNewOpen(false)}>
        <AuthInfoNew onClose={() => setIsNewOpen(false)} />
      </Drawer>
      <Drawer anchor='right' open={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <AuthInfoDetail onClose={() => setIsDetailOpen(false)} />
      </Drawer>
      <BottomAppBar onAddItem={() => setIsNewOpen(true)} subMenu={<CarSubMenu />} />
    </>
  )
}

export default RefuelingScreen
