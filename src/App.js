import "./App.css";
import styled from "styled-components";
import { useState, useRef } from "react";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  paddiig: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`;

const TodoConent = styled.div`
  color: #333;
  font-size: 12px;

  ${(props) =>
    props.size === "XL" &&
    `
    font-size: 20px
  `}

  ${(props) =>
    props.isDone &&
    `
    text-decoration: line-through;
  `}
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;
`;
// 加 $ stylecompone

function TodoItem({ size, todo, handleDeleteTodo, handleToggleIsDone }) {
  return (
    <TodoItemWrapper data-todo-id={todo.id}>
      <TodoConent size={size}>{todo.content}</TodoConent>
      <TodoButtonWrapper>
        <Button
          onClick={() => {
            handleToggleIsDone(todo.id);
          }}
        >
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <Button
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          刪除
        </Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

// hook function component
// 解構語法

let id = 2;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: "abc", isDone: true },
    { id: 2, content: "adddbc", isDone: false },
  ]);

  const [value, setValue] = useState("");

  function handleButtonClick() {
    setTodos([
      {
        id,
        content: value,
      },
      ...todos,
    ]);
    setValue("");
    id++;
  }

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    // 篩選出不等於要刪除的 id
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>increment</button>
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
