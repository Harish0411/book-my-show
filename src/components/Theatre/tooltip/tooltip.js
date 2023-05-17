import React from 'react'
import './tooltip.scss'

const UpperTooltip = () => {
  return (
    <div className='tooltip_container'>
      <div className='tool_row'>
        <div className='tool_col'>
          <span className='price'>Rs.190.00</span>
          <span className='budget'>Diamond</span>
          <span className='almost'>Available</span>
        </div>
        <div className='tool_col'>
          <span className='price'>Rs.60.00</span>
          <span className='budget'>Budget</span>
          <span className='sold'>Sold Out</span>
        </div>
      </div>
    </div>
  )
}

export default UpperTooltip