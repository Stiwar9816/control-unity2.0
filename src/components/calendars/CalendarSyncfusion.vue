<template>
  <ejs-schedule height="500px" currentView="Month" :eventSettings="appointmentData" />
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import {
  ScheduleComponent as EjsSchedule,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda
} from '@syncfusion/ej2-vue-schedule'
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base'
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json'
import * as gregorian from 'cldr-data/main/es-CO/ca-gregorian.json'
import * as numbers from 'cldr-data/main/es-CO/numbers.json'
import * as timeZoneNames from 'cldr-data/main/es-CO/timeZoneNames.json'
// Store
import { useBookingsStore } from '@/stores'

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames)
setCulture('es-CO')
provide('schedule', [Day, Week, WorkWeek, Month, Agenda])
L10n.load({
  'es-CO': {
    schedule: {
      saveButton: 'Confirmar',
      cancelButton: 'Cerrar',
      deleteButton: 'Eliminar',
      newEvent: 'Nuevo evento'
    }
  }
})

// Initialization Store
const booking = useBookingsStore()

const appointmentData = ref({
  timezone: 'America/Bogota',
  enableTooltip: true,
  dataSource: [] as any
})

onMounted(async () => {
  try {
    const bookings = await booking.getBooking()
    appointmentData.value = {
      timezone: 'America/Bogota',
      enableTooltip: true,
      dataSource: bookings.map((booking) => ({
        Id: booking.id,
        Subject: booking.event,
        StartTime: booking.start_date,
        EndTime: booking.end_date,
        Location: booking.room,
        Description: `Responsable: ${booking.fullname}`
      }))
    }
  } catch (error: any) {
    throw new Error(`¡Error al obtener reservas: ${error.message}!`)
  }
})
</script>

<style lang="css">
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-buttons/styles/material.css';
@import '@syncfusion/ej2-calendars/styles/material.css';
@import '@syncfusion/ej2-dropdowns/styles/material.css';
@import '@syncfusion/ej2-inputs/styles/material.css';
@import '@syncfusion/ej2-navigations/styles/material.css';
@import '@syncfusion/ej2-popups/styles/material.css';
@import '@syncfusion/ej2-vue-schedule/styles/material.css';

.e-schedule .e-month-view .e-appointment {
  background: #379295 !important;
}

.e-bigger .e-more-popup-wrapper .e-appointment,
.e-more-popup-wrapper .e-appointment {
  background: #379295 !important;
}

.e-bigger .e-more-popup-wrapper .e-more-event-date-header .e-current-date,
.e-more-popup-wrapper .e-more-event-date-header .e-current-date {
  color: #4a7378 !important;
}

.e-schedule .e-month-view .e-date-header-wrap table td.e-current-day,
.e-schedule .e-month-agenda-view .e-date-header-wrap table td.e-current-day {
  color: #255d60 !important;
}

.e-schedule .e-schedule-toolbar .e-active-view .e-tbar-btn-text,
.e-schedule .e-schedule-toolbar .e-active-view .e-icons {
  color: #255d60 !important;
}

.e-current-date .e-date-header {
  background: #4a7378 !important;
}
</style>
