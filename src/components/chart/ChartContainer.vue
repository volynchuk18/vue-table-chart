<template>
  <div v-if="activeRow" class="chart-container">
    <line-chart
      v-if="loaded"
      :chart-data="chartData"
      :options="options"
    />
  </div>
</template>

<script>
import LineChart from './Chart.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data() {
    return {
      loaded: false,
      chartData: null,
      options: {
        spanGaps: true,
      },
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.handleRerenderChart();
      }
    },
    activeRow() {
      this.handleRerenderChart();
    }
  },
  async mounted() {
    this.loaded = false
    try {
      this.loaded = true
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  computed: {
    ...mapGetters(['data', 'allDates', 'activeRow'])
  },
  methods: {
    handleRerenderChart() {
      if (!this.activeRow) {
        return
      }
      this.chartData = {
        labels: [...this.allDates].map(date => this.$moment(date).format("DD/MM")),
        datasets: [
          {
            borderWidth: 0,
            label: this.activeRow.name,
            backgroundColor: 'transparent',
            data: this.getValues(this.activeRow)
          },
        ]
      }
    },
    getValues(item) {
      return item.values.map(item => item.value)
    },
  }
}
</script>

<style scoped>
  .chart-container {
    max-width: 600px;
  }
</style>