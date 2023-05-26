import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCountries = async () => {
    try {
      let allCountries = await axios('https://countriesnow.space/api/v0.1/countries');
      setCountries(allCountries.data.data);
    } catch (error) {
      
    }
  }

  const getCities = (selectedCountry) => {
    setIsSubmitted(false);
    setCity(null);
    setSelectedCountry(selectedCountry);
    const allCities = countries.find((item)=>{
      return item.country===selectedCountry;
    })
    setCities(allCities.cities)
  }

  const submitHandle = () => {
    if (selectedCountry && city) {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="App">
      <div className='container'> 
        <h1>Select your homeTown</h1>
        {countries.length>0 && (<select onChange={(e)=>getCities(e.target.value)} value={selectedCountry}>
          <option disabled selected hidden>select your country</option>
          {countries.map((item)=>{
              return <option key={`${item.country}_${Math.random()}`}>{item.country}</option>
          })}
        </select>)}

        {cities.length>0 && (<select onChange={(e)=>setCity(e.target.value)} value={city}>
          <option disabled selected hidden>select your City</option>
          {cities.map((item)=>{
              return <option key={`${item}_${Math.random()}`}>{item}</option>
          })}
        </select>)}
          <button onClick={submitHandle}>Go</button>
        {/* </div> */}
        {isSubmitted && (
          <h3>
            Your country is {selectedCountry} and your city is {city}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;