import React, { useState } from 'react'
import { Button } from '@mui/material'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import { addDoc } from 'firebase/firestore'
import { movieRef } from '../firebase/firebase'

const AddMovie = () => {
  const [form, setForm] = useState({
    name: '',
    image: '',
    desc: '',
    year: '',
    rating: 0,
    rated: 0
  });
  const [loader, setLoader] = useState(false);
  const addmovie = async () => {
    try {
      setLoader(true);
      await addDoc(movieRef, form);
      swal("Hurray!", "Your movie successfully added!", "success");
      setLoader(false);
      setForm({
        name: '',
        image: '',
        desc: '',
        year: ''
      });
    } catch (err) {
      swal("Error!", `${err}!`, "error");
      setLoader(false);
    }

  }
  return (
    <>
      <div className='addmovie flex'>
        <div className='addmovie-box'>
          <h1 className='center'>Add Movie</h1>
          <div className='vstack'>
            <p>
              <label htmlFor="title">Title:</label>
              <input type="text" id='title' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </p>
            <p>
              <label htmlFor="year">Year:</label>
              <input type="text" id='year' value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
            </p>
            <p>
              <label htmlFor="link">Image Link:</label>
              <input type="text" id='link' value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
            </p>
            <p>
              <label htmlFor="desc">Description:</label>
              <textarea id="desc" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} required></textarea>
            </p>
            <p className='center'>
              <Button variant='contained' color='success' onClick={addmovie}>
                {loader ? <TailSpin
                  height="27"
                  width="80"
                  color="#4fa94d"
                  radius="1"
                  visible={true}
                /> :
                  'Submit'
                }
              </Button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMovie
