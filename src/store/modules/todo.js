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
  },
}

const state = {
  todoItems: stroage.fetch()
};

const getters = {
  getTodoItems(state) {
    return state.todoItems;
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

export default {
  state,
  getters,
  mutations
}