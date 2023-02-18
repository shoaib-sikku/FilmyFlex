import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { movieRef } from '../firebase/firebase'
import { getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'

const Home = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoader(true)
        const _data = await getDocs(movieRef);
        _data.forEach((doc) => {
          setData((pre) => [...pre, { ...(doc.data()), id: doc.id }])
        })
        setLoader(false)
      } catch (err) {
        console.log(err)
        setLoader(false)
      }
    }
    getData()
  }, [])
  return (
    <>{loader ?
      <div className='flex' style={{ height: '80vh', justifyContent: 'center', alignItems: 'center' }}><ThreeCircles
        height="100"
        width="100"
        color="rgb(82, 5, 5)"
        visible={true}
      /></div> :
      <div className='home stack side'>
        {data.map((data, i) => (
          <Link to={`/detail/${data.id}`}>
            <div className='card' key={i}>
              <div className='card-head'>
                <img src={data.image} alt="poster" />
              </div>
              <div className='card-body'>
                <p><span>Name:</span> {data.name}</p>
                <p className='flex'><span>Rating:</span>
                  <ReactStars
                    value={data.rating / data.rated}
                    edit={false}
                    size={15}
                  />
                </p>
                <p><span>Year:</span> {data.year}</p>
              </div>
            </div>
          </Link>
        ))
        }
      </div>
    }

    </>
  )
}

export default Home