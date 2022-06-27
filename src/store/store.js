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
    },
    async loadWeatherData({ state }) {
      for(let i = 0; i < state.tables.length; i++) {
        let id = state.tables[i]["id"]
        // Weather
        let apiKey = "db1a2f091413e833154a6de21adb3076";
        let openweathermap_onecall = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lon}&lon=${this.lat}&exclude=hourly,daily&appid=${apiKey}`
        );
        openweathermap_onecall = await openweathermap_onecall.json();

        let weatherID = openweathermap_onecall["current"]["weather"][0]["id"];
        let roughWeatherState = weatherID.toString()[0];

        // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
        if (roughWeatherState < 7) {
          state.weatherData[id] = "RAINY";
        } else if (roughWeatherState == 7) {
          state.weatherData[id] = "OVERCAST";
        } else {
          if (weatherID > 800) {
            state.weatherData[id] = "OVERCAST";
          } else {
            state.weatherData[id] = "SUNNY";
          }
        }
      }
    },
    mockWeatherData({ state }) {
      state.weatherData[1] = "SUNNY";
      state.weatherData[2] = "OVERCAST";
    }
  }
})

export default store;
