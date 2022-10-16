import React from "react";
import TodoListitem from "./TodoListitem";
import "../css/TodoList.scss";

const TodoList = ({
  todos,
  onRemove,
  onChecked,
  onChange,
  onInsertToggle,
  onChangeTodoId,
  onChangeSelectedTodo,
}) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListitem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onChecked={onChecked}
          onChange={onChange}
          onInsertToggle={onInsertToggle}
          onChangeTodoId={onChangeTodoId}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
