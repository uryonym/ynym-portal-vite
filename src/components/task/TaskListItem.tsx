import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import { Task } from '../../features/taskSlice'
import './TaskListItem.scss'

type TaskListItemProps = {
  isDivider: boolean
  task: Task
  onClick: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TaskListItem: FC<TaskListItemProps> = ({ isDivider, task, onClick, onChange }) => {
  const dispDeadLine = task.dead_line ? task.dead_line.toString() : ''

  return (
    <ListItem divider={isDivider} disablePadding>
      <ListItemButton dense>
        <ListItemIcon>
          <Checkbox checked={task.is_complete} disableRipple onChange={onChange} />
        </ListItemIcon>
        <ListItemText
          className={task.is_complete ? 'task-list-item-completed' : ''}
          primary={task.title}
          secondary={dispDeadLine}
          onClick={onClick}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default TaskListItem
