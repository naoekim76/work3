<template>
  <div> 
    <div class="inputBox shadow">      
      <input type="text" v-model="newTodoItem.title" placeholder="할일 제목을 입력하세요">
      <span class="addContainer" @click="addTodo">
        <i class="addBtn fas fa-plus" aria-hidden="true"></i>
      </span>
      <div id="editor">
        <textarea v-model="newTodoItem.contents" placeholder="할일 상세 내용을 입력하세요"></textarea>
      </div>
    </div>
    <router-link to="/">할일 목록</router-link>
    <Modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">
        경고!
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
        </h3>
      <div slot="body">할일 제목과 내용을 입력하세요.</div>
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/common/Modal.vue'

export default {
  data: function() {
    return {
      newTodoItem: {
        title: '',
        contents: ''
      },
      headerTitle: 'Todo it!',
      showModal: false
    }
  },
  methods: {
    addTodo: function() {
      console.log(this.newTodoItem.title);
      console.log(this.newTodoItem.contents);
      if (this.newTodoItem.title !== '' && this.newTodoItem.contents !== '') {
        this.$emit('addItem', this.newTodoItem);
        this.clearInput();
        this.$router.push('/');
      } else {
        this.showModal = true;
      }
    },
    clearInput: function() {
      this.newTodoItem.title = '';
      this.newTodoItem.contents = '';
    }
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 300px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}

textarea,
#editor div {
  display: inline-block;
  width: 100%;
  height: 200px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: 0;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: aliceblue;
  padding: 20px;
}
</style>