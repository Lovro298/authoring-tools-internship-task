"use client"

import { useState, useEffect } from "react"
import { City } from "@/types/City"
import { UserLocation } from "@/types/UserLocation"
import countries from "../functions/countries"
import Table from "@/components/Table"

const Page = () => {

  const [randomCities, setRandomCities] = useState<City[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>();
  
  const success = (position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  const error = () => {
    alert("Sorry, no position available.");
  }


  useEffect(() => {

    const getData = async (randomCountries:string[]) => {
      try {
        const randomCitiesArray = [];

        // Replace with Promise.all!!!
        for (const country of randomCountries) {
          const response = await fetch(`http://localhost:3001/cities?country=${country}`)
          const cities = await response.json(); 
          
          const randomIndex: number = Math.floor(Math.random() * cities?.length);
          const parsedCity: City = {
            id: cities[randomIndex]?.id,
            country: cities[randomIndex]?.country,
            country_name: cities[randomIndex]?.country_name,
            name: cities[randomIndex]?.name,
            altnames: cities[randomIndex]?.altnames,
            lat: parseFloat(cities[randomIndex]?.lat),
            lng: parseFloat(cities[randomIndex]?.lng),
          }
          randomCitiesArray.push(parsedCity);
        }

        setRandomCities(randomCitiesArray);
      } catch (error) {
        console.error(error);
      }
    }

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);

      const numberOfCountries: number = countries.length;
      const randomCountries: string[] = [];
  
      for(let i=0; i<25; i++) {
        const randomIndex = Math.floor(Math.random() * numberOfCountries);
        const randomCountry = countries[randomIndex];
        randomCountries.push(randomCountry)
      }
  
      getData(randomCountries)
    }

  }, [])

  return (
    <main>
      {
        randomCities.length === 25 && userLocation &&
        <Table
          randomCities={randomCities}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />
      }
    </main>
  )
}

export default Page