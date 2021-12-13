const stroage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) { 
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  }
}

const state = {
  todoItems: stroage.fetch(),
  dayList: ['12/25 크리스마스', '1/1 새해 첫날']
};

const getters = {
  getDayList(state) {
    return state.dayList;
  },
  getTodoItems(state) {
    return state.todoItems;
  },
  getItemsCount(state) { // 할일 목록 수
    return state.todoItems.length;
  },
  getCompletedCount(state) { // 완료 수
    return state.todoItems.filter(items => items.completed).length;
  },
  getCompletedRate(state, getters) { // 완료율
    let rate = 0;
    if (state.todoItems.length > 0) {
      rate = (getters.getCompletedCount / state.todoItems.length * 100).toFixed(1);
    }
    return rate;
  },
  getRateColor(state, getters) { // 비율 색상
    let color = 'red';
    const rate = getters.getCompletedRate;
    if (rate >= 40 && rate < 80) color = 'orange'
    else if (rate >= 80) color = 'green';
    return color;
  }
};

const mutations = {
  addOneItem(state, todoItem) {
    console.log('addOneItem');
    const itemObj = {completed: false, title: todoItem.title, contents: todoItem.contents};
    localStorage.setItem(todoItem.title, JSON.stringify(itemObj));
    state.todoItems.push(itemObj);
  },
  removeOneItem(state, index) {
    console.log('removeOneItem');
    localStorage.removeItem(state.todoItems[index].title);
    state.todoItems.splice(index, 1);
    alert('삭제 되었습니다.');
  },
  toggleOneItem(state, index) {
    console.log('toggleOneItem');
    state.todoItems[index].completed = !state.todoItems[index].completed;
    localStorage.removeItem(state.todoItems[index].title);
    localStorage.setItem(state.todoItems[index].title, JSON.stringify(state.todoItems[index]));
  },
  clearAllItems(state) {
    console.log('clearAllItem');
    state.todoItems = [];
    localStorage.clear();
  },
};

const actions = {
  removeOneItemAsync(context, index) {
    setTimeout(() => context.commit('removeOneItem', index), 2000);
  }
  // removeOneItemAsync({ commit }, index) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       commit('removeOneItem', index)
  //       resolve()
  //     }, 1000)
  //   })
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}