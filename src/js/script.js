// DOM VAR 
const city__input = document.querySelector('#cityname')
let city__display = document.querySelector('#city')
let message__error = document.querySelector('#error-message')
const data__row = document.querySelector('#current-row')
const data__ul = document.querySelector('#current-ul')
const form = document.querySelector('#form-id')

let access_key = 'b47768f911ece4c18943aa8a7e04d87d';
// end point
let url = 'https://api.openweathermap.org/data/2.5/'

//GeoLocation 
const getLocation =()=>{
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(getPosition,showerr)
    }else{
        message__error.innerHTML = 'Allow location service'
    }
}
// Get LOCAITON PASSED.. to fetch API
const getPosition =  (position)=>{
    const location= ({lat:position.coords.latitude,lon:position.coords.longitude})
    fetchGeoData_Current(location)
    fetchGeoData_FiveDays(location)
}
function showerr(err) {
    switch(err.code) {
      case err.PERMISSION_DENIED:
        message__error.innerHTML = " Pls. allow location to get <u>weather</u> from your exact location....or search by city name"
        fetch_City_Current_Weather()
        fetchGeoData_FiveDays({city:'London'})
        break;
      case err.POSITION_UNAVAILABLE:
        message__error.innerHTML = "Location information is unavailable."
        break;
      case err.TIMEOUT:
        message__error.innerHTML = "The request to get user location timed out."
        break;
      case err.UNKNOWN_err:
        message__error.innerHTML = "An unknown error occurred."
        break;
    }
  }
 /*======================================================================================
   API CALL: Geolocation forecast 5...DAYS weather
   props: can be CITY OR GEOLocation
=========================================================================================*/ 
const fetchGeoData_FiveDays = async (props)=>{
    console.log(props)
    let updateUrl = `${url}/forecast?lat=${props.lat}&lon=${props.lon}&units=metric&appid=${access_key}`
    if(props.city){
        updateUrl = `${url}/forecast?q=${props.city},uk&units=metric&appid=${access_key}`
    }
    const req = await fetch(updateUrl)
    const data_forecast = await req.json()
    // console.log(data_forecast)

  getFiveDaysWeather(data_forecast)
}


/*===================================================================
    DESTRUCTURING:  create 5...DAYS variable holding every 3hrs data each day in[]
    DISPLAY: loop... through each day data and display...
==================================================================*/
const getFiveDaysWeather = (fivedayData)=>{  

        let dayOne;
        let dayTwo;
        let dayThree;
        let dayFour;
        let dayFive;  
        let nextCurrentDate = new Date()  //current Date
        let count = 0; 
        
        // Self invoked func
        const selfCall = (()=>{
            //increment count and nextCurrentDate
            while( count <= 5 ){ 

                switch(count){
                        case 0:
                            console.log(nextCurrentDate.toDateString());
                            dayOne=( fivedayData.list.filter(data=>((new Date(data.dt_txt).toDateString()=== nextCurrentDate.toDateString())?data:'')))
                            break;
                        case 1:
                            console.log(nextCurrentDate.toDateString());
                            dayTwo=( fivedayData.list.filter(data=>((new Date(data.dt_txt).toDateString()=== nextCurrentDate.toDateString())?data:'')))
                            break;
                        case 2:
                            console.log(nextCurrentDate.toDateString());
                            dayThree=( fivedayData.list.filter(data=>((new Date(data.dt_txt).toDateString()=== nextCurrentDate.toDateString())?data:'')))
                            break;
                        case 3:
                            console.log(nextCurrentDate.toDateString());
                            dayFour=( fivedayData.list.filter(data=>((new Date(data.dt_txt).toDateString()=== nextCurrentDate.toDateString())?data:'')))
                            break;
                        case 4:
                            console.log(nextCurrentDate.toDateString());
                            dayFive=( fivedayData.list.filter(data=>((new Date(data.dt_txt).toDateString()=== nextCurrentDate.toDateString())?data:'')))
                            break;
                        default:
                            return ;
                        }

                   nextCurrentDate.setDate(nextCurrentDate.getDate()+1) //to filter data based on current date(next five days..)
                   count++; //for while condition
                }   
            })() 

    //DISPLAY 5DAYS FORECAST.............................       
        let cols='';
        dayOne.map(item=>{
                    document.querySelector('#forecast__Day1').innerHTML = ` ${new Date(dayOne[0].dt_txt).toDateString()} (${fivedayData.city.name})`
                    cols += 
                            `<div className="col-sm">
                                 <div class="card  text-blue" style="width: 7rem;">
                                      <small class="card-header">${new Date(item.dt_txt).toLocaleTimeString()}</small>
                                      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"  class="img-fluid" alt="icon">
                                      <div class="card-footer">
                                          <small class="card-text ">${item.main.temp}<sup>o</sup>C</small>                                                    
                                      </div>
                                  </div>
                             </div>
                             `                                        
                    document.querySelector('#forecast__row1').innerHTML = cols
        })
        let cols2='';
        dayTwo.map(item=>{
                        document.querySelector('#forecast__Day2').innerHTML = `${new Date(dayTwo[0].dt_txt).toDateString()}(${fivedayData.city.name})`
                        cols2 +=          
                                `<div className="col-sm">
                                     <div class="card  text-blue" style="width: 7rem;">
                                         <small class="card-header">${new Date(item.dt_txt).toLocaleTimeString()}</small>
                                         <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"  alt="icon">
                                         <div class="card-footer">
                                                 <small class="card-text ">${item.main.temp}<sup>o</sup>C</small>                                                    
                                         </div>
                                     </div>
                                 </div> `
                        document.querySelector('#forecast__row2').innerHTML = cols2

        })

        let cols3 = '';
        dayThree.map(item=>{
                    document.querySelector('#forecast__Day3').innerHTML =   `${new Date(dayThree[0].dt_txt).toDateString()}(${fivedayData.city.name})`
                    cols3 +=          
                             `<div className="col-sm">
                                 <div class="card  text-blue" style="width: 7rem;">
                                     <small class="card-header">${new Date(item.dt_txt).toLocaleTimeString()}</small>
                                     <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"  alt="icon">
                                     <div class="card-footer">
                                             <small class="card-text ">${item.main.temp}<sup>o</sup>C</small>                                                    
                                     </div>
                                 </div>
                             </div> `
                    document.querySelector('#forecast__row3').innerHTML = cols3          
        }) 

        let cols4 ='';
        dayFour.map(item=>{
                   document.querySelector('#forecast__Day4').innerHTML = `${new Date(dayFour[0].dt_txt).toDateString()}(${fivedayData.city.name})`
                   cols4 +=          
                           `<div className="col-sm">
                               <div class="card  text-blue" style="width: 7rem;">
                                   <small class="card-header">${new Date(item.dt_txt).toLocaleTimeString()}</small>
                                   <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"  alt="icon">
                                   <div class="card-footer">
                                           <small class="card-text ">${item.main.temp}<sup>o</sup>C</small>                                                    
                                   </div>
                               </div>
                           </div> `
                   document.querySelector('#forecast__row4').innerHTML = cols4       
        })

        let cols5 = '';
        dayFive.map(item=>{
                 document.querySelector('#forecast__Day5').innerHTML = `${new Date(dayFive[0].dt_txt).toDateString()}(${fivedayData.city.name})`
                 cols5 +=          
                         `<div className="col-sm">
                             <div class="card  text-blue" style="width: 7rem;">
                                 <small class="card-header">${new Date(item.dt_txt).toLocaleTimeString()}</small>
                                 <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"  alt="icon">
                                 <div class="card-footer">
                                         <small class="card-text ">${item.main.temp}<sup>o</sup>C</small>                                                    
                                 </div>
                             </div>
                         </div> `
                 document.querySelector('#forecast__row5').innerHTML = cols5     
   
        })           
    }

/*===================================================================
    // API call: Geolocation Current weather
==================================================================*/
const fetchGeoData_Current = async(location)=>{  
const req = await fetch(`${url}/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${access_key}`)
const data = await req.json();

const{temp,feels_like,humidity}= data.main
const{sunrise,sunset}=data.sys
const{deg,speed}= data.wind
const{description,icon}= data.weather[0]
const {name} = data
displayWeather(temp,feels_like,humidity,sunrise,sunset,description,icon,deg,speed,name)
}
/*===================================================================
 // API call:  City Current weather
==================================================================*/
     const fetch_City_Current_Weather = async (city='London')=>{
        const reqs = await fetch(`${url}weather?q=${city},uk&units=metric&appid=${access_key}`)
        const cityweather = await reqs.json()

        const {humidity,feels_like,temp} = cityweather.main
        const {sunrise,sunset} = cityweather.sys
        const {description,icon} = cityweather.weather[0]
        const{deg,speed} = cityweather.wind
        const {name} = cityweather
        displayWeather(temp,feels_like,humidity,sunrise,sunset,description,icon,deg,speed,name)        
    }


    function convert_From_UnixTimestamp(unix_timestamp){

        //  pass timestamp(in milliseconds by x1000)in js Date object
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0000" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
        
        return formattedTime
            }
        
/*=====================================================================================================
    DOM .......DISPLAY......... 
=====================================================================================================*/
const displayWeather  = async(temp,feels_like,humidity,sunrise,sunset,description,icon,deg,speed,name)=>{
    console.log(sunrise)
   
    city__display.innerHTML = name
    data__row.innerHTML = `<div class="col-lg-4">
                                <div className="card">
                                    <h2 class="text-big">Today</h2> 
                                    <small> ${new Date().toDateString()}</small>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div classNam="card">
                                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" />
                                    <div id="current-temp">${temp} <sup>o</sup>C</div> <br/>
                                    <small> Feels like :  ${feels_like} <sup>o</sup>c ( ${description}.. )</small>
                                </div>
                            </div> 
                            `
    data__ul.innerHTML = `  
                          <li>humidity : ${humidity} %</li>
                          <li>wind-direction : ${deg} deg</li>
                          <li>wind-speed : ${speed} m/s</li>
                          
                          <marquee class="mt-3" behavior="scroll" direction="up" scrollamount="1">                                    
                            <li>sun-rise : ${convert_From_UnixTimestamp(sunrise)}</li>
                            <li>sun-set : ${convert_From_UnixTimestamp(sunset)}</li>
                          </marquee>
                          `    
                        }

// const display_FiveDays = ()=>{

// }



/*=====================================================================================================
    EVENT HANDLER
=====================================================================================================*/
document.addEventListener('DOMContentLoaded',getLocation)
document.addEventListener('DOMContentLoaded',e=>{city__input.focus()})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(city__input.value)
    fetch_City_Current_Weather(city__input.value)
    fetchGeoData_FiveDays({city:city__input.value})
})
