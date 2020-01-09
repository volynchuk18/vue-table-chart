<template>
  <td class="table-item">
    <input v-model="computedValue">
  </td>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "TableItem",
  props: ['value', 'parent', 'id'],
  methods: {
    ...mapMutations(['setNewValue'])
  },
  watch: {
    computedValue(to, from) {
      if (isNaN(to)) {
        this.computedValue = from
      }
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.setNewValue({
          parent: this.parent,
          id: this.id,
          value: value
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .table-item {
    transition: opacity 0.3s;
    height: 20px;
    & > input {
      margin: 2px;
    }
  }
  .table-item input {
    width: 60px;
    outline: none;
    border: none;
  }
</style>