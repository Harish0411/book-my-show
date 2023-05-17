import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
//import Button from '@mui/material/Button';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router";
// import Sliders from "../slider/slider";
// import MailIcon from '@mui/icons-material/Mail';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {


  const [state, setState] = React.useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 380 }}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ backgroundColor: "rgb(51, 53, 69)" }}
        >
          <Box style={{ width: "90%", margin: "auto" }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="logo"
                style={{fontStyle:'italic', cursor: 'pointer'}}
                onClick={() => navigate('/')}
               // sx={{ display: { xs: "none", sm: "block" } }}
              >
                Book<span style={{color:'red'}}>My</span>Show

                {/* <img className="logo" src="https://img.favpng.com/16/18/3/bookmyshow-india-ticket-business-logo-png-favpng-8vRkA2CifFp8vVc2803xUXxgG.jpg" alt="logo"/> */}
                
              </Typography>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon style={{ color: "black", zIndex: 100 }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                  //   inputProps={{ 'aria-label': 'search' }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    width: 500,
                  }}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </Search>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography
                  variant="p"
                  noWrap
                  component="div"
                  style={{
                    marginRight: 30,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Chennai
                  <ArrowDropDown />
                </Typography>
                <Button
                  variant="contained"
                  style={{ marginRight: 30 }}
                  size="small"
                  color="error"
                >
                  sign in
                </Button>
              </Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={state}
                onClose={toggleDrawer(false)}
              >
                {list("right")}
              </Drawer>
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
      <Box
       // sx={{ flexGrow: 1 }}
        sx={{ display: { xs: "none", sm: "block" } }}
        style={{
          backgroundColor: "rgb(31, 37, 51)",
          padding: "10px 0",
          fontSize: 13,
          marginBottom: 10,
          
        }}
      >
        <Box
          style={{
            width: "87%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "white",
            }}
          >
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Movies
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Stream
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Events
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Plays
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Sports
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Activities
            </Typography>
            <Typography variant="span" noWrap component="div">
              Buzz
            </Typography>
          </Box>
          <Box style={{ display: "flex", alignItems: "center", color: "#fff" }}>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              ListYourShow
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Corporates
            </Typography>
            <Typography
              variant="span"
              noWrap
              component="div"
              style={{ paddingRight: 20 }}
            >
              Offers
            </Typography>
            <Typography variant="span" noWrap component="div">
              Gift Cards
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
