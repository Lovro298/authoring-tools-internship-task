<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCitiesStore } from '@/stores/cities'
import { useDistancesStore } from '@/stores/distances'
import { useUserLocationStore } from '@/stores/userLocation'

const citiesStore = useCitiesStore()
const distancesStore = useDistancesStore()
const userLocationStore = useUserLocationStore()

const temperatureValue = ref<number>(20);
const useFilter = ref<boolean>(false);

const changeLocation = (lat: number, lng: number) => {
    userLocationStore.setCurrentCoordinates(lat, lng)
    distancesStore.updateDistances(userLocationStore.currentCoordinates, citiesStore.randomCities)
}

const toggleUseFilter = () => {
    useFilter.value = !useFilter.value;
}

onMounted(() => {
    distancesStore.updateDistances(userLocationStore.currentCoordinates, citiesStore.randomCities)
})
</script>

<template>
    <section class="form-container">
        <form @submit.prevent="toggleUseFilter">
            <label for="temperature-slider">Select temperature: {{ temperatureValue }}°C</label>
            <input
                type="range"
                id="temperature-slider"
                min="-50"
                max="50"
                step="1"
                v-model="temperatureValue"
            />
            <button type="submit">{{ useFilter ? 'Disable filter' : 'Enable filter'}}</button>
        </form>
    </section>
    <section class="table-container">
        <div class="table-wrapper">
            <table class="city-table">
                <thead class="table-head">
                    <tr>
                        <th class="table-header">City name</th>
                        <th class="table-header hide-small">Country name</th>
                        <th class="table-header hide-small">Country code</th>
                        <th class="table-header hide-small">Coords</th>
                        <th class="table-header hide-small">Temperature</th>
                        <th class="table-header">Distance</th>
                        <th class="table-header hide-small">Distance AI</th>
                    </tr>
                </thead>

                <tbody class="table-body">
                    <tr
                        v-for="(city, index) in citiesStore.randomCities"
                        :key="index"
                        :class="`table-row ${distancesStore.myDistances[index] === 0 ? 'table-row-colored' : ''} ${useFilter ? city.weather >= temperatureValue ? '' : 'table-row-hidden' : ''}`"
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
                        <td class="table-cell hide-small">{{ city.weather }} °C</td>
                        <td class="table-cell">{{ distancesStore.myDistances[index] }} km</td>
                        <td class="table-cell hide-small">{{ distancesStore.aiDistances[index] }} km</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 4rem 0 4rem 0;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 25%;
}

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
    width: 14.3%;
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

.table-row-hidden {
    display: none;
}

@media only screen and (max-width: 780px) {
    .city-table {
        font-size: 10px;
    }

    .table-wrapper {
        width: 100%;
    }
}

@media only screen and (max-width: 540px) {
    .hide-small {
        display: none;
    }
}
</style>
