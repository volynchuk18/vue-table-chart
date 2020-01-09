<template>
  <table class="table-main" v-if="!allDataHidden">
    <tr class="table-row">
      <td>
        Показатель
      </td>
      <td>
        Разница %
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
      v-show="item.show !== false"
    >
      <td
        class="table-row-title"
        @click="rowClickHandler(item)"
        :class="{'table-row-active': item.name === (activeRow && activeRow.name)}"
      >
        {{ item.name }}
      </td>
      <td class="table-row">
        {{ difference(item) }}
      </td>
      <table-item
        v-for="data in item.values"
        :value="data.value"
        :parent="item.name"
        :id="data.id"
        :key="data.id"
      />
    </tr>
  </table>
</template>

<script>
import TableItem from "./TableItem";
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "TableMain",
  components: {TableItem},
  mounted() {
    this.setDates();
    this.fillData();
    this.sortData();
  },
  computed: {
    ...mapGetters(['data', 'allDates', 'activeRow']),
    allDataHidden() {
      return this.data.every(item => item.show === false)
    }
  },
  methods: {
    ...mapMutations(['setDates', 'fillData', 'sortData', 'setActiveRow']),
    rowClickHandler(row) {
      this.setActiveRow(row)
    },
    difference(item) {
      const values = item.values;
      if (values.length > 1 && values[1].value !== 0) {
        let value = null,
            sign = null;
        if (values[1].value > values[0].value) {
          value = values[0].value / values[1].value;
          sign = -1
        } else {
          value = values[1].value / values[0].value;
          sign = 1;
        }
        return  ((1 - value) * 100).toFixed(1) * sign
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .table-row {
    text-align: left;
    &-title {
      cursor: pointer;
      transition: .3s;
      &:hover {
        background: #97c7eb;
        color: #ffffff;
      }
    }
    &-active {
      background: #97c7eb;
      color: #ffffff;
    }
    & td {
      padding: 3px 10px;
      border: 1px solid #ddd;
    }
  }
</style>