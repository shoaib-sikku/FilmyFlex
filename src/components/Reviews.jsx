import React, { useEffect, useState, useContext } from 'react'
import { Button, Rating } from '@mui/material'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import { db, reviewRef } from '../firebase/firebase'
import ReactStars from 'react-stars'
import { addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore'
import swal from 'sweetalert'
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom'

const Reviews = ({ id, prevRating, userRated }) => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [temp, setTemp] = useState(0);
    const [rating, setRating] = useState(0);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [reviewsLoader, setReviewsLoader] = useState(false);

    const addReview = async () => {
        setLoader(true);
        try {

            if (useAppstate.login) {
                await addDoc(reviewRef, {
                    movieid: id,
                    thought: form,
                    name: useAppstate.username,
                    rating: rating,
                    timstamp: new Date().getTime()
                });
                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: userRated + 1
                })
                setTemp(temp + 1);
                swal("Hurray!", "Your review successfully added!", "success");
            } else {
                navigate('/login')
            }
        } catch (err) {
            swal("Error!", `${err.message}!`, "error");
        }
        setLoader(false);
    }
    useEffect(() => {

        async function getReviews() {
            setReviewsLoader(true);
            const qur = query(reviewRef, where("movieid", "==", id));
            const _data = await getDocs(qur);
            _data.forEach((doc) => setData((prev) => [...prev, doc.data()]));
            setReviewsLoader(false);
        }
        getReviews();

    }, [temp]);
    return (
        <div className='reviews'>
            <Rating
                name="simple-controlled"
                value={rating}
                sx={{ backgroundColor: 'grey' }}
                onChange={(e) => setRating(e.target.value)}
            />
            <input
                type="text"
                placeholder='Enter your reviews..'
                value={form}
                onChange={(e) => setForm(e.target.value)}
            />
            <Button variant='contained' color='success' onClick={addReview}>
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

            {reviewsLoader ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ThreeDots size={20} color="#ffffff" />
                </div>
                :
                <>
                    {data.map((e, i) => {
                        return (
                            <div key={i} className='reviews-box'>
                                <div className='flex'>
                                    <p>{e.name}</p>
                                    <p>({new Date(e.timstamp).toLocaleString()})</p>
                                </div>
                                <ReactStars
                                    value={e.rating}
                                    edit={false}
                                    size={15}
                                />
                                <p>{e.thought}</p>
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}

export default Reviews
