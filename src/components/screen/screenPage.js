import { ArrowBackIos, CloseOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./screenPage.scss";
import { getSeatDetail } from "../../redux/detailSlice";
// import { async } from 'q';

const ScreenPage = () => {
  const { seats } = useSelector(({ screen }) => screen);
  const { theatreDetail } = useSelector(({ screen }) => screen);
  // console.log(seats);
  console.log(theatreDetail);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [label, setLabel] = useState("");
  const [seatWithLabel, setSeatWithLabel] = useState([]);
  const [column, setColumn] = useState(0);

  //   const seatClicked = (seatId, seatinfo) => {
  //     if (selectedSeats.includes(seatId)) {
  //       setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
  //     } else {
  //       setSelectedSeats([...selectedSeats, seatId]);
  //     }
  //   };

  const isSeatSelected = (seat, label, col) => {
    // console.log(seat + label);
    return seatWithLabel.includes(label + seat);
  };
  console.log(seatWithLabel);

  useEffect(() => {
    let mappedSeats = selectedSeats.map((e) => label + e);
    console.log(label);
    console.log(mappedSeats);
    setSeatWithLabel(mappedSeats);
  }, [selectedSeats, label]);

  const seatClicked = (seat, seatId, cols) => {
    setLabel(seatId);
    seatClick(seat);
    setColumn(cols);
  };

  let NUM_COLS = column;

  console.log(NUM_COLS);

  const seatClick = (seat) => {
    console.log(seat);
    const row = Math.floor((seat - 1) / NUM_COLS);
    const startSeat = row * NUM_COLS + 1;
    let numSelected = 1;
    let bookedSeats = [];

    setSelectedSeats([seat]);

    for (
      let i = seat + 1;
      i <= NUM_COLS * (row + 1) && numSelected < seats;
      i++
    ) {
      if (!bookedSeats.includes(i)) {
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, i]);
        numSelected++;
      }
    }

    if (numSelected < seats && seat > startSeat) {
      for (let i = seat - 1; i >= startSeat && numSelected < seats; i--) {
        if (!bookedSeats.includes(i)) {
          setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, i]);
          numSelected++;
        }
      }
    }

    // if (numSelected < seats) {
    //   setSelectedSeats([]);
    // }

    // return selectedSeats;
    console.log(selectedSeats);
  };
  //   console.log(selectedSeats);

  // const seats = [];

  // document.querySelectorAll('.seat').forEach(item => item.addEventListener('click', (e) => {
  //   e.preventDefault()
  //     console.log(item?.dataset.row);

  // const row = item.dataset.row;
  //     const seatNumber = item.dataset.seat;

  //     // Check if the seat is already selected
  //     const index = seats.findIndex((s) => s.row === row && s.seat === seatNumber);

  //     if (index !== -1) {
  //       // Seat is already selected, so unselect it
  //       seats.splice(index, 1);
  //       item.classList.remove('selected');
  //     } else {
  //       // Seat is not selected, so select it
  //       seats.push({ row, seat: seatNumber });
  //       item.classList.add('selected');
  //     }

  //     // Update the selected seats display
  //     const selectedSeatsElement = document.querySelector('.selected-seats');
  //     selectedSeatsElement.innerHTML = '';
  //     seats.forEach((s) => {
  //       const seatElement = document.createElement('span');
  //       seatElement.innerText = `${s.row}${s.seat}`;
  //       selectedSeatsElement.appendChild(seatElement);
  //     });
  //   })
  //  )

  // let seat = document.querySelectorAll('.seat')
  //  seat.forEach(e => e.addEventListener('click', () => {
  //

  const navigateToPayment = (seatsDetail) => {
    navigate("/payment");
    dispatch(getSeatDetail(seatsDetail));
    localStorage.setItem('seatDetail', JSON.stringify(seatsDetail))
  };

  return (
    <>
      {/* <div style={{position:'fixed', top: 0, width: '100%'}}> */}
      <div className="screen_header">
        <div className="screen_row">
          <div className="screen_col left">
            <div className="back_btn" onClick={() => navigate(-1)}>
              <ArrowBackIos fontSize="medium" style={{ cursor: "pointer" }} />
            </div>
            <div className="theatre_content">
              <h2 className="name">
                {theatreDetail.movie_name} <span className="censor">UA</span>
              </h2>
              <p className="td_content">
                {theatreDetail.theatre_name} | Today, {theatreDetail.time}
              </p>
            </div>
          </div>
          <div className="screen_col right">
            <div>
              <Button variant="outlined" style={{color : '#fff', border : '1px solid #fff', fontSize:10}} endIcon={<EditIcon style={{fontSize: 10}}/>}>
                {seats} Tickets
              </Button>
            </div>
            <div className="close_btn">
              <IconButton onClick={() => navigate(-1)}>
                <CloseOutlined style={{ color: "#fff" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="show_time">
        <div className="show_container">
          <div className="show_row">
            {theatreDetail?.show_times?.map((e, i) => (
              <div
                className="show_tyms"
                style={new Date().getHours() < e ? {display: 'block'} : {display : 'none'}}
              >
                <span className='time'>{e >= 12 ? ((e%12)%1 === 0 ? ((e%12 || 12)  + ':00') : (Math.floor(e%12) + `:${(e%12 -  Math.floor(e%12))*60}`) ) + ' PM' : ((e%12)%1 === 0 ? (e%12 + ':00') : (Math.floor(e%12) + `:${(e%12 -  Math.floor(e%12))*60}`)) + ' AM'}</span>
                                <span className='audio'>4K DOLBY ATMOS</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
      <section className="seat_layout">
        <div className="seat_container">
          <div className="seat_row">
            <table>
              <tbody>
                <tr>
                  <td className="patch" colSpan={2}>
                    DIAMOND- Rs.190.78
                  </td>
                </tr>
                {/* A row started............................................ */}
                <tr>
                  <td className="label">A</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "A", 14)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "A", 14)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "A", 14)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "A", 14)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "A", 14)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "A", 14)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "A", 14)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "A", 14)}
                      >
                        8
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "A", 14)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "A", 14)}
                      >
                        10
                      </div>

                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                      <div
                        className={`seat ${
                          isSeatSelected(11, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "A", 14)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "A", 14)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "A", 14)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "A", 14) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "A", 14)}
                      >
                        14
                      </div>
                    </div>
                  </td>
                </tr>
                {/* B row started............................................ */}
                <tr>
                  <td>B</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "B", 12)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "B", 12)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "B", 12)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "B", 12)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "B", 12)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "B", 12)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "B", 12)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "B", 12)}
                      >
                        8
                      </div>

                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "B", 12)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "B", 12)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "B", 12)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "B", 12) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "B", 12)}
                      >
                        12
                      </div>
                    </div>
                  </td>
                </tr>
                {/* C row started............................................ */}
                <tr>
                  <td>C</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "C", 16)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "C", 16)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "C", 16)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "C", 16)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "C", 16)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "C", 16)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "C", 16)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "C", 16)}
                      >
                        8
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "C", 16)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "C", 16)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "C", 16)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "C", 16)}
                      >
                        12
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "C", 16)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "C", 16)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "C", 16)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "C", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "C", 16)}
                      >
                        16
                      </div>
                    </div>
                  </td>
                </tr>
                {/* D row started............................................ */}
                <tr>
                  <td>D</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "D", 16)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "D", 16)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "D", 16)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "D", 16)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "D", 16)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "D", 16)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "D", 16)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "D", 16)}
                      >
                        8
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "D", 16)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "D", 16)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "D", 16)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "D", 16)}
                      >
                        12
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "D", 16)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "D", 16)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "D", 16)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "D", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "D", 16)}
                      >
                        16
                      </div>
                    </div>
                  </td>
                </tr>
                {/* E row started............................................ */}
                <tr>
                  <td>E</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "E", 16)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "E", 16)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "E", 16)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "E", 16)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "E", 16)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "E", 16)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "E", 16)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "E", 16)}
                      >
                        8
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "E", 16)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "E", 16)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "E", 16)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "E", 16)}
                      >
                        12
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "E", 16)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "E", 16)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "E", 16)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "E", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "E", 16)}
                      >
                        16
                      </div>
                    </div>
                  </td>
                </tr>
                {/* F row started............................................ */}
                <tr>
                  <td>F</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "F", 16)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "F", 16)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "F", 16)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "F", 16)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "F", 16)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "F", 16)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "F", 16)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "F", 16)}
                      >
                        8
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "F", 16)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "F", 16)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "F", 16)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "F", 16)}
                      >
                        12
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "F", 16)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "F", 16)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "F", 16)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "F", 16) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "F", 16)}
                      >
                        16
                      </div>
                    </div>
                  </td>
                </tr>
                {/* G row started............................................ */}
                <tr>
                  <td>G</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "G", 17)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "G", 17)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "G", 17)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "G", 17)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "G", 17)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "G", 17)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "G", 17)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "G", 17)}
                      >
                        8
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "G", 17)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "G", 17)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "G", 17)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "G", 17)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "G", 17)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "G", 17)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "G", 17)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "G", 17)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "G", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "G", 17)}
                      >
                        17
                      </div>
                    </div>
                  </td>
                </tr>
                {/* H row started............................................ */}
                <tr>
                  <td>H</td>
                  <td>
                    <div className="seat_row">
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(1, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "H", 17)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "H", 17)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "H", 17)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "H", 17)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "H", 17)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "H", 17)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "H", 17)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "H", 17)}
                      >
                        8
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(9, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "H", 17)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "H", 17)}
                      >
                        10
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "H", 17)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "H", 17)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "H", 17)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "H", 17)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "H", 17)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "H", 17)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "H", 17) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "H", 17)}
                      >
                        17
                      </div>
                    </div>
                  </td>
                </tr>
                {/* I row started............................................ */}
                <tr>
                  <td>I</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "I", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "I", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "I", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "I", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "I", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "I", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "I", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "I", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "I", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "I", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "I", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "I", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "I", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "I", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "I", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "I", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "I", 19)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "I", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "I", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "I", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                {/* J row started............................................ */}

                <tr>
                  <td>J</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "J", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "J", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "J", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "J", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "J", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "J", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "J", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "J", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "J", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "J", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "J", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "J", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "J", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "J", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "J", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "J", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "J", 19)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "J", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "J", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "J", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="seat empty">&nbsp;</div>
                  </td>
                  <td>
                    <div className="seat empty">&nbsp;</div>
                  </td>
                </tr>
                {/* K row started............................................ */}
                <tr>
                  <td>K</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "K", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "K", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "K", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "K", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "K", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "K", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "K", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "K", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "K", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "K", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "K", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "K", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "K", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "K", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "K", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "K", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "K", 19)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "K", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "K", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "K", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                {/* L row started............................................ */}
                <tr>
                  <td>L</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "L", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "L", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "L", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "L", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "L", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "L", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "L", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "L", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "L", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "L", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "L", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "L", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "L", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "L", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "L", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "L", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "L", 19)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "L", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "L", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "L", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                {/* M row started............................................ */}
                <tr>
                  <td>M</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "M", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "M", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "M", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "M", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "M", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "M", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "M", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "M", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "M", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "M", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "M", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "M", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "M", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "M", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "M", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "M", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "M", 19)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "M", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "M", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "M", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                {/* N row started............................................ */}
                <tr>
                  <td>N</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "N", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "N", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "N", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "N", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "N", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "N", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "N", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "N", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "N", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "N", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(11, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "N", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "N", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "N", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "N", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "N", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "N", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "N", 19)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "N", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "N", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "N", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                {/* O row started............................................ */}
                <tr>
                  <td>O</td>
                  <td>
                    <div className="seat_row">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "O", 21)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "O", 21)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "O", 21)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "O", 21)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "O", 21)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "O", 21)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "O", 21)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "O", 21)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "O", 21)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "O", 21)}
                      >
                        10
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(11, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "O", 21)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "O", 21)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "O", 21)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "O", 21)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "O", 21)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "O", 21)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "O", 21)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "O", 21)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "O", 21)}
                      >
                        19
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(20, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(20, "O", 21)}
                      >
                        20
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(21, "O", 21) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(21, "O", 21)}
                      >
                        21
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="patch" colSpan={2}>
                    BUDGET - Rs.60
                  </td>
                </tr>
                {/* P row started............................................ */}
                <tr>
                  <td>P</td>
                  <td>
                    <div className="seat_row sold">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "P", 19)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "P", 19)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "P", 19)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "P", 19)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "P", 19)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "P", 19)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "P", 19)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "P", 19)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "P", 19)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "P", 19)}
                      >
                        10
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>

                      <div
                        className={`seat ${
                          isSeatSelected(11, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "P", 19)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "P", 19)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "P", 19)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "P", 19)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "P", 19)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "P", 19)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "P", 19)}
                      >
                        17
                      </div>

                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "P", 19)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "P", 19) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "P", 19)}
                      >
                        19
                      </div>
                    </div>
                  </td>
                </tr>
                {/* Q row started............................................ */}
                <tr>
                  <td>Q</td>
                  <td>
                    <div className="seat_row sold">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "Q", 23)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "Q", 23)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "Q", 23)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "Q", 23)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "Q", 23)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "Q", 23)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "Q", 23)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "Q", 23)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "Q", 23)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "Q", 23)}
                      >
                        10
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(11, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "Q", 23)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "Q", 23)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "Q", 23)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "Q", 23)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "Q", 23)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "Q", 23)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "Q", 23)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "Q", 23)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "Q", 23)}
                      >
                        19
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(20, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(20, "Q", 23)}
                      >
                        20
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(21, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(21, "Q", 23)}
                      >
                        21
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(22, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(22, "Q", 23)}
                      >
                        22
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(23, "Q", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(23, "Q", 23)}
                      >
                        23
                      </div>
                    </div>
                  </td>
                </tr>
                {/* R row started............................................ */}
                <tr>
                  <td>R</td>
                  <td>
                    <div className="seat_row sold">
                      <div
                        className={`seat ${
                          isSeatSelected(1, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(1, "R", 23)}
                      >
                        1
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(2, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(2, "R", 23)}
                      >
                        2
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(3, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(3, "R", 23)}
                      >
                        3
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(4, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(4, "R", 23)}
                      >
                        4
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(5, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(5, "R", 23)}
                      >
                        5
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(6, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(6, "R", 23)}
                      >
                        6
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(7, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(7, "R", 23)}
                      >
                        7
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(8, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(8, "R", 23)}
                      >
                        8
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(9, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(9, "R", 23)}
                      >
                        9
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(10, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(10, "R", 23)}
                      >
                        10
                      </div>

                      <div
                        className={`seat ${
                          isSeatSelected(11, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(11, "R", 23)}
                      >
                        11
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(12, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(12, "R", 23)}
                      >
                        12
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(13, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(13, "R", 23)}
                      >
                        13
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(14, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(14, "R", 23)}
                      >
                        14
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(15, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(15, "R", 23)}
                      >
                        15
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(16, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(16, "R", 23)}
                      >
                        16
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(17, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(17, "R", 23)}
                      >
                        17
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(18, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(18, "R", 23)}
                      >
                        18
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(19, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(19, "R", 23)}
                      >
                        19
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(20, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(20, "R", 23)}
                      >
                        20
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(21, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(21, "R", 23)}
                      >
                        21
                      </div>
                      <div className="seat empty">&nbsp;</div>
                      <div className="seat empty">&nbsp;</div>
                      <div
                        className={`seat ${
                          isSeatSelected(22, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(22, "R", 23)}
                      >
                        22
                      </div>
                      <div
                        className={`seat ${
                          isSeatSelected(23, "R", 23) ? "selected" : "available"
                        }`}
                        onClick={() => seatClicked(23, "R", 23)}
                      >
                        23
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="screen">
          <div className="border">
            <div className="display"></div>
          </div>
        </div>
        <div className="text">All eyes this way please!</div>
        {seatWithLabel.length > 0 ? (
          <div className="payment_btn">
            <button
              type="button"
              onClick={() => navigateToPayment(seatWithLabel, theatreDetail)}
              className="pay"
            >
              Pay Rs.{190 * seatWithLabel.length}
            </button>
          </div>
        ) : (
          <>
            <div className="seating_label">
              <div className="legend_col">
                <div className="seat_lengent status-1"></div>
                <div className="lengent_text">Available</div>
              </div>
              <div className="legend_col">
                <div className="seat_lengent status-2"></div>
                <div className="lengent_text">Selected</div>
              </div>
              <div className="legend_col">
                <div className="seat_lengent status-3"></div>
                <div className="lengent_text">Sold</div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ScreenPage;
