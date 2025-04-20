<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useUserLocationStore } from '@/stores/userLocation'
    import { useCitiesStore } from '@/stores/cities'
    import countries from './functions/countries.ts'
    import SelectedCoordinates from './components/SelectedCoordinates.vue'
    import CityTable from '@/components/CityTable.vue'
    import CityMap from '@/components/CityMap.vue'

    // stores
    const locationStore = useUserLocationStore()
    const citiesStore = useCitiesStore()

    const loading = ref<boolean>(true) // loading variable (start loading)

    // if browser allows access to user's location
    const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords
        locationStore.setInitialCoordinates(latitude, longitude)
        locationStore.setCurrentCoordinates(latitude, longitude)
    }

    // if browser does not allow access to user's location
    const error = () => {
        alert('Sorry, no position available.')
    }

    // get user location when page loads and select 25 random countries
    onMounted(async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)

            const numberOfCountries: number = countries.length
            const randomCountries: string[] = []

            // select 25 random countries
            for (let i = 0; i < 25; i++) {
                const randomIndex = Math.floor(Math.random() * numberOfCountries)
                const randomCountry = countries[randomIndex]
                randomCountries.push(randomCountry)
            }

            // pass random countries array to city store
            citiesStore.fetchRandomCities(randomCountries).finally(() => {
                loading.value = false // stop loading
            })

        }
    })
</script>

<template>
    <div v-if="loading">Loading cities ...</div>
    <div v-else>
        <SelectedCoordinates :currentLocation="locationStore.currentCoordinates" />
        <CityTable />
        <CityMap />
    </div>
</template>
