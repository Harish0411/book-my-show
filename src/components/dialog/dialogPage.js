import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Pagination } from '@mui/material'
import React from 'react'
import UpperTooltip from '../Theatre/tooltip/tooltip'
import './dialog.scss'


const DialogPage = ({props}) => {
  return (
    <>
        <Dialog
        fullScreen={props?.fullScreen}
        open={props?.open}
        onClose={props?.closeFun}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle textAlign={'center'} id="responsive-dialog-title">
        How Many Seats?
       
        </DialogTitle>
        <DialogContent>
      
       <div className='dialog-content'>
        <div style={{marginBottom: 20}}>  
           <img  src={props?.image} alt=''/>
        </div>
        <Pagination count={10} page={props?.page} onChange={props?.handlePageChange} color='error' hideNextButton hidePrevButton />
        </div>
        
        </DialogContent>
        <Divider/>
        <DialogActions>
         <div className='seat_available'>
            <UpperTooltip/>
         </div>
         <div className='seat_available'>
          <Button  variant='contained' style={{backgroundColor:'#f84464', color:'#fff'}} onClick={props?.handleNavigateScreen} >
            Select seats
          </Button>
        </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogPage