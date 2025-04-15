"use client"

import countries from "../functions/countries"
import { useState, useEffect } from "react"

interface city {
  id: string,
  country: string,
  country_name: string,
  name: string,
  altnames: string,
  lat: number,
  lng: number
}

const Page = () => {

  const [randomCities, setRandomCities] = useState<city[]>([]);

  useEffect(() => {

    const getData = async (randomCountries:string[]) => {
      try {
        let randomCitiesArray = [];

        for (const country of randomCountries) {
          const response = await fetch(`http://localhost:3001/cities?country=${country}`)
          const cities = await response.json(); 
          
          const randomIndex: number = Math.floor(Math.random() * cities?.length);
          const parsedCity: city = {
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

    const numberOfCountries: number = countries.length;
    const randomCountries: string[] = [];

    for(let i=0; i<25; i++) {
      const randomIndex = Math.floor(Math.random() * numberOfCountries);
      const randomCountry = countries[randomIndex];
      randomCountries.push(randomCountry)
    }

    getData(randomCountries)

  }, [])

  console.log(randomCities)

  return (
    <div>Page</div>
  )
}

export default Page