import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DescriptionIcon from '@mui/icons-material/Description'
import { AppBar, Box, Button, IconButton, InputAdornment, TextField, Toolbar } from '@mui/material'
import { Stack } from '@mui/system'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteTask, selectTask, updateTask } from '../../features/taskSlice'
import DeleteConfirmDialog from '../DeleteConfirmDialog'
import './TaskDetail.scss'

type TaskDetailProps = {
  onClose: () => void
}

const TaskDetail: FC<TaskDetailProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { currentTask } = useAppSelector(selectTask)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [deadLine, setDeadLine] = useState<Date | undefined | null>(undefined)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleSave = () => {
    if (currentTask) {
      const data = {
        ...currentTask,
        title,
        description: description || undefined,
        dead_line: deadLine,
      }
      dispatch(updateTask(data))
    }
    onClose()
  }

  const handleClickDelete = () => {
    setIsOpen(true)
  }

  const handleDelete = () => {
    setIsOpen(false)
    if (currentTask && currentTask.id) {
      dispatch(deleteTask(currentTask.id))
    }
    onClose()
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  const handleClickComplete = () => {
    if (currentTask) {
      const data = {
        ...currentTask,
        is_complete: !currentTask.is_complete,
      }
      dispatch(updateTask(data))
    }
    onClose()
  }

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title)
      setDescription(currentTask.description || '')
      setDeadLine(currentTask.dead_line)
    }
  }, [currentTask])

  return (
    <>
      <Box className='task-detail-main'>
        <TextField
          className='task-detail-form'
          multiline
          fullWidth
          placeholder='タスクを入力'
          variant='standard'
          value={title}
          onChange={handleChangeTitle}
        />
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <MobileDatePicker
            value={deadLine}
            onChange={(newValue) => {
              setDeadLine(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className='task-detail-form'
                fullWidth
                variant='standard'
                placeholder='期限を入力'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          className='task-detail-form'
          multiline
          fullWidth
          placeholder='詳細を入力'
          variant='standard'
          value={description}
          onChange={handleChangeDescription}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Button variant='outlined' color='error' onClick={handleClickDelete}>
            削除
          </Button>
          <Button variant='outlined' onClick={handleSave}>
            保存
          </Button>
          <DeleteConfirmDialog open={isOpen} onExec={handleDelete} onClose={handleCloseDialog} />
        </Stack>
      </Box>
      <AppBar className='task-detail-appbar' position='fixed'>
        <Toolbar>
          <IconButton color='inherit' onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button color='inherit' onClick={handleClickComplete}>
            {currentTask?.is_complete ? '未完了にする' : '完了にする'}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TaskDetail
