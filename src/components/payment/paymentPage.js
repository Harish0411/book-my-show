import React, { useEffect, useState } from "react";
import "./paymentPage.scss";
import Card from "@mui/material/Card";
import { snacksItems } from "./snacksdetail";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import AdjustIcon from "@mui/icons-material/Adjust";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardArrowDown } from "@mui/icons-material";
import { addToCartDetail, removeCartDetail } from "../../redux/cartSlice";


const PaymentPage = () => {
  const { seatDetail } = useSelector(({ detail }) => detail);
  const { theatreDetail } = useSelector(({ screen }) => screen);
  const { cart } = useSelector(({ cart }) => cart);
  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState(0);
  const dispatch = useDispatch();
  // console.log(cart);
  // console.log(seatDetail);

  let gatDefaultCart = () => {
    let cartItem = {};
    for (let i = 0; i < snacksItems.length; i++) {
      cartItem[snacksItems[i].id] = 1;
    }
    return cartItem;
  };
  const [cartItem, setCartItem] = useState(gatDefaultCart());
  console.log(cartItem);

// quantity adding & removing function

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    if (cartItem[itemId] > 0)
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItem = (newAmount, itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // total calculation

  let getTotalCartAmount = () => {
    var totalAmount = 0;
    for (let item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = cart.find(e => e.id === Number(item))
        console.log(itemInfo)
        console.log(item)
        
        console.log(cartItem[item]);
        totalAmount += +cartItem[item] * +itemInfo?.price;
        
        console.log(totalAmount)
        return totalAmount
      }
     
    }
  
   
  };

  let totalAmount = getTotalCartAmount();
  console.log(totalAmount);

 

  const ConveniencePrice = 177;

  useEffect(() => {
    let subTotal =
      seatDetail.length * theatreDetail.premiumPrice + ConveniencePrice;

    setTotal(subTotal);
    setPay(subTotal + seatDetail.length);
  }, [total, seatDetail.length, theatreDetail.premiumPrice]);

  useEffect(() => {
    getTotalCartAmount();
  },[cart]);

  return (
    <div className="snacks-sect">
      <div className="snacks-container">
        <div className="snacks-row">
          <div className="snacks-col1">
            <div className="snacks-banner">
              <img
                src="https://assets-in.bmscdn.com/promotions/cms/creatives/1680241761377_web.jpg"
                alt="poster"
              />
            </div>
            <div className="bites">
              <div className="fixed">
                <div>
                  <h2 className="bite">
                    Grab a <span>bite!</span>
                  </h2>
                  <p className="savemore">Prebook Your Meal and Save more!</p>
                </div>
                <div className="lists">
                  <div className="lists-2">
                    <span className="bite-list1">ALL</span>
                    <span className="bite-list">COMBOS</span>
                    <span className="bite-list">POPCORN</span>
                    <span className="bite-list">SNACKS</span>
                    <span className="bite-list">DESSERTS</span>
                    <span className="bite-list">BEVERAGES</span>
                  </div>
                </div>
              </div>
              <div className="sna-container">
                <div className="sna-row">
                  {snacksItems.map((value, index) => {
                    return (
                      <div className="feat1" key={index}>
                        <Card sx={{ maxWidth: 390 }} className="card">
                          <div className="image-popcorn">
                            <CardMedia
                              sx={{ height: 130 }}
                              image={value.image}
                              title="Choose Snackes"
                            />

                            <div className="popcorn">
                              <h2 className="amount">₹{value.price}</h2>
                            </div>
                          </div>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className="snacksss"
                            >
                              <div className="content">
                                <h4 className="snacks-name">{value.name}</h4>
                                <p className="snak-para">{value.regular}</p>
                              
                                  <div className="latco">
                                    <Icon
                                      icon="mdi:lacto-vegetarian"
                                      className="veg-icon"
                                    />
                                    {cart.some((e) => e.id === value.id) ? (
                                      <div className="action">
                                        <button
                                          className="add-btn"
                                          onClick={() =>
                                            removeFromCart(value.id)
                                          }
                                        >
                                          -
                                        </button>
                                        <input
                                          type="text"
                                          className="input"
                                          value={
                                            cartItem[value.id] !== 0
                                              ? cartItem[value.id]
                                              : dispatch(
                                                  removeCartDetail(value)
                                                )
                                          }
                                          onChange={(e) =>
                                            updateCartItem(e.target.value, value.id)
                                          }
                                        ></input>
                                        <button
                                          className="add-btn"
                                          onClick={() => addToCart(value.id)}
                                        >
                                          +
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        className="counting"
                                        onClick={() =>
                                          dispatch(addToCartDetail(value))
                                        }
                                      >
                                        ADD
                                      </button>
                                    )}
                                  </div>
                             
                              </div>
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="instructions">
                <h3 className="notes">Note :</h3>
                <ol>
                  <li>Images are for representation purposes only.</li>
                  <li>Prices inclusive of taxes.</li>
                  <li>
                    All nutritional information is indicative, values are per
                    serve as shared by the Cinema and may vary depending on the
                    ingredients and portion size
                  </li>
                  <li>
                    An average active adult requires 2000 kcal energy per day,
                    however, calorie needs may vary.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="snacks-col2">
            <div className="tickets-booking">
              <div className="order-summary">
                <span className="icon-left"></span>
                <span className="icon-right"></span>
              </div>
              <h2 className="col2-head">BOOKING SUMMARY</h2>
              <ul className="col2-list">
                <div className="amount_row">
                  <div>
                    DIAMOND-
                    {seatDetail.map((e, i) => (
                      <span key={i}>
                       <span>{e}</span>
                        {", "}
                      </span>
                    ))}
                    <span className="col2-ticket">
                      ({seatDetail.length} Tickets)
                      <br />
                      <span className="col2-screen">SCREEN 2</span>{" "}
                    </span>
                  </div>
                  <div className="col2-amount">
                    Rs. ₹{seatDetail.length * theatreDetail.premiumPrice}
                  </div>
                </div>
                <div className="col3-amount">
                  <div className="col3_col">
                    <KeyboardArrowDown style={{ fontSize: 20 }} />
                    Convenience fees{" "}
                  </div>
                  <div className="col3_col">Rs.{ConveniencePrice}.00</div>
                </div>
              </ul>

              {cart?.map((e, i) => (
                <div className="expand snacks_item" key={i}>
                  <div>
                    <p>{e.name}</p>
                  </div>
                  <div>
                    <p>₹{e.price * cartItem[e.id]}</p>
                  </div>
                </div>
              ))}

              <div className="expand">
                <div>
                  <p>Sub total</p>
                </div>
                <div>
                  <p>₹{total}</p>
                </div>
              </div>
              <div className="col2-book">
                <div className="col2-smile">
                  <div>
                    <h5 className="col2-to">
                      <span>
                        <MoodBadIcon />
                      </span>
                      Contribution to BookASmile
                    </h5>
                    <h6 className="col2-two">(₹1 per ticket has been added)</h6>
                    <h5 className="col2-view">VIEW T&C</h5>
                  </div>
                  <div>
                    <h5>Rs.{seatDetail.length}</h5>
                    <h6 className="remove">Remove</h6>
                  </div>
                </div>

                <div></div>
              </div>
              <div className="col2-state">
                <p>
                  Your current state is<span>Tamil Nadu</span>
                </p>
              </div>
            </div>
            <div className="total-amounts">
              <div style={{ fontSize: 17 }}>Amount Payable</div>
              <div style={{ fontSize: 17 }}>Rs.{pay}.00</div>
            </div>
            <div className="col2-ticket">
              <h4>SELECT TICKET TYPE</h4>
            </div>
            <div className="ticket-icon">
              <div>
                <span className="adjustIcon">
                  <AdjustIcon className="iconcolor" />
                </span>
                <span className="adjustIcon">
                  <BookOnlineIcon />
                  M-Ticket
                </span>
              </div>
              <div>
                <span className="adjustIcon">
                  <RadioButtonUncheckedIcon />
                </span>
                <span className="adjustIcon">
                  <HomeWorkIcon />
                  Box Office Pickup
                </span>
              </div>
            </div>
            <div className="col2-show">
              <p>
                Show the m-ticket QR Code on your mobile to enter the cinema.
              </p>
            </div>
            <div className="last-para">
              <p>
                <ReportGmailerrorredIcon />
              </p>
              <p>
                By proceeding, I express my consent to complete this
                transaction.
              </p>
            </div>
            <div className="button">
              <div>
                <div>TOTAL:Rs{pay}.00</div>
              </div>
              <div>
                <div>Proceed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
