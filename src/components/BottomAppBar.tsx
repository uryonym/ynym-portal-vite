import { Add, ArrowBack, Menu, MoreVert } from '@mui/icons-material'
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
  backable?: boolean
  onClose?: () => void
  onAddItem?: () => void
  subMenu?: JSX.Element
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
            <ListItem>
              <ListItemButton component={Link} to='/refueling'>
                <ListItemText primary='燃費記録' />
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

const BottomAppBar: FC<BottomAppBarProps> = ({ backable = false, onClose, onAddItem, subMenu }) => {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false)

  return (
    <AppBar className='bottom-app-bar' position='fixed'>
      <Toolbar>
        {backable ? (
          <IconButton color='inherit' onClick={onClose}>
            <ArrowBack />
          </IconButton>
        ) : (
          <MenuButton />
        )}
        {onAddItem && (
          <Fab className='add-fab' color='secondary' onClick={onAddItem}>
            <Add />
          </Fab>
        )}
        <SpaceBox />
        {subMenu && (
          <>
            <IconButton color='inherit' onClick={() => setIsOpenSubMenu(true)}>
              <MoreVert />
            </IconButton>
            <Drawer anchor='bottom' open={isOpenSubMenu} onClose={() => setIsOpenSubMenu(false)}>
              {subMenu}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default BottomAppBar
