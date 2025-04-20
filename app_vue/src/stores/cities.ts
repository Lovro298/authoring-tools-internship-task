import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City } from '@/types/types'

//
export const useCitiesStore = defineStore('cities', () => {
    const randomCities = ref<City[]>([])

    const fetchRandomCities = async (randomCountries: string[]) => {
        try {
            const fetchedCities = randomCountries.map(async (country) => {
                const countriesRes = await fetch(`http://localhost:3001/cities?country=${country}`)
                const countriesData = await countriesRes.json()

                // get random city from fetched data (same country)
                const randomIndex = Math.floor(Math.random() * countriesData.length)
                const selectedCity = countriesData[randomIndex]

                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current=temperature_2m`)
                const weatherData = await weatherRes.json();

                return {
                    id: selectedCity.id,
                    country: selectedCity.country,
                    country_name: selectedCity.country_name,
                    name: selectedCity.name,
                    lat: selectedCity.lat,
                    lng: selectedCity.lng,
                    weather: weatherData.current.temperature_2m
                }
            })

            const cities = await Promise.all(fetchedCities)

            // set randomCities
            randomCities.value = cities
        } catch (error) {
            console.error('Error fetching city data', error)
        }
    }

    return {
        randomCities,
        fetchRandomCities,
    }
})
