import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from '../firebase/firebase'
import {userRef} from '../firebase/firebase'
import {addDoc} from 'firebase/firestore'
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';

const auth = getAuth(app);
const Signup = () => {
  const [loader, setLoader] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState('');
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    password: ''
  })
  const navigate = useNavigate();
  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    }, auth);
  }
  const requestOtp=()=>{
    setLoader(true);
    generateRecaptha();
    let appVerifier=window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91${form.mobile}`, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      // ...
      swal({
        text:'OTP Sent',
        icon:'success',
        buttons:false,
        timer:3000,
      })
      setOtpSent(true);
      setLoader(false);
    }).catch((error) => {
      // Error; SMS not sent
      swal({
        text:'OTP not Sent',
        icon:'error',
        buttons:false,
        timer:3000,
      }); 
      setLoader(false);
      console.log(error);
    });

  }
  const verifyOTP = () => {
    try {
      setLoader(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoader(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }
  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile
      });
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='signup side flex'>
        <div className='signup-box vstack'>
          <h2 className='center'>Signup</h2>
          {otpSent ?
            <>
              <p>
                <label htmlFor="otp">OTP</label>
                <input
                  id='otp'
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  required />
              </p>
              <p className='center'>
                <Button variant='contained' color='success' onClick={verifyOTP}>
                  {loader ? <TailSpin height="30" width="80" /> : 'Confirm OTP'}</Button>

              </p>
            </>
            :
            <>
              <p>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id='name'
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </p>
              <p>
                <label htmlFor="number">Mobile No:</label>
                <input
                  type="number"
                  id='number'
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </p>
              <p>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id='password'
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </p>
              <p className='center'>
                <Button variant='contained' color='success' onClick={requestOtp}>
                  {loader ? <TailSpin height="30" width="80" /> : 'Request OTP'}
                </Button>
              </p> 
              <p className='center'>
                Already have an account <Link to={'/login'}>login</Link>
              </p>
            </>}
            <div id='recaptcha-container'></div>
        </div>

      </div>
    </>
  )
}

export default Signup
