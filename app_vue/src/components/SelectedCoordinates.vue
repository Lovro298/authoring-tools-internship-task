<script setup lang="ts">
import { defineProps } from 'vue'
import { useUserLocationStore } from '@/stores/userLocation'
import type { UserLocation } from '@/types/types'

defineProps<{
    currentLocation: UserLocation
}>()

const userLocationStore = useUserLocationStore()

const resetLocation = () => {
    userLocationStore.setCurrentCoordinates(
        userLocationStore.initialCoordinates.lat!,
        userLocationStore.initialCoordinates.lng!,
    )
}
</script>

<template>
    <section class="user-coords">
        <h3>Your coordinates</h3>
        <p>{{ currentLocation.lat }}</p>
        <p>{{ currentLocation.lng }}</p>

        <button @click="resetLocation">Reset location</button>
    </section>
</template>

<style scoped>
.user-coords {
    display: flex;
    width: full;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    margin-top: 2rem;
    width: full;
    margin-bottom: 2rem;
}

button {
    background-color: rgb(0, 106, 255);
    border: none;
    padding: 4px 16px;
    color: white;
    border-radius: 1rem;
    cursor: pointer;
}

button:hover {
    background-color: rgb(85, 156, 255);
}

p {
    font-weight: 200;
    margin-top: 0;
}
</style>
