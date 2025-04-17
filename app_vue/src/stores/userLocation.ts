import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UserLocation } from '@/types/types'

export const useUserLocationStore = defineStore('userLocation', () => {
    const initialCoordinates: UserLocation = reactive({
        lat: undefined,
        lng: undefined,
    })

    const currentCoordinates: UserLocation = reactive({
        lat: undefined,
        lng: undefined,
    })

    const setInitialCoordinates = (lat: number, lng: number) => {
        initialCoordinates.lat = lat
        initialCoordinates.lng = lng
    }

    const setCurrentCoordinates = (lat: number, lng: number) => {
        currentCoordinates.lat = lat
        currentCoordinates.lng = lng
    }

    return { initialCoordinates, currentCoordinates, setInitialCoordinates, setCurrentCoordinates }
})
