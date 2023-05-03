
import { Button,   FormControl,   IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { url } from '../App';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [email , setEmail] = useState();
  let [password , setPassword] = useState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async(e) =>{
    e.preventDefault();
    let payload = {email,password}
    try {
      let res = await axios.post(`${url}/login`,payload)
   toast.success(res.data.message)
   let a = document.querySelectorAll('input')

   for(let i of a){
    i.value=''
   }
   navigate('/dashboard')

    } catch (error) {
      console.log(error.response.data);
     toast.error(error.response.data.message)
    } 
  }

  return <>
    <div className='sigin'>
      <h1> Sign in  </h1>
      <form onSubmit={handleLogin}>
      <div className='item'>
      <FormControl  variant="standard">
        <InputLabel
        htmlFor="input-with-icon-adornment">
          email
        </InputLabel>
        <Input
        required
        onChange={(e)=>setEmail(e.target.value)}
          id="input-with-icon-adornment"
          label="email"
          className='email'
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
        </FormControl>
          <FormControl  variant="standard">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
         required
         onChange={(e)=>setPassword(e.target.value)}
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
          <p onClick={()=>navigate('/email')}>Forget Password?</p>
      <Button 
      type='submit'
      variant="contained" 
      color="secondary">
        Login
      </Button>
    </div>
    <p onClick={()=> navigate('/signup')}>New User? </p>
    </form>
    </div>
  </>
}


export default SignIn