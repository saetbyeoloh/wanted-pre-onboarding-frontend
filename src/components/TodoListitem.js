import { React, useEffect, useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdModeEditOutline,
} from "react-icons/md";
import cn from "classnames";
import "../css/TodoListItem.scss";
import TodoEdit from "./TodoEdit";

const TodoListitem = ({
  todo,
  onRemove,
  onChecked,
  onInsertToggle,
  onChangeSelectedTodo,
}) => {
  const [checked, setChecked] = useState(todo.isCompleted);

  useEffect(() => {
    setChecked(todo.isCompleted);
  }, [todo]);

  return (
    <li className="TodoListItem">
      <div
        className={cn("checkbox", { checked })}
        onClick={() => onChecked(todo.id, todo.todo, todo.isCompleted)}
      >
        {todo.isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{todo.todo}</div>
      </div>
      <div
        className="edit"
        onClick={() => {
          onChangeSelectedTodo(todo);
          onInsertToggle();
        }}
      >
        <MdModeEditOutline />
      </div>
      <div className="remove" onClick={() => onRemove(todo.id)}>
        <MdRemoveCircleOutline />
      </div>
    </li>
  );
};

export default TodoListitem;
