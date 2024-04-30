<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet>
          <v-calendar
            ref="calendar"
            color="warning"
            v-model="selectedDate"
            :events="events"
            @change="fetchEvents"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const selectedDate = null
let events: any = []
const fetchEvents = () => {
  events = [
    {
      name: 'Clase de 8am a 12pm',
      start: '2024-02-6T08:00:00',
      end: '2024-02-6T12:00:00',
      color: 'blue'
    }
  ]
}
</script>
