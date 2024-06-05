<template>
  <ejs-schedule
    height="auto"
    ref="ScheduleObj"
    cssClass="excel-export"
    currentView="Month"
    :eventSettings="appointmentData"
    :actionBegin="onActionBegin"
    :actionComplete="onActionComplete"
    :editorTemplate="'editorTemplate'"
    :popupOpen="onPopupOpen"
  >
    <template v-slot:editorTemplate>
      <EventEditor />
    </template>
  </ejs-schedule>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
// Syncfusion
import {
  ScheduleComponent as EjsSchedule,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ExcelExport,
  ScheduleComponent
} from '@syncfusion/ej2-vue-schedule'
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns'
import { DateTimePicker } from '@syncfusion/ej2-calendars'
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base'
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json'
import * as gregorian from 'cldr-data/main/es-CO/ca-gregorian.json'
import * as numbers from 'cldr-data/main/es-CO/numbers.json'
import * as timeZoneNames from 'cldr-data/main/es-CO/timeZoneNames.json'
// Utils
import { scheduleTranslations, recurrenceEditorTranslations } from '@/utils'
// Interfaces
import type {
  Appointment,
  BookingData,
  ClassroomsData,
  ExportData,
  ExportField,
  ExportItem,
  ImplementsData
} from '@/interface'
import type { ToolbarActionArgs, ActionEventArgs } from '@syncfusion/ej2-schedule'
// Store
import { useBookingsStore, useClassroomsStore, useImplementsStore } from '@/stores'
// Components
import EventEditor from '@/components/forms/EventEditor.vue'

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames)
setCulture('es-CO')
provide('schedule', [Day, Week, WorkWeek, Month, Agenda, ExcelExport])

L10n.load({
  'es-CO': {
    schedule: scheduleTranslations,
    recurrenceeditor: recurrenceEditorTranslations
  }
})

// Initialization Store
const booking = useBookingsStore()
const room = useClassroomsStore()
const implement = useImplementsStore()
const appointmentData = ref({
  timezone: 'America/Bogota',
  enableTooltip: true,
  spannedEventPlacement: 'TimeSlot',
  dataSource: [] as any
})

const bookingsToDataSource = (bookings: BookingData[]) => {
  return bookings.map((booking: BookingData) => ({
    Id: booking.id,
    Subject: booking.event,
    StartTime: new Date(booking.start_date),
    EndTime: new Date(booking.end_date),
    Location: booking.room_name,
    Schedule: booking.schedule,
    Responsible: booking.fullname,
    Implements: booking.implements_names,
    Document: booking.document,
    Phone: booking.phone
  }))
}

const ScheduleObj = ref<ScheduleComponent | null>(null)

const setupDropDownList = (element: HTMLElement | null, dataSource: any[], name: string): void => {
  if (element && !element.classList.contains('e-dropdownlist')) {
    let dropDownListObject = new DropDownList({
      value: element.text,
      dataSource,
      fields: { text: 'text', value: 'value' }
    })
    dropDownListObject.appendTo(element)
    element.setAttribute('name', name)
  }
}

const setupMultiSelect = (
  element: HTMLElement | null,
  dataSource: any[],
  currentValueText: string
): void => {
  if (element && !element.classList.contains('e-multiselect')) {
    const currentValue = currentValueText
      ? currentValueText
          .split(',')
          .map((text: string) => {
            const item = dataSource.find((data: any) => data.text.trim() === text.trim())
            return item ? item.value : null
          })
          .filter((value) => value !== null)
      : []

    let multiSelectObject = new MultiSelect({
      value: currentValue,
      dataSource,
      fields: { text: 'text', value: 'value' },
      mode: 'Box'
    })
    multiSelectObject.appendTo(element)
    element.setAttribute('name', 'Implements')
  }
}

const setupDateTimePicker = (element: HTMLElement | null, value: string) => {
  if (!element.classList.contains('e-datetimepicker')) {
    new DateTimePicker({ value: new Date(value) }, element)
  }
}

const setupEditorPopup = async (args: any) => {
  const locationsData = await room.allRooms()
  const implementsData = await implement.allImplements()

  const mappedLocationsData = locationsData.map((location: ClassroomsData) => ({
    text: location.nomenclature,
    value: location.id!
  }))

  const mappedImplementsData = implementsData.map((implement: ImplementsData) => ({
    text: implement.name,
    value: implement.id!
  }))

  setupDropDownList(
    args.element.querySelector('#Location'),
    mappedLocationsData,
    args.data.Location
  )
  setupMultiSelect(
    args.element.querySelector('#Implements'),
    mappedImplementsData,
    args.data.Implements
  )
  setupDateTimePicker(args.element.querySelector('#StartTime'), args.data.StartTime)
  setupDateTimePicker(args.element.querySelector('#EndTime'), args.data.EndTime)
}

const onPopupOpen = async (args: any) => {
  if (args.type === 'Editor') await setupEditorPopup(args)
}

const onActionBegin = (args: ActionEventArgs & ToolbarActionArgs) => {
  if (args.requestType === 'toolbarItemRendering') {
    let exportItem: ExportItem = {
      align: 'Right',
      showTextOn: 'Both',
      prefixIcon: 'e-icon-schedule-excel-export',
      text: 'Exportar Excel',
      cssClass: 'e-excel-export',
      click: onExportClick
    }
    args.items?.push(exportItem)
  }
}

const onExportClick = () => {
  if (ScheduleObj.value) {
    const exportFields: ExportField[] = [
      { name: 'Responsible', text: 'Responsable' },
      { name: 'Document', text: 'Documento' },
      { name: 'Phone', text: 'Teléfono' },
      { name: 'Subject', text: 'Evento' },
      { name: 'StartTime', text: 'Hora de inicio' },
      { name: 'EndTime', text: 'Hora de finalización' },
      { name: 'Location', text: 'Salón' },
      { name: 'Schedule', text: 'Programa' },
      { name: 'Implements', text: 'Implementos' }
    ]

    const exportData = appointmentData.value.dataSource.map((item: Appointment) => {
      return exportFields.reduce((acc: ExportData, field: ExportField) => {
        acc[field.text] = item[field.name]
        return acc
      }, {} as ExportData)
    })

    ScheduleObj.value.exportToExcel({
      customData: exportData,
      fields: exportFields.map((field: ExportField) => field.text),
      fileName: 'Reservas'
    })
  }
}

const formatImplements = (implement: string | string[]) => {
  return typeof implement === 'string' ? implement : implement.join(',')
}

const createBooking = async (newEvent: any) => {
  try {
    const bookingData: BookingData = {
      fullname: newEvent.Responsible,
      document: newEvent.Document,
      phone: newEvent.Phone,
      schedule: newEvent.Schedule,
      event: newEvent.Subject,
      room: newEvent.Location,
      start_date: newEvent.StartTime,
      end_date: newEvent.EndTime,
      implements: formatImplements(newEvent.Implements)
    }

    await booking.createBooking(bookingData)

    // Reload data from the server after adding a new event
    const bookings = await booking.getBooking()
    appointmentData.value.dataSource = bookingsToDataSource(bookings)
  } catch (error: any) {
    throw new Error(`¡Error al crear la reserva: ${error.message}!`)
  }
}

const removeBooking = async (removedEvent: any) => {
  try {
    await booking.deleteBooking(removedEvent.Id)
    // Reload data from the server after deleting the event
    const bookings = await booking.getBooking()
    appointmentData.value.dataSource = bookingsToDataSource(bookings)
  } catch (error: any) {
    throw new Error(`¡Error al eliminar la reserva: ${error.message}!`)
  }
}

const updateBooking = async (updatedEvent: any) => {
  try {
    const bookingData: BookingData = {
      id: updatedEvent.Id,
      fullname: updatedEvent.Responsible,
      document: updatedEvent.Document,
      phone: updatedEvent.Phone,
      schedule: updatedEvent.Schedule,
      event: updatedEvent.Subject,
      room: updatedEvent.Location,
      start_date: updatedEvent.StartTime,
      end_date: updatedEvent.EndTime,
      implements: formatImplements(updatedEvent.Implements)
    }
    await booking.updateBooking(bookingData, bookingData.id!)
    // Reload data from the server after updating the event
    const bookings = await booking.getBooking()
    appointmentData.value.dataSource = bookingsToDataSource(bookings)
  } catch (error: any) {
    throw new Error(`¡Error al actualizar la reserva: ${error.message}!`)
  }
}

const onActionComplete = async (args: any) => {
  const { requestType, data } = args
  if (requestType === 'eventCreated') {
    await createBooking(data[0])
  } else if (requestType === 'eventRemoved') {
    await removeBooking(data[0])
  } else if (requestType === 'eventChanged') {
    await updateBooking(data[0])
  }
}

onMounted(async () => {
  try {
    const bookings = await booking.getBooking()
    appointmentData.value = {
      timezone: 'America/Bogota',
      spannedEventPlacement: 'TimeSlot',
      enableTooltip: true,
      dataSource: bookingsToDataSource(bookings)
    }
  } catch (error: any) {
    throw new Error(`¡Error al obtener las reservas: ${error.message}!`)
  }
})
</script>

<style lang="css">
@import '@/assets/styles/material.min.css';

.excel-export.e-schedule .e-schedule-toolbar .e-icon-schedule-excel-export::before {
  content: '\e242';
  color: rgb(0, 187, 72);
  font-size: 16px;
}
</style>
