<template>
  <div>
    <div>
        등록{{ getItemsCount }}: 
        완료: {{ getCompletedCount }} 
        완료율:<span :style="{color:getRateColor}">{{ getCompletedRate }}%</span>
        <div v-for="(eventDay, index) in getEventDays" :key="index">
          <p class="eventDays">{{eventDay}}</p>
        </div>
    </div>
    
    <router-link to="/input">할일 등록</router-link>
    <section>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in getTodoItems" class="shadow" :key="todoItem.title">
          <i class="checkBtn fas fa-check" :class="{checkBtnCompleted: todoItem.completed}" @click="toggleTodo(index)"></i>
          <span :class="{textCompleted: todoItem.completed}" @click="viewContents(todoItem)">{{ todoItem.title }}</span>
          <span class="removeBtn" @click="removeOneItemAsync(index)">
            <i class="removeBtn fas fa-trash-alt"></i>
          </span>
        </li>
      </transition-group>
    </section>   
    <Modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">
        {{ todoItem.title }}
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
        </h3>
      <div slot="body">{{ todoItem.contents }}</div>
    </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      showModal : false,
      todoItem : {
        title: '',
        contents: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getEventDays', 'getTodoItems', 'getItemsCount', 'getCompletedCount', 'getCompletedRate', 'getRateColor'])
  },
  methods: {
    ...mapMutations({
      removeTodo: 'removeOneItem',
      toggleTodo: 'toggleOneItem',
    }),

    ...mapActions(['removeOneItemAsync']),

    // removeTodoAsync(todoItem, index) {
    //   this.$store.dispatch('removeOneItemAsync', index).then(() => {
    //     this.todoItem.title = todoItem.title;
    //     this.todoItem.contents = '삭제되었습니다.';
    //     this.showModal = true;
    //   })
    // },

    viewContents(todoItem) {
      this.todoItem = todoItem;
      this.showModal = true;
    }
  },
  components: {
    Modal, // Modal : Modal과 동일
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.eventDays {
  line-height: 3pt;
  color: gray;
  font-size: 8pt;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
/* 리스트 아이템 트랜지션 효과 */
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>