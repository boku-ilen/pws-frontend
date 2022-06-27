import { createStore } from 'vuex'

const store = createStore({
  state: {
    tables: [],
    snapshots: {},
    weatherData: {}
  },
  mutations: {
    updateTables(state, tables) {
      state.tables = tables;
    },
    updateSnapshotTable(state, tableId, snapshot) {
      state.snapshots[tableId] = snapshot
    },
    updateWeatherDataTable(state, tableId, weather) {
      state.snapshots[tableId] = weather
    }
  },

  getters: {
    tables: (state) => state.tables,
    snapshots: (state) => state.snapshots,
    weatherData: (state) => state.weatherData
  },

  actions: {
    async loadTables({ state }) {
      let tables_req = await fetch(`/tables/all`);
      tables_req = await tables_req.json();
      state.tables = tables_req;
    },
    async loadSnapshots({ state }) {
      for(let i = 0; i < state.tables.length; i++) {
        let id = state.tables[i]["id"]
        let table_variable = await fetch(`/tables/latest/${id}`);
        table_variable = await table_variable.json();
        state.snapshots[id] = table_variable;
      }
    }
  }
})

export default store;
