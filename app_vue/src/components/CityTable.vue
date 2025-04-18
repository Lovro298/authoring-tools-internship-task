<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useCitiesStore } from '@/stores/cities'
import { useDistancesStore } from '@/stores/distances'
import { useUserLocationStore } from '@/stores/userLocation'
import type { UserLocation } from '@/types/types'
import type { City } from '@/types/types'

const citiesStore = useCitiesStore()
const distancesStore = useDistancesStore()
const userLocationStore = useUserLocationStore()

const randomCities: City[] = citiesStore.randomCities
let currentCoordinates: UserLocation = userLocationStore.currentCoordinates

const myDistances = ref<number[]>(distancesStore.myDistances)
const aiDistances = ref<number[]>(distancesStore.aiDistances)

const changeLocation = (lat: number, lng: number) => {
    userLocationStore.setCurrentCoordinates(lat, lng)
    distancesStore.updateDistances(userLocationStore.currentCoordinates, randomCities)
}

watch(
    () => [
        distancesStore.myDistances,
        distancesStore.aiDistances,
        userLocationStore.currentCoordinates,
    ],
    () => {
        myDistances.value = distancesStore.myDistances
        aiDistances.value = distancesStore.aiDistances
    },
)

onMounted(() => {
    distancesStore.updateDistances(currentCoordinates, randomCities)
    myDistances.value = distancesStore.myDistances
    aiDistances.value = distancesStore.aiDistances
})
</script>

<template>
    <section class="table-container">
        <div class="table-wrapper">
            <table class="city-table">
                <thead class="table-head">
                    <tr>
                        <th class="table-header">City name</th>
                        <th class="table-header hide-small">Country name</th>
                        <th class="table-header hide-small">Country code</th>
                        <th class="table-header hide-small">Coords</th>
                        <th class="table-header hide-small">Distance</th>
                        <th class="table-header hide-small">Distance AI</th>
                    </tr>
                </thead>

                <tbody class="table-body">
                    <tr
                        v-for="(city, index) in randomCities"
                        :key="index"
                        :class="`table-row ${city.lat === currentCoordinates.lat && city.lng === currentCoordinates.lng ? 'table-row-colored' : ''}`"
                    >
                        <td class="table-cell city" @click="changeLocation(city.lat, city.lng)">
                            {{ city.name }}
                        </td>
                        <td class="table-cell hide-small">{{ city.country_name }}</td>
                        <td class="table-cell hide-small">{{ city.country }}</td>
                        <td class="table-cell hide-small">
                            <p>{{ city.lat }}</p>
                            <p>{{ city.lng }}</p>
                        </td>
                        <td class="table-cell">{{ myDistances[index] }} km</td>
                        <td class="table-cell">{{ aiDistances[index] }} km</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
.table-container {
    width: full;
    display: flex;
    justify-content: center;
}
.table-wrapper {
    width: 92%;
    border-radius: 1rem;
    overflow: hidden;
    overflow-y: scroll;
    border: 1px solid black;
    height: 600px;
}
.city-table {
    width: 100%;
    border-collapse: collapse;
    height: 600px;
}

.table-head {
    background: red;
}

.table-header {
    background-color: lightgray;
    padding: 1rem;
}

.table-body {
    background-color: #fcfcfc;
}

.table-row {
    border-bottom: 1px solid lightgray;
}

.table-cell {
    width: 16.67%;
    text-align: center;
}

.city {
    cursor: pointer;
}
.city:hover {
    background-color: rgb(0, 106, 255);
    color: white;
}

.table-row-colored {
    background-color: rgb(233, 233, 233);
}
</style>
