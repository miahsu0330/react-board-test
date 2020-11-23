import { useState, useEffect, useRef, useCallback } from "react";

function writeTodoToLocalStroage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

export default function useTodos() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    // lazy initializers
    console.log("init");
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData) {
      todoData = JSON.parse(todoData);
      if (todoData.length) {
        id.current = todoData[0].id + 1;
      }
    } else {
      todoData = [];
    }
    return todoData;
  });

  // render 完都會做這件事情，第二個參數是針對哪個改變的時候才執行
  useEffect(() => {
    writeTodoToLocalStroage(todos);
    console.log(JSON.stringify(todos));

    // clean up 這個 effect 被清掉前想做的事情
    // ex: WebSocket
    return () => {
      console.log("clearEffect: todos", JSON.stringify(todos));
    };
  }, [todos]);

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //dependens array
  const handleButtonClick = useCallback(() => {
    setTodos([
      {
        id: id.current,
        content: value,
      },
      ...todos,
    ]);
    setValue("");
    id.current++;
  }, [setTodos, setValue, value, todos]);

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

  return {
    todos,
    setTodos,
    id,
    handleButtonClick,
    handleToggleIsDone,
    handleDeleteTodo,
    value,
    setValue,
    handleChange,
  };
}

// 因為是空的陣列，代表永遠不會改變所以只有在第一次才會執行
// useLayoutEffect(() => {
//   if (todoData) {
//     setTodos(JSON.parse(todoData));
//   }
// }, []);

// useEffect(() => {
//   return () => {
//     console.log('unmount')
//   }
// })
