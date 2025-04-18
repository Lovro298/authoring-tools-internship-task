<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useCitiesStore } from '@/stores/cities'
import { useUserLocationStore } from '@/stores/userLocation'
import { useDistancesStore } from '@/stores/distances'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const cityStore = useCitiesStore()
const userLocationStore = useUserLocationStore()
const distancesStore = useDistancesStore()

const blueMarker = new L.Icon({
    iconUrl: '/marker.png',
    iconSize: [20, 24],
    iconAnchor: [10, 24],
    popupAnchor: [0, -32],
})

const redMarker = new L.Icon({
    iconUrl: '/yourLocationMarker.png',
    iconSize: [20, 24],
    iconAnchor: [10, 24],
    popupAnchor: [0, -32],
})

let cityMarkers: L.Marker[] = []
let currentLocationMarker: L.Marker
let map: L.Map

const updateMarkers = (map: L.Map) => {
    cityMarkers.forEach((marker) => map.removeLayer(marker))
    if (currentLocationMarker) {
        map.removeLayer(currentLocationMarker)
    }

    cityMarkers = []
    cityStore.randomCities.forEach((city, index) => {
        const marker = L.marker([city.lat, city.lng], { icon: blueMarker })
            .addTo(map)
            .bindPopup(`${city.name}, distance: ${distancesStore.myDistances[index]} km`)

        cityMarkers.push(marker)
    })

    currentLocationMarker = L.marker(
        [userLocationStore.currentCoordinates.lat!, userLocationStore?.currentCoordinates.lng!],
        { icon: redMarker },
    )
        .addTo(map)
        .bindPopup('Your selected location')
        .openPopup()
}

onMounted(() => {
    map = L.map('map').setView([0, 0], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    updateMarkers(map)
})

watch(
    () => [distancesStore.myDistances, userLocationStore.currentCoordinates],
    () => {
        if (map) updateMarkers(map)
    },
    { deep: true },
)
</script>

<template>
    <section class="map-section">
        <div class="map-wrapper">
            <div id="map"></div>
        </div>
    </section>
</template>

<style>
.map-section {
    width: full;
    display: flex;
    justify-content: center;
    height: 800px;
    margin-top: 4rem;
}

.map-wrapper {
    width: 92%;
    border-radius: 1rem;
    overflow: hidden;
}
#map {
    width: 100%;
    height: 800px;
}
</style>
