import "./App.css";
import TodoItem from "./TodoItem";
import React from "react";
import { memo, useMemo } from "react";
import useTodos from "./useTodos";

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
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
    handleButtonClick,
    handleToggleIsDone,
    handleDeleteTodo,
    value,
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
