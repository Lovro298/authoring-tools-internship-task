import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLocation } from '@/types/types'
import type { City } from '@/types/types'
import myHaversineDistance from '@/functions/haversineDistance'
import AIHaversineDistance from '@/functions/haversineDistanceAI'

export const useDistancesStore = defineStore('distances', () => {
    const myDistances = ref<number[]>([])
    const aiDistances = ref<number[]>([])

    const updateDistances = (userCoordinates: UserLocation, cities: City[]) => {
        const myDistancesArray: number[] = []
        const aiDistancesArray: number[] = []

        for (const city of cities) {
            const lat1 = userCoordinates.lat
            const lng1 = userCoordinates.lng
            const lat2 = city.lat
            const lng2 = city.lng
            const myDistance = myHaversineDistance(lat1!, lat2!, lng1!, lng2!)
            const AIDistance = AIHaversineDistance(lat1!, lng1!, lat2!, lng2!)

            myDistancesArray.push(myDistance)
            aiDistancesArray.push(AIDistance)
        }

        myDistances.value = myDistancesArray
        aiDistances.value = aiDistancesArray
    }

    return { myDistances, aiDistances, updateDistances }
})
