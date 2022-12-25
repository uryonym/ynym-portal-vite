import { TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

const BaseTextField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      fullWidth
      variant='standard'
      sx={{
        marginBottom: '1rem',
      }}
      {...props}
    />
  )
}

export default BaseTextField
