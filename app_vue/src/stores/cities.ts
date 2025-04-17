import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City } from '@/types/types'

//
export const useCitiesStore = defineStore('cities', () => {
    const randomCities = ref<City[]>([])

    const fetchRandomCities = async (randomCountries: string[]) => {
        try {
            const fetchedCities = randomCountries.map(async (country) => {
                const res = await fetch(`http://localhost:3001/cities?country=${country}`)
                const data = await res.json()

                // get random city from fetched data (same country)
                const randomIndex = Math.floor(Math.random() * data.length)
                const selectedCity = data[randomIndex]

                return {
                    id: selectedCity.id,
                    country: selectedCity.country,
                    country_name: selectedCity.country_name,
                    name: selectedCity.name,
                    lat: selectedCity.lat,
                    lng: selectedCity.lng,
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
