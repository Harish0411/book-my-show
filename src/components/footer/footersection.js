import React from 'react'
import './footer.scss'
import GrassIcon from '@mui/icons-material/Grass';
import Button from '@mui/material/Button';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
// import NewspaperIcon from '@mui/icons-material/Newspaper';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Tab, Tabs } from '@mui/material';
import { FavoriteBorder, PersonPinCircleOutlined, PhonelinkLockOutlined } from '@mui/icons-material';

const Footersection = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <>
    <Box sx={{ display: { xs: "block", sm: "none" } }} className='mobile_nav'>
        <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
  <Tab icon={<PhonelinkLockOutlined />} aria-label="phone" />
  <Tab icon={<FavoriteBorder />} aria-label="favorite" />
  <Tab icon={<PersonPinCircleOutlined />} aria-label="person" />
</Tabs>
    </Box>




    <div className='foot-sect'>
        <div className='foot-container'>
            <div className='foot-row'>
                <div>
                <GrassIcon className='foot-icon'/>
                </div>
                <div className='foot-col1'>
                <h2 className='foot-h2'> <b className='bold'>List Your Show</b><span>Got a Show,event,activity or a great experience?Parter with us & get listed on BookMyShow</span></h2>
                </div>
                <div className='foot-col2'>
                <Button className='foot-btn' variant="Contact today!">Contact today!</Button>
                </div>
            </div>
        </div>
        <div className='footer-icons'>
            <div className='footer-container'>
                <div className='footer-row'>
                    <div className='footer-detail'>
                       <h4 ><SupportAgentIcon style= {{fontSize:60}}/></h4>
                       <p>24/7 CUSTOMER CARE</p> 
                    </div>
                    <div className='footer-detail'>
                    <h4><MovieFilterIcon style= {{fontSize:60}}/></h4>
                    <p>RESEND BOOKING COMFORMATION</p> 
                    </div>
                    <div className='footer-detail'>
                    <h4> <ForwardToInboxIcon style= {{fontSize:60}} /></h4>
                      <p>SUBSCRIBE TO THE NEWSLETTER</p> 
                    </div>
                </div>
                </div>
            </div>
            <div className='fo-line'>
                <div className='fo-container'>
                    <div className='fo-row'>
                        <div className='fo-name'>
                        <p className='fo-text'>Book<span>My</span>Show</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='foot-sect'>
                <div className='foot-container'>
                    <div className='fs-image'>
                   <FacebookSharpIcon style= {{fontSize:50}}  className='f-image' />
                   <TwitterIcon  style= {{fontSize:50}}  className='f-image'/>
                   <InstagramIcon style= {{fontSize:50}}  className='f-image'/>
                   <YouTubeIcon  style= {{fontSize:50}}  className='f-image'/>
                   <PinterestIcon style= {{fontSize:50}}  className='f-image'/>
                   <LinkedInIcon style= {{fontSize:50}}  className='f-image'/>
                    </div>
                    
                </div>
            </div>
            <div>
                    <div className='foot-para'>
                        <p>Copyright 2023 © Bigtree Entertainment Pvt. Ltd. All Rights Reserved.<br/>
                        The content and images used on this site are copyright protected and copyrights vests with the
                         respective owners. The usage of the content and images on this website is intended to promote the 
                         works and no endorsement of the artist shall be implied.
                    <br/> punishable by law.</p>
                    </div>
                    </div>
      </div>
      </>
  )
}

export default Footersection
