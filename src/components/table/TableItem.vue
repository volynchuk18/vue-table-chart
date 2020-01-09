<template>
  <td class="table-item">
    <input :value="this.data.value">
  </td>
</template>

<script>
export default {
  name: "TableItem",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return this.$moment(this.data.date).format("DD/MM/YYYY")
    }
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
    outline: none;
    border: none;
  }
</style>