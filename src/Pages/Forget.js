import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../App';

function Forget() {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [updatedAt , setUpdatedAt] =useState(null)
  const [password , setPassword] =useState(null)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  };
const handleForget = async(e) =>{
  e.preventDefault();
const payload ={updatedAt,password}
try {
  let res = await axios.patch(`${url}/forget` , payload)
  toast.success(res.data.message)
  let data =document.querySelectorAll('input')
  for(let i of data){
    i.value='';
  }
  navigator('/')


} catch (error) {
  toast.error(error.responce.data.message)
}

  
}

  return (
    <div className='sigin'>
    <h1> Forget Password </h1>
    <form onSubmit={handleForget}>
    <div className='items'>
    <TextField 
    id="outlined-basic" 
    onChange={(e)=>setUpdatedAt(e.target.value)}
    required 
    label="Token No" 
    variant="standard" />
    <FormControl  variant="standard">
    <InputLabel htmlFor="standard-adornment-password"> Password</InputLabel>
        <Input
        required
        onChange={(e)=>setPassword(e.target.value)}
        label="First Name"
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        </FormControl>
   

    </div>

        <div className='flex'>
        <p onClick={()=>navigator('/email')}>Forget Password?</p>
    <Button 
    type='submit'
    variant="contained" color="secondary">
      Sign Up
    </Button>
  </div>
          <p onClick={()=>navigator('/')} > Already You Have Account?</p>
          </form>
  </div>
  )
}

export default Forget