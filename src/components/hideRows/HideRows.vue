<template>
  <table class="container">
    <tr
      v-for="row in rowNames"
      :key="row"
    >
      <td>{{row}}</td>
      <td class="action" @click="actionClickHandler(row)">{{actionText(row)}}</td>
    </tr>
  </table>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "HideRows",
  computed: {
    ...mapGetters(['data']),
    rowNames() {
      const names = [];
      this.data.forEach(item => names.push(item.name))
      return names
    }
  },
  methods: {
    ...mapMutations(['showRowToggle']),
    actionClickHandler(row) {
      this.showRowToggle(row)
    },
    actionText(rowName) {
      const row = this.data.find(item => item.name === rowName)
      return row.show !== false ? 'Скрыть' : 'Показать'
    }
  }
}
</script>

<style scoped lang="scss">
  .action {
    transition: .3s;
    cursor: pointer;
    &:hover {
      background: #97c7eb;
    }
  }

  .container {
    margin-left: auto;
    & td {
      min-width: 100px;
      border: 1px solid #ddd;
    }
  }
</style>