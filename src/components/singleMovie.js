// import { Card } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import {CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router';
import { detailPage } from '../redux/detailSlice';



const SingleMovie = ({prod}) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const navigateToFullDetails = (value) =>{
    navigate('/detailed_page')
    dispatch(detailPage(value))
    localStorage.setItem('movieDetail', JSON.stringify(value))
  }

  return (
    <div className='movies' >
      <div className='movies-card' onClick={() => navigateToFullDetails(prod)}>
       <div className='card_img'>
        <img src={prod.imgUrl} alt={prod.movie_name} />
       </div>
       <div className='card_content'>
         <div className='movie_name'>{prod.movie_name}</div>
         <div className='description'>{prod.genre}</div>
      </div>
     </div>
    </div>
  )
}

export default SingleMovie













