import React from 'react'
import Sliders from '../slider/slider'
import SingleMovie from '../singleMovie'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronRight } from '@mui/icons-material';
import data from '../../Data.json'
import { screenPage } from '../../redux/theatreScreenSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {

    console.log(data);
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(screenPage(false))
    },[])

    const events = [
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300:q-80/ipl-collection-202302270454.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/workshop-and-more-web-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/kids-zone-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NDArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/comedy-shows-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/music-shows-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/esports-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/upskill-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/arts-crafts-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NiBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/theatre-shows-collection-202211140440.png',
        'https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NSBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/dance-classes-collection-202211140440.png'
    ]

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 5,
          slidesToSlide: 5,
         // partialVisibilityGutter: 140
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 4,
          slidesToSlide: 3,
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  return (
    <>
    <Sliders/>
    <section className='movie-section'>
    <div className='movies_container'>
        <div className='movies-row'>
            <div className='title'>
                <h3>Recommended Movies</h3>
                <h6 style={{display: 'flex', alignItems:'center', fontSize:14, color:'red'}}>See All <ChevronRight/> </h6>
            </div>
        <Carousel 
        swipeable={true}
        draggable={true}
        responsive={responsive}
        transitionDuration={300}
        keyBoardControl={true}
       // partialVisbile={true}
        >
     {data.map((prod, index) => (  
       <SingleMovie key={index} prod = {prod}/>
    ))}
       </Carousel>  
       </div>
       <div className='poster'>
        <img src='https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/stream-leadin-web-collection-202210241242.png' alt='poster' />
       </div>
       <div className='live_event'>
        <h2 className='le_title'>the best of live events</h2>
        <div className='le_carousal'>
            <Carousel responsive={responsive}>
            {events.map((e,i) => (
                <div className='le_img' key={i}>
                    <div className='img_card'>
                <img src={e} alt='ipl'/>
                </div>
            </div>
            ))}
            </Carousel>
        </div>
       </div>
       </div>
       </section>
  
    </>
  )
}

export default Home