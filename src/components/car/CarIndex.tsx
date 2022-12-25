import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCars, selectCar } from '../../features/carSlice'
import BottomAppBar from '../BottomAppBar'
import './CarIndex.scss'

type CarIndexProps = {
  onClose: () => void
}

const CarIndex: FC<CarIndexProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { cars } = useAppSelector(selectCar)

  useEffect(() => {
    dispatch(getCars())
  }, [dispatch])

  return (
    <>
      <Box className='car-index-main'>
        <Typography variant='h4'>車両</Typography>
        {cars.map((car) => {
          return (
            <List key={car.id}>
              <ListItem disablePadding>
                <ListItemText primary={car.name} />
              </ListItem>
            </List>
          )
        })}
      </Box>
      <BottomAppBar backable onClose={onClose} />
    </>
  )
}

export default CarIndex
