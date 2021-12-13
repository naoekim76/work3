const state = {
  eventDays: ['12/25 크리스마스', '1/1 새해 첫날']
};

const getters = {
  getEventDays(state) {
    return state.eventDays;
  }
};

export default {
  state,
  getters
}