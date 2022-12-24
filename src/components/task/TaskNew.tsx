import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { AppBar, Box, Button, InputAdornment, TextField, Toolbar } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createTask, selectTask } from '../../features/taskSlice'
import './TaskNew.scss'

interface TaskNewProps {
  onClose: () => void
}

const TaskNew: FC<TaskNewProps> = ({ onClose }) => {
  const { currentTaskListId } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState<string>('')
  const [deadLine, setDeadLine] = useState<Date | null>(null)
  const titleInputRef = useRef<HTMLInputElement>()

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSave = () => {
    if (currentTaskListId) {
      const data = {
        title,
        dead_line: deadLine,
        is_complete: false,
        task_list_id: currentTaskListId,
      }
      dispatch(createTask(data))
      onClose()
    }
  }

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [])

  return (
    <>
      <Box className='task-new-main'>
        <TextField
          className='task-new-form'
          multiline
          fullWidth
          placeholder='タスクを入力'
          variant='standard'
          value={title}
          onChange={handleChangeTitle}
          inputRef={titleInputRef}
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
                className='task-new-form'
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
      </Box>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Button color='inherit' onClick={handleSave}>
            保存
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TaskNew
