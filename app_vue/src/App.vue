<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserLocationStore } from '@/stores/userLocation'
import { useCitiesStore } from '@/stores/cities'
import countries from '@/functions/countries.js'
import CityTable from '@/components/CityTable.vue'

const locationStore = useUserLocationStore()
const citiesStore = useCitiesStore()
const loading = ref(true)

const success = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    locationStore.setInitialCoordinates(latitude, longitude)
    locationStore.setCurrentCoordinates(latitude, longitude)
}

const error = () => {
    alert('Sorry, no position available.')
}

// get user location
onMounted(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)

        const numberOfCountries: number = countries.length
        const randomCountries: string[] = []

        for (let i = 0; i < 25; i++) {
            const randomIndex = Math.floor(Math.random() * numberOfCountries)
            const randomCountry = countries[randomIndex]
            randomCountries.push(randomCountry)
        }

        citiesStore.fetchRandomCities(randomCountries).finally(() => {
            loading.value = false
        })
    }
})
</script>

<template>
    <section id="user_coords">
        <h3>Your coordinates</h3>
        <p>{{ locationStore.currentCoordinates.lat }}</p>
        <p>{{ locationStore.currentCoordinates.lng }}</p>
    </section>
    <div v-if="loading">Loading cities ...</div>
    <CityTable v-else />
</template>

<style scoped>
#user_coords {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    margin-top: 2rem;
    width: full;
}

p {
    font-weight: 200;
    margin-top: 0;
}
</style>
