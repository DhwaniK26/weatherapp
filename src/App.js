import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import './App.css';
import ListView from './comps/listView';

export default function App() {

  const [cityname, cityfunc] = useState("Valsad");
  const [date, datefunc] = useState(null);
  const [temp,tempfunc] = useState(null);
  const [desc, descfunc] = useState(null);
  const [sea,seafunc] = useState(null);
  

  const [hum, humfunc] = useState(null);
  const [rain,rainfunc] = useState(null);
  const [myywind, windfunc] = useState(null);

  const [icon, iconfunc] = useState(null);


  const weatherIcon = [
    "https://cdn0.iconfinder.com/data/icons/40-weather-conditions/128/partly_cloudy-1024.png", //cloudy
    "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png", //rainy
    "https://cdn1.iconfinder.com/data/icons/smashicons-weather-flat/60/68_-_Sunny_Flat-1024.png", //suuny
    "https://cdn2.iconfinder.com/data/icons/weather-24/256/Snow_Day-1024.png" //snowy

  ]
  useEffect(()=>{
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    datefunc(Intl.DateTimeFormat('en-US', options).format(date));
    //iconfunc(weatherIcon[2])
    citysearch("Valsad");

  },[])

  var clickrun = ()=>{
     citysearch(cityname)
  }

  const citysearch = (mycityname)=>{
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${mycityname}`;

    fetch(url)
            .then(function(response) {
               return response.json();
            }).then(function(data) {
               if (data.length > 0) {
                  var lat = data[0].lat
                  var long = data[0].lon

                  console.log("Latitude:", lat);
                  console.log("Longitude:", long);

                  var key = "9006914d7d981088160fd5ba9aba9c37";

                  var wurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

                 fetch(wurl)
                    .then(function(response){
                        return response.json();
                    }).then(function(data){
                        var kelvin = Math.round(data.main.temp);
                        var cel = kelvin - 273.15;
                        console.log(data);
                        var celmain = Math.round(cel);
                        tempfunc(celmain)
      

                        var weather = data.weather[0].main;
                        
                        if(weather === "Clouds"){

                          iconfunc(weatherIcon[0]);
              
                        }else if(weather === "Rain" ){
                    
                          iconfunc(weatherIcon[1]);
                        }else if(cel <= 0){
                          iconfunc(weatherIcon[3]);
                        }else{
                          iconfunc(weatherIcon[0])
                        }

                        var seaa = data.main.sea_level;
                       
                    
                        seafunc(seaa)
                        descfunc(weather)

                        var myhum = data.main.humidity;
                        humfunc(myhum)
      

                        var mywind = data.wind.speed;
                        windfunc(mywind)
      
                        var myrain = data.clouds.all;
                        rainfunc(myrain)

      
                    })
                
              }}).catch(function(err) {
                 alert("Invalid place !!")
             })

    
  }

  return (

    <div>
      
        <Container style={{marginTop:"30px",borderRadius:"10px", height:"800px"}} className='cont'>
          
          <div className='d-flex p-4 col'>
            <div className='col-9'>
                 <TextField variant="standard" placeholder='Enter the city name' className='inp ' onChange={(e)=>cityfunc(e.target.value)}/>
            </div>
             
             <div className='col-3 d-flex justify-content-end'>
                <Button variant="contained" className='mybtn' onClick={clickrun}>Search</Button>   
             </div>
            
          </div>

           {/* ---------------temp display-------------------------- */}
          
           <h1 className=' p-4'>{cityname}</h1>
           <span className='placename p-4'>{date}</span>

           <div  className='d-flex p-4 justify-content-center'>

             <div className='m-4 pe-5 border-div'>

               <img src={icon} className='img'></img><br></br>
               <span className='desc' >{desc}</span>

             </div>

            <div className='ps-5'>
               <br></br>
               <p className='temp'>{temp} &deg; </p>
               {/* <p className='min'><span style={{color:"rgb(90, 90, 90)"}}> {tempmin} </span> |  <span style={{color:"rgb(90, 90, 90)"}}>{tempmax}</span></p> */}
              
               <span><img src="https://cdn3.iconfinder.com/data/icons/weather-thick-line/1000/2266-Below_Sea_Level-512.png" height={40} width={40} /></span><span className='pe-2'>{sea} hPa</span> 
            
            </div>

          </div>

          <div>
            <ListView humidity={hum} wind={myywind} cloud={rain}/>
          </div>

       
        </Container>
   
    </div>
  )
}
