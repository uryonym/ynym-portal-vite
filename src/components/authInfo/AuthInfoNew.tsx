import { AppBar, Box, Button, TextField, Toolbar } from '@mui/material'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createAuthInfo } from '../../features/authInfoSlice'
import './AuthInfoNew.scss'

type AuthInfoNewProps = {
  onClose: () => void
}

const AuthInfoNew: FC<AuthInfoNewProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()

  const [serviceName, setServiceName] = useState<string>('')
  const [loginId, setLoginId] = useState<string>('')
  const [password, setPassword] = useState<string>()
  const [other, setOther] = useState<string>()
  const serviceNameInputRef = useRef<HTMLInputElement>()

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
    const data = {
      service_name: serviceName,
      login_id: loginId,
      password,
      other,
    }
    dispatch(createAuthInfo(data))
    onClose()
  }

  useEffect(() => {
    if (serviceNameInputRef.current) {
      serviceNameInputRef.current.focus()
    }
  }, [])

  return (
    <>
      <Box className='auth-info-new-main'>
        <TextField
          className='auth-info-new-form'
          fullWidth
          placeholder='サービス名を入力'
          variant='standard'
          value={serviceName}
          onChange={handleChangeServiceName}
          inputRef={serviceNameInputRef}
        />
        <TextField
          className='auth-info-new-form'
          fullWidth
          placeholder='ログインIDを入力'
          variant='standard'
          value={loginId}
          onChange={handleChangeLoginId}
        />
        <TextField
          className='auth-info-new-form'
          fullWidth
          placeholder='パスワードを入力'
          variant='standard'
          value={password}
          onChange={handleChangePassword}
        />
        <TextField
          className='auth-info-new-form'
          fullWidth
          placeholder='備考を入力'
          variant='standard'
          value={other}
          onChange={handleChangeOther}
        />
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

export default AuthInfoNew
