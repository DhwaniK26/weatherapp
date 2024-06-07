import React from 'react'
import './listView.css'

export default function ListView(props) {
  return (
    <div>
      
      <div className='p-3 main-bg d-flex justify-content-center align-items-center '>
        <div className='m-1  first text-align-center ' >
          <img src="http://cdn.onlinewebfonts.com/svg/img_116176.png" className='hum'/><br></br> 
          <p className='words'>{props.humidity} %</p>
         
          <p>HUMIDITY</p>

        </div>

        <div className='m-1 middle text-align-center '>
          <img src="http://cdn.onlinewebfonts.com/svg/img_540502.png" className='hum'/><br></br>
          <p style={{lineHeight:"3"}}>{props.wind} m/s</p>
         
         <p>WIND</p>
        </div>

        <div className='m-1 last text-align-center'>
           <img src="https://webstockreview.net/images/cloud-icon-png.png" className='hum'/><br></br>
           <p className=''>{props.cloud} %</p>
         
         <p>CLOUDY</p>
        </div>
      </div>

    </div>
  )
}
