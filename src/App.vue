<template>
  <div id="app">
    <vue-chart />
    <div class="table-container">
      <table-main />
      <hide-rows />
    </div>
  </div>
</template>

<script>
import TableMain from './components/table/TableMain.vue'
import VueChart from "./components/chart/ChartContainer";
import HideRows from "./components/hideRows/HideRows";

export default {
  name: 'app',
  components: {
    HideRows,
    VueChart,
    TableMain
  }
}
</script>

<style>
  * {
    font-size: 15px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  table {
    border-collapse: collapse;
  }

  .table-container {
    display: flex;
    justify-content: space-between;
  }
</style>
