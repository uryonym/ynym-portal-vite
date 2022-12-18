import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  List,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'
import { Swiper } from 'swiper'
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BottomAppBar from '../components/BottomAppBar'
import TaskDetail from '../components/task/TaskDetail'
import TaskListItem from '../components/task/TaskListItem'
import TaskNew from '../components/task/TaskNew'
import {
  getTaskLists,
  selectTask,
  setCurrentTask,
  setCurrentTaskListId,
  Task,
  TaskList,
  updateTask,
} from '../features/taskSlice'
import './TaskScreen.scss'

const TaskScreen: FC = () => {
  const { taskLists, currentTaskListId } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()

  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
  const [swiper, setSwiper] = useState<Swiper | null>(null)

  const handleChangeTab = (e: SyntheticEvent, newValue: string) => {
    console.log('タブの切り替え')
    dispatch(setCurrentTaskListId(newValue))
    swiper?.slideTo(taskLists.findIndex((x) => x.id === newValue))
  }

  const handleChangeSlice = (currentSwiper: Swiper) => {
    console.log('Sliceの切り替え')
    dispatch(setCurrentTaskListId(taskLists[currentSwiper.activeIndex].id))
  }

  const handleChangeCheck = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    const data = { ...task, is_complete: e.target.checked }
    dispatch(updateTask(data))
  }

  const handleSwiper = (currentSwiper: Swiper) => {
    console.log('Swiperの切り替え')
    const swiperInstance = currentSwiper
    setSwiper(swiperInstance)
  }

  const handleClickTask = (task: Task) => () => {
    dispatch(setCurrentTask(task))
    setIsDetailOpen(true)
  }

  useEffect(() => {
    console.log('タスク一覧の取得')
    dispatch(getTaskLists())
  }, [dispatch])

  const dispTaskListTabs = taskLists.map((taskList: TaskList, index: number) => {
    return (
      <Tab
        label={taskList.name}
        value={taskList.id}
        key={index}
        id={`tab-${index}`}
        aria-controls={`tabpanel-${index}`}
      />
    )
  })

  const dispTasks = (tasks: Task[]) =>
    tasks
      .filter((x) => !x.is_complete)
      .map((task: Task, index: number, array: Task[]) => {
        const isDivider = array.length - 1 !== index
        return (
          <TaskListItem
            isDivider={isDivider}
            task={task}
            key={index}
            onClick={handleClickTask(task)}
            onChange={handleChangeCheck(task)}
          />
        )
      })

  const dispCompletedTasks = (tasks: Task[]) =>
    tasks
      .filter((x) => x.is_complete)
      .map((task: Task, index, array) => {
        const isDivider = array.length - 1 !== index
        return (
          <TaskListItem
            isDivider={isDivider}
            task={task}
            key={index}
            onClick={handleClickTask(task)}
            onChange={handleChangeCheck(task)}
          />
        )
      })

  const dispTabPanels = taskLists.map((taskList: TaskList, index: number) => {
    return (
      <SwiperSlide key={index}>
        <div
          role='tabpanel'
          hidden={currentTaskListId !== taskList.id}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {currentTaskListId === taskList.id && (
            <Box>
              <Paper variant='outlined'>
                <List>{dispTasks(taskList.tasks)}</List>
              </Paper>
              <Accordion variant='outlined'>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Completed</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>{dispCompletedTasks(taskList.tasks)}</List>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </div>
      </SwiperSlide>
    )
  })

  return (
    <>
      <Box className='task-main'>
        <Stack>
          <Typography variant='h4'>タスク</Typography>
          {currentTaskListId && (
            <>
              <Tabs value={currentTaskListId} variant='scrollable' onChange={handleChangeTab}>
                {dispTaskListTabs}
              </Tabs>
              <ReactSwiper onSlideChange={handleChangeSlice} onSwiper={handleSwiper}>
                {dispTabPanels}
              </ReactSwiper>
            </>
          )}
        </Stack>
      </Box>
      <Drawer anchor='bottom' open={isNewOpen} onClose={() => setIsNewOpen(false)}>
        <TaskNew onClose={() => setIsNewOpen(false)} />
      </Drawer>
      <Drawer anchor='right' open={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <TaskDetail onClose={() => setIsDetailOpen(false)} />
      </Drawer>
      <BottomAppBar onAddItem={() => setIsNewOpen(true)} />
    </>
  )
}

export default TaskScreen
