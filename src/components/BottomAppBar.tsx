import { Add, Menu } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../features/authUserSlice'
import SpaceBox from './SpaceBox'
import './BottomAppBar.scss'

type BottomAppBarProps = {
  onAddItem?: () => void
}

const MenuButton: FC = () => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const handleClickSignOut = () => {
    dispatch(logout())
  }

  return (
    <>
      <IconButton color='inherit' onClick={() => setIsOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)}>
        <Box>
          <List>
            <ListItem>
              <ListItemButton component={Link} to='/'>
                <ListItemText primary='ホーム' />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to='/task'>
                <ListItemText primary='タスク' />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to='/auth_info'>
                <ListItemText primary='認証情報' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={handleClickSignOut}>
                <ListItemText primary='サインアウト' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

const BottomAppBar: FC<BottomAppBarProps> = ({ onAddItem }) => {
  return (
    <AppBar className='bottom-app-bar' position='fixed'>
      <Toolbar>
        <MenuButton />
        {onAddItem && (
          <Fab className='add-fab' color='secondary' onClick={onAddItem}>
            <Add />
          </Fab>
        )}
        <SpaceBox />
      </Toolbar>
    </AppBar>
  )
}

export default BottomAppBar
