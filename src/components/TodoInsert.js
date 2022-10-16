import React from "react";
import { useState, useCallback, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import "../css/TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const changeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const InsertSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");

      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className="TodoInsert" onSubmit={InsertSubmit}>
      <input
        placeholder="할 일을 적어주세요."
        value={value}
        onChange={changeValue}
      ></input>
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
