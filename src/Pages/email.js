import { Button, FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { url } from '../App';

function Email() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()



  const handleEmail = async (e) => {
    e.preventDefault();
    const payload = { email }
    console.log(email);
    try {
      let res = await axios.post(`${url}/email`, payload)
      let data = res.data.data;
      console.log(data);
      // toast.success(res.data.messege)

      let params = {
        to_name: data.firstName,
        message: data.updatedAt,
        from_name: data.email
      }
      emailjs.send("service_a3t2n7t", "template_wh20mdn", params, 'XvuttI8guIGVDozXe').then(() => {
        toast.success("Email Send Successfully!!!")
        navigate('/forget')

      }).catch((error) => {
        toast.error(error)
      })

    } catch (error) {
      toast.error(error.response.data.messege)
      console.log(error.response.data);
    }

  }

  return (
    <div className='sigin'>
      <h1> Email </h1>
      <form onSubmit={handleEmail}>
        <div className='item'>
          <FormControl variant="standard">
            <InputLabel
              htmlFor="input-with-icon-adornment">
              email
            </InputLabel>
            <Input
              required
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              id="input-with-icon-adornment"
              label="email"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>

        </div>

        <div className='flex'>
          <p onClick={() => navigate('/')}> Already You Have Account?</p>
          <Button
            type='submit'
            variant="contained"
            color="secondary">
            Login
          </Button>
        </div>
        <p onClick={() => navigate('/signup')}>New User? </p>
      </form>

    </div>
  )
}

export default Email