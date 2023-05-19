import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./theatre.scss";
import { Col, ListGroup, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UpperTooltip from "./tooltip/tooltip";
import Tooltip from "@mui/material/Tooltip";
import {
  FastfoodOutlined,
  FiberManualRecord,
  PhoneIphoneOutlined,
} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  // Pagination,
  Select,
} from "@mui/material";
import {
  getTheatreDetail,
  screenPage,
  screenSeats,
} from "../../redux/theatreScreenSlice";
import { useNavigate } from "react-router";
// import DialogPage from '../dialog/dialogPage';

import cycle from "../../assets/image/cycle.png";
import bike from "../../assets/image/bike.png";
import auto from '../../assets/image/auto3.jpg';
import car from "../../assets/image/—Pngtree—car car private car rv_3897294.png";
import jeep from "../../assets/image/—Pngtree—line drawing jeep clipart_5875525.png";
import van from "../../assets/image/—Pngtree—the van going to picnic_6709837.png";
// import bus from '../../assets/image/—Pngtree—bus hd_8062076.png'
import bus from '../../assets/image/—Pngtree—blue bus_4171934.png'
// import DialogPage from "../dialog/dialogPage";

const TheatrePage = () => {
  const { detail } = useSelector(({ detail }) => detail);
  console.log(detail);


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   const LightTooltip = styled(({ className, ...props }) => (
  //     <Tooltip {...props} classes={{ popper: className }} />
  //   ))(({ theme }) => ({
  //     [`& .${tooltipClasses.tooltip}`]: {
  //       backgroundColor: theme.palette.common.white,
  //       color: 'black',
  //       boxShadow: theme.shadows[1],
  //       fontSize: 11,
  //     },
  //   }));

  const dateBuilder = (d, i) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "Septemper",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay() + (i > 6 || 6 ? i % 6 : i)];
    let date = d.getDate() + i;
    let month = months[date > 31 ? d.getMonth() + 1 : d.getMonth()];
    // let year = d.getFullYear();
    return `${day}, ${month} ${date}`;
  };

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [image, setImage] = useState(
   cycle
  );
  const [filterContent, setFilterContent] = useState([]);
  console.log(filterContent);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (
    tym,
    theatreName,
    budget,
    premium,
    movieName,
    show_times,
    event
  ) => {
    setOpen(true);
    event.currentTarget.classList.add('active')
    dispatch(
      getTheatreDetail({
        time: tym,
        theatre_name: theatreName,
        movie_name: movieName,
        budgetPrice: budget,
        premiumPrice: premium,
        numberOfSeatSelected: page,
        show_times: show_times,
      })
    );

    localStorage.setItem(
      "theatreDetail",
      JSON.stringify({
        time: tym,
        theatre_name: theatreName,
        movie_name: movieName,
        budgetPrice: budget,
        premiumPrice: premium,
        numberOfSeatSelected: page,
        show_times: show_times,
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateScreen = (seat) => {
    // setOpen(false);

    dispatch(screenSeats(page));

    navigate("/screenPage");

    dispatch(screenPage(true));

    localStorage.setItem("screenPageOpen", true);

    localStorage.setItem("seatSelected", JSON.stringify(page));
  };

  useEffect(() => {
    dispatch(screenPage(false))
  },[])

  const handlePageChange = (value) => {
    setPage(value);
  };

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
        // setImage(
        //   "https://cpimg.tistatic.com/06320552/b/4/Bajaj-Auto-Rickshaw.jpg"
        // );
        setImage(auto)

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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = ["Morning", "Afternoon", "Evening", "Night"];

  // const [filterContent, setfilterContent] = React.useState([]);

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterContent(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const filteredTheatreShow = (showTime) => {
    var temp = showTime;

    if (
      filterContent.includes("Morning") &&
      filterContent.includes("Evening")
    ) {
      temp = temp.filter((e) => 0 < e < 12 && 16 <= e <= 19);
      return temp;
    }

    if (filterContent.includes("Morning") && filterContent.includes("Night")) {
      temp = temp.filter((e) => 0 < e < 12 && 19 <= e <= 24);
      return temp;
    }
    if (
      filterContent.includes("Morning") &&
      filterContent.includes("Afternoon")
    ) {
      temp = temp.filter((e) => 0 < e && e < 16);
      return temp;
    }
    if (
      filterContent.includes("Afternoon") &&
      filterContent.includes("Evening")
    ) {
      temp = temp.filter((e) => 12 < e && e < 19);
      return temp;
    }
    if (filterContent.includes("Evening") && filterContent.includes("Night")) {
      temp = temp.filter((e) => 16 <= e && e <= 24);
      return temp;
    }

    if (filterContent.includes("Morning")) {
      temp = temp.filter((e) => 0 < e && e < 12);
      return temp;
    }
    if (filterContent.includes("Afternoon")) {
      temp = temp.filter((e) => 12 <= e && e < 16);
      return temp;
    }
    if (filterContent.includes("Evening")) {
      temp = temp.filter((e) => 16 <= e && e < 19);
      return temp;
    }
    if (filterContent.includes("Night")) {
      temp = temp.filter((e) => 19 <= e && e <= 24);
      return temp;
    }

    return temp;
  };

  return (
    <>
      <div className="header">
        <div className="title_container">
          <h1 className="movie_name">{detail.movie_name}</h1>
          <div className="more_detail">
            <span className="censor">UA</span>
            <span className="tags">
              {detail?.genre?.map((e) => (
                <span key={e} className="genre_tag">
                  {e}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="filters">
        <div className="filter_container">
          <div className="filter_row">
            <div className="date_picker">
              <Box
                sx={{
                  maxWidth: { xs: 320, sm: 480 },
                  bgcolor: "background.paper",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  {[...Array(10)].map((_, idx) => (
                    <Tab key={idx} label={dateBuilder(new Date(), idx)} />
                  ))}
                </Tabs>
              </Box>
            </div>
            <div className="show_filter">
              {/* <Box sx={{ minWidth: 320 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter show timings</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterContent}
          label="view by"
          onChange={handleFilterChange}
        >
          <MenuItem value={'Morning'} >Morning</MenuItem>
          <MenuItem value={'Afternoon'} >Afternoon</MenuItem>
          <MenuItem value={'Evening'} >Evening</MenuItem>
          <MenuItem value={'Night'} >Night</MenuItem>
        </Select>
      </FormControl>
    </Box> */}
              <Box>
                <FormControl sx={{ minWidth: 220 }}>
                  <InputLabel
                    style={{ overflow: "hidden" }}
                    id="demo-multiple-checkbox-label"
                  >
                    Filter Show Timings
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={filterContent}
                    onChange={handleFilterChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    style={{ border: 0 }}
                    // placeholder='Filter show Timing..'
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={filterContent.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="theatre_sec">
        <div className="theatre_detail">
          <ListGroup>
            {detail?.theatres?.map((item, idx) => (
              <ListGroup.Item key={idx}>
                <Row>
                  <Col md={6}>
                    <p style={{ fontSize: 15, color: "#000", fontWeight: 700 }}>
                      {" "}
                      {item.theatre_name}{" "}
                    </p>
                    <span
                      style={{
                        color: "#81e291",
                        fontSize: 14,
                        paddingRight: 20,
                      }}
                    >
                      <PhoneIphoneOutlined fontSize="14px" /> M-Ticket
                    </span>
                    <span style={{ color: "orange", fontSize: 14 }}>
                      <FastfoodOutlined fontSize="14px" /> Food & Reverage
                    </span>
                  </Col>
                  <Col md={6}>
                    <div className="show_row">
                      {filteredTheatreShow(item?.showTimes)?.map((e, i) => (
                        <Tooltip key={i} title={<UpperTooltip />} placement="top" arrow>
                          <div
                            onClick={(event) =>
                              handleClickOpen(
                                e,
                                item.theatre_name,
                                item.budgetPrice,
                                item.premiumPrice,
                                detail.movie_name,
                                item.showTimes,
                                event
                              )
                            }
                            className="showtimes"
                            style={
                              new Date().getHours() < e
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <span className="time">
                              {e >= 12
                                ? ((e % 12) % 1 === 0
                                    ? (e % 12 || 12) + ":00"
                                    : Math.floor(e % 12) +
                                      `:${
                                        ((e % 12) - Math.floor(e % 12)) * 60
                                      }`) + " PM"
                                : ((e % 12) % 1 === 0
                                    ? (e % 12) + ":00"
                                    : Math.floor(e % 12) +
                                      `:${
                                        ((e % 12) - Math.floor(e % 12)) * 60
                                      }`) + "AM"}
                            </span>
                            <span className="audio">4K DOLBY ATMOS</span>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                    {item.isCancellable ? (
                      <span
                        style={{ fontSize: 12, textTransform: "capitalize" }}
                      >
                        <FiberManualRecord
                          style={{ fontSize: 10, color: "orange" }}
                        />{" "}
                        Cancellation available
                      </span>
                    ) : (
                      <span
                        style={{ fontSize: 12, textTransform: "capitalize" }}
                      >
                        <FiberManualRecord
                          style={{ fontSize: 10, color: "orange" }}
                        />
                        Non-Cancellable
                      </span>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>

      {/* <DialogPage fullScreen={fullScreen} open={open} handleClose={handleClose} page={page} handlePageChange={handlePageChange} handleNavigateScreen={handleNavigateScreen} image={image}/> */}

      <Dialog
        fullScreen={fullScreen}
        open={open}
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
            <div className="seat_count">
              {[...Array(10)].map((_, idx) => {
                return (
                  <span
                  key={idx}
                    className={page === idx + 1 ? "active" : ""}
                    onMouseOver={() => handlePageChange(idx + 1)}
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
              className="btn_primary"
              onClick={handleNavigateScreen}
            >
              Select seats
            </button>
          </div>
        
      </Dialog>
    </>
  );
};

            {/* <Pagination count={10} page={page} onChange={handlePageChange} color='error' hideNextButton hidePrevButton /> */}


export default TheatrePage;
