import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar } from '@mui/material'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteAuthInfo, selectAuthInfo, updateAuthInfo } from '../../features/authInfoSlice'
import DeleteConfirmDialog from '../DeleteConfirmDialog'
import './AuthInfoDetail.scss'

type AuthInfoDetailProps = {
  onClose: () => void
}

const AuthInfoDetail: FC<AuthInfoDetailProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { currentAuthInfo } = useAppSelector(selectAuthInfo)

  const [serviceName, setServiceName] = useState<string>('')
  const [loginId, setLoginId] = useState<string>('')
  const [password, setPassword] = useState<string>()
  const [other, setOther] = useState<string>()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleChangeServiceName = (e: ChangeEvent<HTMLInputElement>) => {
    setServiceName(e.target.value)
  }

  const handleChangeLoginId = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleChangeOther = (e: ChangeEvent<HTMLInputElement>) => {
    setOther(e.target.value)
  }

  const handleSave = () => {
    if (currentAuthInfo) {
      const data = {
        ...currentAuthInfo,
        service_name: serviceName,
        login_id: loginId,
        password,
        other,
      }
      dispatch(updateAuthInfo(data))
    }
    onClose()
  }

  const handleClickDelete = () => {
    setIsOpen(true)
  }

  const handleDelete = () => {
    setIsOpen(false)
    if (currentAuthInfo && currentAuthInfo.id) {
      dispatch(deleteAuthInfo(currentAuthInfo.id))
    }
    onClose()
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (currentAuthInfo) {
      setServiceName(currentAuthInfo.service_name)
      setLoginId(currentAuthInfo.login_id)
      setPassword(currentAuthInfo.password || '')
      setOther(currentAuthInfo.other || '')
    }
  }, [currentAuthInfo])

  return (
    <>
      <Box className='auth-info-detail-main'>
        <TextField
          className='auth-info-detail-form'
          fullWidth
          placeholder='サービス名を入力'
          variant='standard'
          value={serviceName}
          onChange={handleChangeServiceName}
        />
        <TextField
          className='auth-info-detail-form'
          fullWidth
          placeholder='ログインIDを入力'
          variant='standard'
          value={loginId}
          onChange={handleChangeLoginId}
        />
        <TextField
          className='auth-info-detail-form'
          fullWidth
          placeholder='パスワードを入力'
          variant='standard'
          value={password}
          onChange={handleChangePassword}
        />
        <TextField
          className='auth-info-detail-form'
          fullWidth
          placeholder='備考を入力'
          variant='standard'
          value={other}
          onChange={handleChangeOther}
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
        </Toolbar>
      </AppBar>
    </>
  )
}

export default AuthInfoDetail
