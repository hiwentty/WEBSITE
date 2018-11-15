var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [{
      'id': 123,
      'todo': '範例：待辦事項',
      'complete': false
    }],
    show: 'all',
    cacheItem: [],
    cacheTodo: ''
  },
  methods: {
    addTodo: function () {
      var todo = this.newTodo.trim();
      if (!todo) {
        return
      };
      var id = Date.now();
      var todo = {
        'id': id,
        'todo': todo,
        'complete': false
      };
      this.todos.push(todo);
      this.newTodo = "";
    },
    removeTodo: function (todo) {
      var newIndex = this.todos.findIndex(function (item) {
        return item.id == todo.id
      });
      this.todos.splice(newIndex, 1);
    },
    editTodo: function (item) {
      this.cacheItem = item;
      this.cacheTodo = item.todo;
    },
    editFinish: function (item) {
      item.todo = this.cacheTodo;
      this.cacheItem = {};
    },
    cancelEdit: function () {
      this.cacheItem = {};
    },
    removeAll() {
      if(confirm('確定將所有任務清除？')){
      this.todos = [];
      } else {return}
    }
  },
  computed: {
    filteredTodos: function () {
      switch (this.show) {
        case "all":
          return this.todos;
          break;
        case "working":
          var filteredTodos = [];
          this.todos.forEach(function (item) {
            if (!item.complete) {
              filteredTodos.push(item);
            }
          });
          return filteredTodos;
          break;
        case "complete":
          var filteredTodos = [];
          this.todos.forEach(function (item) {
            if (item.complete) {
              filteredTodos.push(item);
            }
          });
          return filteredTodos;
          break;
      }
    },
    workingTodos: function () {
      var workingTodos = [];
      this.todos.forEach(function (item) {
        if (item.complete == false) {
          workingTodos.push(item);
        }
      });
      return workingTodos.length
    }
  }
})