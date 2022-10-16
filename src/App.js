import logo from "./logo.svg";
import "./App.css";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoListitem from "./components/TodoListitem";
import TodoEdit from "./components/TodoEdit";
import { useState, useRef, useCallback, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    // GetTodo API
    fetch("https://pre-onboarding-selection-task.shop/todos", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setTodos(res);
      });
  };

  //토큰없이 접근시 경로변경
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = "/";
    }
    getTodos();
  }, []);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        todo: text,
        isCompleted: false,
      };
      //setTodos(todos.concat(todo));

      // 일정등록 createTodo API
      fetch("https://pre-onboarding-selection-task.shop/todos", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(todo),
      })
        .then((response) => response.json())
        .then((res) => {
          getTodos();
        });
    },
    [todos]
  );

  //일정 삭제하기
  const onRemove = useCallback(
    (id) => {
      //setTodos(todos.filter((todo) => todo.id !== id));

      //  일정삭제 DeleteTodo API
      fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.status === 204) {
          getTodos();
        } else {
          alert("잘못된 요청입니다.");
        }
      });
    },
    [todos]
  );

  //일정 체크하기
  const onChecked = useCallback(
    (id, todo, isCompleted) => {
      console.log(!isCompleted);

      onUpdate(id, todo, !isCompleted);
    },
    [todos]
  );

  //내용 수정하기
  const onUpdate = (id, text, isCompleted) => {
    setInsertToggle(false);

    //setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));

    // 일정수정 updateTodo API
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ todo: text, isCompleted: isCompleted }),
      isCompleted: Boolean,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        getTodos();
      });
  };

  //수정시 팝업창
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div className="App">
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onChecked={onChecked}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        >
          <TodoListitem onInsertToggle={onInsertToggle} />
        </TodoList>
        {insertToggle && (
          <TodoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} />
        )}
      </TodoTemplate>
    </div>
  );
}

export default App;
