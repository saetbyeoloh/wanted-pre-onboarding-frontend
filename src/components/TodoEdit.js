import { useState, useCallback, React, useEffect } from "react";
import "../css/TodoEdit.scss";

function TodoEdit({ selectedTodo, onUpdate }) {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //const onSubmit = useCallback((e) => {
  //  onUpdate(selectedTodo.id, value);
  //  setValue(""); //value 초기화
  //기본이벤트(새로고침) 방지
  //  e.preventDefault();
  //  console.log(e);
  //}, []);

  const onSubmit = (selectedTodo) => {
    console.log(selectedTodo.todo);
    console.log(value);

    onUpdate(selectedTodo.id, value, selectedTodo.isCompleted);
  };

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.todo);
    }
  }, [selectedTodo]);

  return (
    <div className="background">
      <form className="todoedit__insert">
        <h2>수정하기</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <button
          type="button"
          onClick={() => {
            onSubmit(selectedTodo);
          }}
        >
          수정
        </button>
        <button type="submit">취소</button>
      </form>
    </div>
  );
}

export default TodoEdit;
