import type { DisplayMode, ItemAlign } from '@syncfusion/ej2-navigations'

export interface Appointment {
  Document: number
  EndTime: Date
  Id: number
  Implements: string
  Location: string
  Phone: number
  Responsible: string
  Schedule: string
  StartTime: Date
  Subject: string
}

export interface ExportField {
  name: keyof Appointment
  text: string
}

// Define el tipo para el objeto de exportación
export type ExportData = Record<string, any>

export interface ExportItem {
  align: ItemAlign
  showTextOn: DisplayMode | undefined
  prefixIcon: string
  text: string
  cssClass: string
  click: () => void
}
