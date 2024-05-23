<template>
  <ejs-schedule height="550px" currentView="Month" :eventSettings="appointmentData" />
</template>

<script>
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

var remoteData = new DataManager({
  url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
})

export default {
  name: 'App',
  components: {
    'ejs-schedule': ScheduleComponent
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  },
  data() {
    return {
      appointmentData: {
        timezone: 'America/Bogota',
        enableTooltip: true,
        dataSource: remoteData
      }
    }
  }
}
</script>

<style lang="css">
@import '@syncfusion/ej2-base/styles/tailwind.css';
@import '@syncfusion/ej2-buttons/styles/tailwind.css';
@import '@syncfusion/ej2-calendars/styles/tailwind.css';
@import '@syncfusion/ej2-dropdowns/styles/tailwind.css';
@import '@syncfusion/ej2-inputs/styles/tailwind.css';
@import '@syncfusion/ej2-navigations/styles/tailwind.css';
@import '@syncfusion/ej2-popups/styles/tailwind.css';
@import '@syncfusion/ej2-vue-schedule/styles/tailwind.css';

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
