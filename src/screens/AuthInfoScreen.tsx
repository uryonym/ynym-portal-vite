import {
  Box,
  Button,
  Drawer,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import AuthInfoDetail from '../components/authInfo/AuthInfoDetail'
import AuthInfoNew from '../components/authInfo/AuthInfoNew'
import BottomAppBar from '../components/BottomAppBar'
import { AuthInfo, getAuthInfos, selectAuthInfo, setCurrentAuthInfo } from '../features/authInfoSlice'
import './AuthInfoScreen.scss'

const AuthInfoScreen: FC = () => {
  const { authInfos } = useAppSelector(selectAuthInfo)
  const dispatch = useAppDispatch()

  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)

  const handleClickAuthInfo = (authInfo: AuthInfo) => () => {
    dispatch(setCurrentAuthInfo(authInfo))
    setIsDetailOpen(true)
  }

  useEffect(() => {
    console.log('認証情報一覧の取得')
    dispatch(getAuthInfos())
  }, [dispatch])

  const authInfoRows = authInfos.map((authInfo: AuthInfo) => {
    return (
      <TableRow key={authInfo.id}>
        <TableCell>{authInfo.service_name}</TableCell>
        <TableCell>{authInfo.login_id}</TableCell>
        <TableCell>{authInfo.password}</TableCell>
        <TableCell>{authInfo.other}</TableCell>
        <TableCell>
          <Button variant='text' size='small' onClick={handleClickAuthInfo(authInfo)}>
            編集
          </Button>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <Box className='auth-info-main'>
        <Stack>
          <Typography variant='h4'>認証情報</Typography>
          <TableContainer component={Paper}>
            <Table className='auth-info-table' size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>サービス名</TableCell>
                  <TableCell>ログインID</TableCell>
                  <TableCell>パスワード</TableCell>
                  <TableCell>備考</TableCell>
                  <TableCell>アクション</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{authInfoRows}</TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
      <Drawer anchor='bottom' open={isNewOpen} onClose={() => setIsNewOpen(false)}>
        <AuthInfoNew onClose={() => setIsNewOpen(false)} />
      </Drawer>
      <Drawer anchor='right' open={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <AuthInfoDetail onClose={() => setIsDetailOpen(false)} />
      </Drawer>
      <BottomAppBar onAddItem={() => setIsNewOpen(true)} />
    </>
  )
}

export default AuthInfoScreen
