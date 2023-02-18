import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import Reviews from './Reviews'
import { db } from '../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner'

const Detail = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    name: '',
    year: '',
    image: '',
    desc: '',
    rating: 0,
    rated: 0
  })

  useEffect(() => {
    async function getData() {
      try {
        setLoader(true);
        const docRef = doc(db, "movies", id);
        const _data = await getDoc(docRef);
        setData(_data.data());
        setLoader(false);
      } catch (err) {
        console.log('this error is throw >> ' + err)
      }
    }
    getData();

  }, []);

  return (
    <>
      {loader ?
        <div className='flex' style={{ height: '80vh', justifyContent: 'center', alignItems: 'center' }}><ThreeCircles
          height="100"
          width="100"
          color="rgb(82, 5, 5)"
          visible={true}
        /></div>
        :
        <div className='detail'>
          <div className='image-div'>
            <img src={data.image} alt="detail-img" />
          </div>

          <div className='content-div'>
            <h1>{data.name} <span>({data.year})</span></h1>
            <ReactStars
              value={data.rating / data.rated}
              edit={false}
              size={24}
            />
            <p>{data.desc}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </div>
      }
    </>
  )
}

export default Detail
