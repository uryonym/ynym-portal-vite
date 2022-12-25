import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { FC, useState } from 'react'
import CarIndex from './CarIndex'

const CarSubMenu: FC = () => {
  const [isCarOpen, setIsCarOpen] = useState<boolean>(false)

  return (
    <>
      <List>
        <ListItem>
          <ListItemButton onClick={() => setIsCarOpen(true)}>
            <ListItemText primary='車' />
          </ListItemButton>
        </ListItem>
      </List>
      <Drawer anchor='right' open={isCarOpen} onClose={() => setIsCarOpen(false)}>
        <CarIndex onClose={() => setIsCarOpen(false)} />
      </Drawer>
    </>
  )
}

export default CarSubMenu
