<template>
  <div>
    <TodoHeader :headerTitle="headerTitle"></TodoHeader>   
    <TodoList :propsdata="todoItems" @toggleItem="toggleOneItem" @removeItem="removeOneItem"></TodoList>
    <TodoFooter @clearItems="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from '../components/TodoHeader.vue'
import TodoList from '../components/TodoList.vue'
import TodoFooter from '../components/TodoFooter.vue'


export default {
  name: 'ListView',
  components: {
    TodoHeader: TodoHeader,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },
  data: function() {
    return {
      todoItems: [],
      headerTitle: 'Todo it!'
    }
  },
  methods: {
    removeOneItem: function(todoItem, index) {
      console.log('removeOneItem');
      localStorage.removeItem(todoItem.title);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      console.log('toggleOneItem');
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(this.todoItems[index].title);
      localStorage.setItem(this.todoItems[index].title, JSON.stringify(this.todoItems[index]));
    },
    clearAllItems: function() {
      console.log('clearAllItem');
      this.todoItems = [];
      localStorage.clear();
    },
  },
  created: function() {
    console.log('created'); // 생성
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}
</style>