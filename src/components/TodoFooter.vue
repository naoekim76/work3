<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo">Clear All({{ getItemsCount }})</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getItemsCount'])
  },
  methods: {
    ...mapMutations({
      clearTodo: 'clearAllItems'
    })
  }
}
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>