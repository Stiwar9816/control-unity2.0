<template>
  <table class="custom-event-editor" width="100%" cellpadding="8">
    <tbody>
      <tr>
        <td class="e-textlabel">Responsable</td>
        <td colspan="4">
          <input
            id="Responsible"
            class="e-field e-input"
            type="text"
            name="Responsible"
            style="width: 100%"
          />
        </td>
      </tr>
      <tr>
        <td class="e-textlabel">Documento</td>
        <td colspan="4">
          <input
            id="Document"
            class="e-field e-input"
            type="text"
            value=""
            name="Document"
            style="width: 100%"
          />
        </td>
      </tr>
      <tr>
        <td class="e-textlabel">Teléfono</td>
        <td colspan="4">
          <input
            id="Phone"
            class="e-field e-input"
            type="text"
            value=""
            name="Phone"
            style="width: 100%"
          />
        </td>
      </tr>
      <tr>
        <td class="e-textlabel">Programa</td>
        <td colspan="4">
          <input
            id="Schedule"
            class="e-field e-input"
            type="text"
            name="Schedule"
            style="width: 100%"
          />
        </td>
      </tr>
      <tr>
        <td class="e-textlabel">Evento</td>
        <td colspan="4">
          <input
            id="Subject"
            class="e-field e-input"
            type="text"
            value=""
            name="Subject"
            style="width: 100%"
          />
        </td>
      </tr>

      <tr>
        <td class="e-textlabel">Salón</td>
        <td colspan="4">
          <input
            type="text"
            id="Location"
            name="Location"
            value=""
            class="e-field e-input"
            style="width: 100%"
          />
        </td>
      </tr>
      <tr>
        <td class="e-textlabel">Hora de inicio</td>
        <td colspan="4">
          <input id="StartTime" class="e-field" type="text" name="StartTime" />
        </td>
      </tr>
      <tr>
        <td class="e-textlabel">Hora de finalización</td>
        <td colspan="4"><input id="EndTime" class="e-field" type="text" name="EndTime" /></td>
      </tr>

      <tr>
        <td class="e-textlabel">Implementos</td>
        <td colspan="4">
          <input
            id="Implements"
            class="e-field e-input"
            type="text"
            name="Implements"
            style="width: 100%"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
