import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from 'firebase/firestore'
import { userRef } from "../firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";
import { Button } from '@mui/material'

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [loader, setLoader] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({
    mobile: '',
    password: ''
  });
  const login = async () => {
    setLoader(true);
    try {
      const quer = query(userRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUsername(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoader(false);
  }
  return (
    <>
      <div className='signup side flex'>
        <div className='signup-box vstack'>
          <h2 className='center'>Login</h2>
          {otpSent ?
            <>
              <p>
                <label htmlFor="otp">OTP</label>
                <input
                  id='otp'
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  required />
              </p>
              <p className='center'>
                <Button variant='contained' color='success'>
                  {loader ? <TailSpin height="30" width="80" /> : 'Submit'}</Button>

              </p>
            </>
            :
            <>
              <p>
                <label htmlFor="number">Mobile No:</label>
                <input
                  type="number"
                  id='number'
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  required />
              </p>
              <p>
                <label htmlFor="password">Password:</label>
                <input
                  type="text"
                  id='password'
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required />
              </p>
              <p className='center'>
                <Button variant='contained' color='success' onClick={login}>
                  {loader ? <TailSpin height="30" width="80" /> : 'Submit'}</Button>

              </p>
              <p className='center'>
                Do not have account <Link to={'/signup'}>Signup</Link>
              </p>
            </>
          }

        </div>

      </div>
    </>
  )
}

export default Login
