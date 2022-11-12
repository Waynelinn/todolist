<template>
  <div class="container">
    <h1>Todo App</h1>
    <form>
      <input
        class="type"
        v-model="newTodo"
        name="newTodo"
        autocomplete="off"
        placeholder="Type here to add a task..."
      />
      <el-button
        class="add"
        @click="addTodo()"
        type="info"
        :icon="CirclePlus"
        color="white"
        circle
        :disabled="!newTodo"
      />
    </form>
    <div class="box1">
      <input class="checkbox" type="checkbox" />
      <span>Display completed tasks</span>
    </div>
    <ul>
      <li
        class="todoItem"
        v-for="(todo, index) in store.state.todos"
        :key="index"
      >
        <input
          class="checkbox"
          type="checkbox"
          :class="{ done: todo.done }"
          @click="doneTodo(index)"
        />
        <div>
          <p>
            {{ todo.content }}
          </p>
          <span v-show="!todo.done"
            >created {{ todo.createTime }} minutes ago</span
          >
          <span v-show="todo.done">completed 3 minutes ago</span>
        </div>
        <el-button
          class="delete"
          type="danger"
          :icon="Delete"
          circle
          color="white"
          @click="removeTodo(index)"
          style="margin-right: 20px"
        />
        <el-dialog
          v-model="centerDialogVisible"
          title="Notice"
          width="30%"
          destroy-on-close
          center
        >
          <div>
            <strong>Are you sure to delete it?</strong>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleDelete(index)">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </li>
    </ul>
    <h5 v-if="store.state.todos.length === 0">
      Type your task and click the + button to add a new item
    </h5>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { Delete, CirclePlus } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const centerDialogVisible = ref(false);
const store = useStore();

const newTodo = ref("");

//addTodo list
const addTodo = () => {
  if (newTodo.value) {
    store.commit("addTodo", newTodo.value);
    newTodo.value = "";
  }
  store.commit("saveData");
};

// store.commit("createDuration");
let num: number = store.state.todos.createTime;
let str = store.state.todos.content;
console.log(num);
console.log(str);

// done status
const doneTodo = (index: number) => {
  store.commit("doneTodo", index);
  store.commit("saveData");
};

// delete todo list
const handleDelete = (index: number) => {
  store.commit("handleDelete", index);
  store.commit("saveData");
  centerDialogVisible.value = false;
};

// open dialog
const removeTodo = (index: number) => {
  centerDialogVisible.value = true;
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-button.add {
  padding: 0;
  /deep/ i {
    color: black;
    font-size: 40px;
  }
}
.el-button.delete {
  padding: 0;
  /deep/ i {
    color: black;
    font-size: 30px;
  }
}
.container {
  width: 420px;
  height: auto;
  border: 1px solid rgb(190, 190, 190);
}
form {
  width: 380px;
  margin: 20px auto;
}
.type {
  border: 1px solid black;
  width: 300px;
  height: 40px;
  margin-right: 30px;
}

.checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
.checkbox::after {
  position: absolute;
  top: 0;
  background-color: white;
  border: 1.5px solid black;
  width: 20px;
  height: 20px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
}
.checkbox:checked::after {
  content: "✓";
  color: black;
  font-size: 20px;
  font-weight: bold;
}

div {
  width: 380px;
  margin: 20px auto;
}
.box1 {
  display: flex;
  align-content: center;
}
.todoItem {
  width: 380px;
  height: auto;
  margin: 20px auto;
  padding-left: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
}
p {
  word-break: break-all;
  word-wrap: break-word;
  text-align: justify;
  font-weight: bold;
  font-size: 17px;
}
span {
  color: rgb(124, 122, 122);
  font-size: 14px;
}
h1 {
  text-align: center;
}
h5 {
  font-size: 17px;
  width: 380px;
  margin: 30px auto;
}
</style>
