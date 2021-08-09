import React, { useState } from "react";

import Titles from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY="c65e81c29bb4f20098de26d87f125291";
function App() {
  
 const [state,setState] =useState({
    temperature: undefined,
    city:  undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error:undefined
  })
  const getWeather=async (e)=>{
    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    
    const data= await api_call.json();
   
    if(city&&country)
    {
      console.log(data);

       setState({
                 temperature: data.main.temp,
                 city: data.name,
                 country:data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error:""

       });
    }else{
      
      setState({
        temperature: undefined,
        city:  undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error:"Please enter the value"

});
    }
  }

  return (
    <div>
      <div className="wrapper">
         <div className="main">
             <div className="container">
                 <div className="row">
                     <div className="col-xs-5 title-container">
                       <Titles />
                     </div>
                     <div className="col-xs-7 form-container">
                     <Form getWeather={getWeather}/>
                       <Weather temperature={state.temperature}
                                city={state.city}
                                country={state.country}
                                humidity={state.humidity}
                                description={state.description}
                                error={state.error}/>
                     </div>
                </div>
             </div>
         </div>
      </div>
      
    </div>
  );
}


export default App;