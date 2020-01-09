<template>
  <table class="table-main">
    <tr class="table-row">
      <td>
        Показатель
      </td>
      <td
        v-for="date in allDates"
        :key="date"
      >
        {{ $moment(date).format("DD/MM") }}
      </td>
    </tr>
    <tr
      class="table-row"
      v-for="item in data"
      :key="item.name"
    >
      <td>
        {{ item.name }}
      </td>
      <table-item
        v-for="data in item.values"
        :data="data"
        :key="data.id"
      />
    </tr>
  </table>
</template>

<script>
import data from '../../../public/data.json'
import randomValue from '../../mixins/randomValue'
import sortObjectsArray from '../../mixins/sortObjectsArray'
import TableItem from "./TableItem";

export default {
  name: "TableMain",
  components: {TableItem},
  mixins: [randomValue, sortObjectsArray],
  data() {
    return {
      data
    }
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.fillData();
        this.sortData()
      }
    }
  },
  computed: {
    allDates() {
      const dates = new Set();
      this.data.forEach(item => {
        item.values.forEach(value => dates.add(value.date))
      });
      return dates
    },
  },
  methods: {
    fillData() {
      this.allDates.forEach(date => {
        this.data.forEach(item => {
          if (!item.values.find(value => value.date === date)) {
            // eslint-disable-next-line no-console
            item.values.push({
              id: this.randomValue(),
              value: null,
              date: date
            })
          }
        })
      })
    },
    sortData() {
      this.data.forEach(item => {
        this.sortObjectsArray(item.values, 'date')
      })
    }
  }
}
</script>

<style scoped>
  .table-row td {
    border: 1px solid #ddd;
  }
</style>