import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/todo.js'
import eventDays from './modules/eventDays.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules : {
    todo,
    eventDays
  }
});