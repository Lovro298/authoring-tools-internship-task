import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLocation } from '@/types/types'

export const useUserLocationStore = defineStore('userLocation', () => {
    const initialCoordinates = ref<UserLocation>({
        lat: undefined,
        lng: undefined,
    })

    const currentCoordinates = ref<UserLocation>({
        lat: undefined,
        lng: undefined,
    })

    const setInitialCoordinates = (lat: number, lng: number) => {
        initialCoordinates.value = { lat, lng }
    }

    const setCurrentCoordinates = (lat: number, lng: number) => {
        currentCoordinates.value = { lat, lng }
    }

    return { initialCoordinates, currentCoordinates, setInitialCoordinates, setCurrentCoordinates }
})
