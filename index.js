const getid = (id) => document.getElementById(id);
const crel = (nn) => document.createElement(nn);

window.onload = function () {
  const input = getid("input");
  const addBtn = getid("add");
  const output = getid("output");

  const todos = JSON.parse(localStorage.getItem("todos") || []);

  addBtn.onclick = handleAdd;
  input.onkeydown = function (event) {
    if (event.key == "Enter") handleAdd();
  };

  function handleAdd() {
    let val = input.value;
    if (val == "") return;
    addTodo(val);
    input.value = "";
    renderTodos();
  }

  function delTodo(id) {
    todos.splice(id, 1);
    renderTodos();
  }

  function likeTodo(id) {
    todos[id].like = !todos[id].like;
    renderTodos();
  }

  function addTodo(name) {
    todos.push({
      name,
      like: false,
    });

  }

  function renderTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    output.innerHTML = " ";
    todos.forEach(function (todo, id) {
      const div = crel("div");
      const name = crel("span");
      const likeBtn = crel("button");
      const delBtn = crel("button");

      likeBtn.innerHTML = "&#10004;";
      likeBtn.onclick = () => likeTodo(id);
      delBtn.innerHTML = "&#10006;";
      delBtn.onclick = () => delTodo(id);

      name.innerHTML = todo.name;
      if (todo.like) likeBtn.classList.add("like");

      div.append(name);
      div.append(likeBtn);
      div.append(delBtn);

      output.append(div);
    });
  }
  renderTodos();
};
