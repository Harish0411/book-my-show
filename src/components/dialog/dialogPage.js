import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import React from 'react'
import UpperTooltip from '../Theatre/tooltip/tooltip'
import './dialog.scss'
import { useState } from 'react'
import cycle from "../../assets/image/cycle.png";
import bike from "../../assets/image/bike.png";
import car from "../../assets/image/—Pngtree—car car private car rv_3897294.png";
import jeep from "../../assets/image/—Pngtree—line drawing jeep clipart_5875525.png";
import van from "../../assets/image/—Pngtree—the van going to picnic_6709837.png";
// import bus from '../../assets/image/—Pngtree—bus hd_8062076.png'
import bus from '../../assets/image/—Pngtree—blue bus_4171934.png'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { screenSeats } from '../../redux/theatreScreenSlice'
import { useEffect } from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import '../Theatre/theatre.scss'



const DialogPage = ({openFromScreen, setOpenFromScreen}) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [image, setImage] = useState(cycle)
  const [page, setPage] = useState(0);

  console.log(openFromScreen);
  

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleClose = () =>{
    setOpenFromScreen(false)
  }

  useEffect(() => {
    // swithCase()
    switch (page) {
      case 1:
        // setImage('https://contents.mediadecathlon.com/p2277240/a00a35dea99e3a6e6e0d6200666b8749/p2277240.jpg');
        setImage(cycle);
        break;
      case 2:
        // setImage('https://ic1.maxabout.us/autos/tw_india//D/2021/3/dhoom-3-bike-bmw-k1300r.jpg');
        setImage(bike);
        break;
      case 3:
        setImage(
          "https://cpimg.tistatic.com/06320552/b/4/Bajaj-Auto-Rickshaw.jpg"
        );

        break;
      case 4:
        // setImage('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/omni1-1554733279.png')
        setImage(car);
        break;
      case 5:
        // setImage('https://w7.pngwing.com/pngs/973/637/png-transparent-cartoon-vehicle-cartoon-car-cartoon-character-compact-car-car-accident.png')
        setImage(car);
        break;
      case 6:
        // setImage('https://imgd-ct.aeplcdn.com/0x0/n/enfqg3a_1573837.jpg?q=75')
        setImage(jeep);
        break;
      case 7:
        // setImage('https://www.toyota.com.sg/showroom/new-models/-/media/b31af44ac4824124a178e2d21521c93f.png')
        setImage(jeep);
        break;
      case 8:
        // setImage('https://static.tnn.in/photo/msid-94358056,width-100,height-200,resizemode-75/94358056.jpg')
        setImage(van);
        break;
      case 9:
        // setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg/1200px-LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg');
        setImage(van);
        break;
      default:
        // setImage(
        //   "https://assets.thehansindia.com/h-upload/2021/07/02/1085747-metro.webp"
        // );
        setImage(bus)
    }
  }, [page]);

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleNavigateScreen = () => {
    dispatch(screenSeats(page));
    handleClose()
    // navigate("/screenPage");
  }

  return (
    <>
        <Dialog
        fullScreen={fullScreen}
        open={openFromScreen} 
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle textAlign={"center"} style={{padding: '10px 0 0 0', fontSize: 16, fontWeight: 600}} id="responsive-dialog-title">
          How Many Seats?
        </DialogTitle>
        <DialogContent>
          <div className="dialog-content">
            <div>
              {" "}
              <img src={image} alt="" />
            </div>
            {/* <Pagination count={10} page={page} onChange={handlePageChange} color='error' hideNextButton hidePrevButton /> */}
            <div className="seat_count">
              {[...Array(10)].map((_, idx) => {
                return (
                  <span
                   key={idx}
                    className={page === idx + 1 ? "active" : ""}
                    onMouseOver={() => handlePageChange(idx + 1)}
                    // onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </DialogContent>
        <Divider />
       
          <div className="amount_detail">
            <UpperTooltip />
          </div>
          <div className="select_seat_btn">
            <button
              // variant="contained"
              // style={{ backgroundColor: "#f84464", color: "#fff" }}
              className="btn_primary"
              onClick={handleNavigateScreen}
            >
              Select seats
            </button>
          </div>
        
      </Dialog>
    </>
  )
}

export default DialogPage