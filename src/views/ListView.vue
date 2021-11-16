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
    TodoHeader, // TodoHeader : TodoHeader와 동일
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todoItems: [],
      headerTitle: 'Todo it!'
    }
  },
  methods: {
    removeOneItem(todoItem, index) {
      console.log('removeOneItem');
      localStorage.removeItem(todoItem.title);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem, index) {
      console.log('toggleOneItem');
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(this.todoItems[index].title);
      localStorage.setItem(this.todoItems[index].title, JSON.stringify(this.todoItems[index]));
    },
    clearAllItems() {
      console.log('clearAllItem');
      this.todoItems = [];
      localStorage.clear();
    },
  },
  created() {
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