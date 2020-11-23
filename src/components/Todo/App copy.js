import "./App.css";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import React from "react";
import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import useTodos from "./useTodos";
// import useImput from "./useInput";

//useMemo 給資料用
// 加 $ stylecompone

// function Button({ onClick, children }) {
//   console.log("render button");
//   return <button onClick={onClick}>{children}</button>;
// }

class Button extends React.Component {
  render() {
    const { onClick, children } = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}

const MemoButton = memo(Button);

function Test({ style }) {
  console.log("render test");
  return <div style={style}>test</div>;
}

const redStyle = {
  color: "red",
};
const blueStyle = {
  color: "blue",
};

function App() {
  const {
    todos,
    setTodos,
    id,
    handleButtonClick,
    handleToggleIsDone,
    handleDeleteTodo,
    value,
    setValue,
    handleChange,
  } = useTodos();

  const s = useMemo(() => {
    console.log("calculate s");
    return value ? redStyle : blueStyle;
  }, [value]);

  return (
    <div className="App">
      <Test style={s} />
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleChange}
      />
      <MemoButton onClick={handleButtonClick}>increment</MemoButton>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
