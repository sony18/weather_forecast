const city__input=document.querySelector("#cityname");let city__display=document.querySelector("#city"),message__error=document.querySelector("#error-message");const data__row=document.querySelector("#current-row"),data__ul=document.querySelector("#current-ul"),form=document.querySelector("#form-id");let access_key="b47768f911ece4c18943aa8a7e04d87d",url="https://api.openweathermap.org/data/2.5/";const getLocation=()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(getPosition,showerr):message__error.innerHTML="Allow location service"},getPosition=e=>{const t={lat:e.coords.latitude,lon:e.coords.longitude};fetchGeoData_Current(t),fetchGeoData_FiveDays(t)};function showerr(e){switch(e.code){case e.PERMISSION_DENIED:message__error.innerHTML=" Pls. allow location to get <u>weather</u> from your exact location....or search by city name",fetch_City_Current_Weather(),fetchGeoData_FiveDays({city:"London"});break;case e.POSITION_UNAVAILABLE:message__error.innerHTML="Location information is unavailable.";break;case e.TIMEOUT:message__error.innerHTML="The request to get user location timed out.";break;case e.UNKNOWN_err:message__error.innerHTML="An unknown error occurred."}}const fetchGeoData_FiveDays=async e=>{console.log(e);let t=`${url}/forecast?lat=${e.lat}&lon=${e.lon}&units=metric&appid=${access_key}`;e.city&&(t=`${url}/forecast?q=${e.city},uk&units=metric&appid=${access_key}`);const a=await fetch(t),n=await a.json();getFiveDaysWeather(n)},getFiveDaysWeather=e=>{let t,a,n,r,i,o=new Date,s=0;(()=>{for(;s<=5;){switch(s){case 0:console.log(o.toDateString()),t=e.list.filter(e=>new Date(e.dt_txt).toDateString()===o.toDateString()?e:"");break;case 1:console.log(o.toDateString()),a=e.list.filter(e=>new Date(e.dt_txt).toDateString()===o.toDateString()?e:"");break;case 2:console.log(o.toDateString()),n=e.list.filter(e=>new Date(e.dt_txt).toDateString()===o.toDateString()?e:"");break;case 3:console.log(o.toDateString()),r=e.list.filter(e=>new Date(e.dt_txt).toDateString()===o.toDateString()?e:"");break;case 4:console.log(o.toDateString()),i=e.list.filter(e=>new Date(e.dt_txt).toDateString()===o.toDateString()?e:"");break;default:return}o.setDate(o.getDate()+1),s++}})();let c="";t.map(a=>{document.querySelector("#forecast__Day1").innerHTML=` ${new Date(t[0].dt_txt).toDateString()} (${e.city.name})`,c+=`<div className="col-sm">\n                                 <div class="card  text-blue" >\n                                      <small class="card-header">${new Date(a.dt_txt).toLocaleTimeString()}</small>\n                                      <img src="https://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png"  class="img-fluid" alt="icon">\n                                      <div class="card-footer">\n                                          <small class="card-text ">${a.main.temp}<sup>o</sup>C</small>                                                    \n                                      </div>\n                                  </div>\n                             </div>\n                             `,document.querySelector("#forecast__row1").innerHTML=c});let l="";a.map(t=>{document.querySelector("#forecast__Day2").innerHTML=`${new Date(a[0].dt_txt).toDateString()}(${e.city.name})`,l+=`<div className="col-sm">\n                                     <div class="card  text-blue" align-center>\n                                         <small class="card-header">${new Date(t.dt_txt).toLocaleTimeString()}</small>\n                                         <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png"  alt="icon">\n                                         <div class="card-footer">\n                                                 <small class="card-text ">${t.main.temp}<sup>o</sup>C</small>                                                    \n                                         </div>\n                                     </div>\n                                 </div> `,document.querySelector("#forecast__row2").innerHTML=l});let d="";n.map(t=>{document.querySelector("#forecast__Day3").innerHTML=`${new Date(n[0].dt_txt).toDateString()}(${e.city.name})`,d+=`<div className="col-sm">\n                                 <div class="card  text-blue" align-center>\n                                     <small class="card-header">${new Date(t.dt_txt).toLocaleTimeString()}</small>\n                                     <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png"  alt="icon">\n                                     <div class="card-footer">\n                                             <small class="card-text ">${t.main.temp}<sup>o</sup>C</small>                                                    \n                                     </div>\n                                 </div>\n                             </div> `,document.querySelector("#forecast__row3").innerHTML=d});let m="";r.map(t=>{document.querySelector("#forecast__Day4").innerHTML=`${new Date(r[0].dt_txt).toDateString()}(${e.city.name})`,m+=`<div className="col-sm">\n                               <div class="card  text-blue" align-center>\n                                   <small class="card-header">${new Date(t.dt_txt).toLocaleTimeString()}</small>\n                                   <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png"  alt="icon">\n                                   <div class="card-footer">\n                                           <small class="card-text ">${t.main.temp}<sup>o</sup>C</small>                                                    \n                                   </div>\n                               </div>\n                           </div> `,document.querySelector("#forecast__row4").innerHTML=m});let u="";i.map(t=>{document.querySelector("#forecast__Day5").innerHTML=`${new Date(i[0].dt_txt).toDateString()}(${e.city.name})`,u+=`<div className="col-sm">\n                             <div class="card  text-blue" align-center>\n                                 <small class="card-header">${new Date(t.dt_txt).toLocaleTimeString()}</small>\n                                 <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png"  alt="icon">\n                                 <div class="card-footer">\n                                         <small class="card-text ">${t.main.temp}<sup>o</sup>C</small>                                                    \n                                 </div>\n                             </div>\n                         </div> `,document.querySelector("#forecast__row5").innerHTML=u})},fetchGeoData_Current=async e=>{const t=await fetch(`${url}/weather?lat=${e.lat}&lon=${e.lon}&units=metric&appid=${access_key}`),a=await t.json(),{temp:n,feels_like:r,humidity:i}=a.main,{sunrise:o,sunset:s}=a.sys,{deg:c,speed:l}=a.wind,{description:d,icon:m}=a.weather[0],{name:u}=a;displayWeather(n,r,i,o,s,d,m,c,l,u)},fetch_City_Current_Weather=async(e="London")=>{const t=await fetch(`${url}weather?q=${e},uk&units=metric&appid=${access_key}`),a=await t.json(),{humidity:n,feels_like:r,temp:i}=a.main,{sunrise:o,sunset:s}=a.sys,{description:c,icon:l}=a.weather[0],{deg:d,speed:m}=a.wind,{name:u}=a;displayWeather(i,r,n,o,s,c,l,d,m,u)};function convert_From_UnixTimestamp(e){var t=new Date(1e3*e),a=t.getHours(),n="0000"+t.getMinutes(),r="0"+t.getSeconds();return`${a}:${n.substr(-2)}:${r.substr(-2)}`}const displayWeather=async(e,t,a,n,r,i,o,s,c,l)=>{console.log(n),city__display.innerHTML=l,data__row.innerHTML=`<div class="col-lg-4">\n                                <div className="card">\n                                    <h2 class="text-big">Today</h2> \n                                    <small> ${(new Date).toDateString()}</small>\n                                </div>\n                            </div>\n                            <div class="col-lg-8">\n                                <div classNam="card">\n                                    <img src="https://openweathermap.org/img/wn/${o}@2x.png" alt="icon" />\n                                    <div id="current-temp">${e} <sup>o</sup>C</div> <br/>\n                                    <small> Feels like :  ${t} <sup>o</sup>c ( ${i}.. )</small>\n                                </div>\n                            </div> \n                            `,data__ul.innerHTML=`  \n                          <li>humidity : ${a} %</li>\n                          <li>wind-direction : ${s} deg</li>\n                          <li>wind-speed : ${c} m/s</li>\n                          \n                          <marquee class="mt-3" behavior="scroll" direction="up" scrollamount="1">                                    \n                            <li>sun-rise : ${convert_From_UnixTimestamp(n)}</li>\n                            <li>sun-set : ${convert_From_UnixTimestamp(r)}</li>\n                          </marquee>\n                          `};document.addEventListener("DOMContentLoaded",getLocation),document.addEventListener("DOMContentLoaded",e=>{city__input.focus()}),form.addEventListener("submit",e=>{e.preventDefault(),console.log(city__input.value),fetch_City_Current_Weather(city__input.value),fetchGeoData_FiveDays({city:city__input.value})});