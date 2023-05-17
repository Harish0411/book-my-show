export const snacksItems=[
    {
    id : 1,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020002_13082018125553.jpg",
    name:"Large Popcorn",
    price:300,
    regular:"Chiken",
},
    {
    id : 2,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020036_13082018160631.jpg",
    name:"French Fries",
    price:150,
    regular:"Peri Peri",
},
    {
    id : 3,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020101_06082018162224.jpg",
    name:"Cold Coffee",
    price:180,
    regular:"Cold",
},
{
    id : 4,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020171_06082018153946.jpg",
    name:"Water Bottle",
    price:50,
    regular:"Filter Water",
},
{
    id:5,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020131_09082018184413.jpg",
    name:"Steam Corn",
    price:150,
    regular:"Masala",
},
{
    id:6,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020092_13082018160348.jpg",
    name:"Brownie Fudge",
    price:200,
    regular:"Chaco",
},
{
    id : 7,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020016_17082018120212.jpg",
    name:"Chicken Burger",
    price:200,
    regular:"chicken",
},
{
    id:8,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1174632_969_07012021150620.jpg",
    name:"Amul Butter",
    price:20,
    regular:"Butter"
},
{
    id:9,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020279_14082018150709.jpg",
    name:"Milk Shake",
    price:260,
    regular:'Vennila'
},
{
    id:10,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020092_13082018160348.jpg",
    name:"Brownie Fudge",
    price:200,
    regular:"Chaco",
},
{
    id : 11,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020016_17082018120212.jpg",
    name:"Chicken Burger",
    price:200,
    regular:"chicken",
},
{ 
    id:12,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1174632_969_07012021150620.jpg",
    name:"Amul Butter",
    price:20,
    regular:"Butter"
},
{
    id:13,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020279_14082018150709.jpg",
    name:"Milk Shake",
    price:240,
    regular:'Vennila'
},
{
    id:14,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020092_13082018160348.jpg",
    name:"Brownie Fudge",
    price:200,
    regular:"Chaco",
},
{
    id:15,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020016_17082018120212.jpg",
    name:"Chicken Burger",
    price:200,
    regular:"chicken",
},
{
    id:16,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1174632_969_07012021150620.jpg",
    name:"Amul Butter",
    price:20,
    regular:"Butter"
},
{
    id:17,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020279_14082018150709.jpg",
    name:"Milk Shake",
    price:240,
    regular:'Vennila'
},
{
    id:18,
    image:"https://in.bmscdn.com/bmsin/v2/Web-v2/d-combo/1020002_13082018125553.jpg",
    name:"Milk Shake",
    price:240,
    regular:'Vennila'
},

]

// import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// import React from "react";
// import  {carDetails} from "../details/data";
// import { useSelector } from "react-redux";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './featured.scss'

// const Featured=()=>{


//     var settings = {
//         dots: true,  
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         arrows: true,
//         autoplay:true
//       };
    
//     const details=useSelector((detail)=>detail.allDetail.allCarDetails);
//     console.log('details',details);

//     return(
//     <div className="feat-container">
            
//         <div className="feat-head">
//   <h1> Featured</h1>
//         </div>
//         <div className="feat">
//         <Slider {...settings}>
//             {details.map((value,index)=>{
//                     return(
//                         <div className="feat1" key={index}>
//              <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                     component="img"
                    
//                     image={value.image}
//                 />
//                 <CardContent>
//                     <Typography gutterBottom variant="h5" className="card-title"  component="div">
//                     {value.model}
//                     </Typography>
//                     <Typography variant="body2" className="card-price" >
//                     {value.prize}
//                     </Typography>
//                     <Typography variant="body2" className="card-avg" >
//                     Avg. Ex-Showroom price
//                     </Typography>
//                 </CardContent>
//              </Card>
//             </div>
//                     )
//                 })
//             }
//     </Slider>
//       </div>
//       </div>
//     )
// }
// export default Featured


// import { configureStore } from "@reduxjs/toolkit";
// import allData from "../redux/slice";

// export const stores=configureStore({
//     reducer:{
//         allDetail:allData
//     }
// })

// import { createSlice } from "@reduxjs/toolkit";
// import  {carDetails} from "../details/data";

// const allData=createSlice({
//     name:"carwale",
//     initialState:{
//         allCarDetails:carDetails,
        
//     },
//     reducers:{
      
//     }
// })

// export default allData.reducer;