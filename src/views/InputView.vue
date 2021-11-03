<template>
  <div>
    <TodoHeader :headerTitle="headerTitle"></TodoHeader>   
    <TodoInput @addItem="addOneItem"></TodoInput>
  </div>
</template>

<script>
import TodoHeader from '../components/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'


export default {
  name: 'InputView',
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
  },
  data: function() {
    return {
      headerTitle: 'Todo it!'
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      console.log('addOneItem');
      var itemObj = {completed: false, title: todoItem.title, contents: todoItem.contents};
      localStorage.setItem(todoItem.title, JSON.stringify(itemObj));
    },
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