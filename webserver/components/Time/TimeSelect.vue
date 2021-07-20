<template>
  <div>
    <div class="caption">{{ label }}</div>
    <v-input hide-details class="time-select">
      <v-icon>mdi-clock-outline</v-icon>
      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn outlined class="time-hours" v-on="on">
            <span>{{ value ? hour : 'H' }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-for="hr in 12" :key="hr" @click="hour = `${hr}`"
            >{{ hr }}
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="px-1">:</div>
      <v-menu offset-y max-height="80vh">
        <template #activator="{ on }">
          <v-btn outlined class="time-minutes" v-on="on">
            <span>{{ value ? minute : 'M' }}</span>
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="min in 60"
            :key="min - 1"
            @click="minute = `${min - 1}`.padStart(2, '0')"
            >{{ `${min - 1}`.padStart(2, '0') }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn-toggle v-model="amPm" class="toggle-am-pm pl-1">
        <v-btn value="AM" class="btn-am">AM</v-btn>
        <v-btn value="PM" class="btn-pm">PM</v-btn>
      </v-btn-toggle>
    </v-input>
  </div>
</template>

<script>
export default {
  name: 'TimeSelect',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Time',
    },
  },
  computed: {
    hour: {
      get() {
        if (!this.$props.value) return '12'
        return this.$props.value.split(':')[0]
      },
      set(value) {
        if (value) {
          this.$emit('input', `${value}:${this.minute} ${this.amPm}`)
        }
      },
    },
    minute: {
      get() {
        if (!this.$props.value) return '00'
        return this.$props.value.split(':')[1].replace(/\D+/g, '')
      },
      set(value) {
        if (value) {
          this.$emit('input', `${this.hour}:${value} ${this.amPm}`)
        }
      },
    },
    amPm: {
      get() {
        if (!this.$props.value) return 'PM'
        return this.$props.value.replace(/[^APM]/g, '')
      },
      set(value) {
        if (value) {
          this.$emit('input', `${this.hour}:${this.minute} ${value}`)
        }
      },
    },
  },
}
</script>

<style>
.time-select {
  padding-top: 0px;
  margin-top: 0px;
}
.time-select label {
  margin-top: -50px;
  margin-right: -28px;
}
.time-hours,
.time-minutes {
  width: 50px;
  min-width: 50px !important;
  height: 32px !important;
}
.time-hours i.v-icon,
.time-minutes i.v-icon {
  margin-left: 0px;
}
.time-select .toggle-am-pm .v-btn.v-size--default {
  width: 36px;
  min-width: 36px !important;
  height: 32px !important;
  padding-left: 0;
  padding-right: 0;
}
</style>
