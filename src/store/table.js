import data from '../../public/data.json'
import Vue from 'vue';

export default {
  state: {
    data,
    allDates: null,
    activeRow: null
  },
  mutations: {
    setActiveRow: (state, row) => {
      state.activeRow = row
    },
    fillData: state => {
      const randomValue = () => {
        return +Math.random().toString().slice(2,11)
      };
      state.allDates.forEach(date => {
        state.data.forEach(item => {
          if (!item.values.find(value => value.date === date)) {
            item.values.push({
              id: randomValue(),
              value: 0,
              date: date
            })
          }
        })
      })
    },
    sortData: state => {
      const sortObjectsArray = (arr, key) => {
        const compare = (a, b) => {
          if (a[key] < b[key]) {
            return -1;
          }
          if (a[key] > b[key]) {
            return 1;
          }
          return 0;
        };
        return arr.sort(compare);
      };
      state.data.forEach(item => {
        sortObjectsArray(item.values, 'date')
      })
    },
    setDates: state => {
      const dates = new Set();
      state.data.forEach(item => {
        item.values.forEach(value => dates.add(value.date))
      });
      state.allDates = [...dates].sort()
    },
    setNewValue: (state, params) => {
      const object = state.data.find(obj => obj.name === params.parent);
      const item = object && object.values.find(obj => obj.id === params.id);
      Vue.set(item, 'value', params.value)
    },
    showRowToggle: (state, rowName) => {
      const row = state.data.find(item => item.name === rowName)
      Vue.set(row, 'show', row.show === false ? true : false);
    }
  },
  getters: {
    data: state => state.data,
    allDates: state => state.allDates,
    activeRow: state => state.activeRow,
  },
};
