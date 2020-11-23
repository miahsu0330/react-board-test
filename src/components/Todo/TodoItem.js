import styled from "styled-components";
import PropTypes from "prop-types";

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

export default function TodoItem({
  size,
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  return (
    <TodoItemWrapper data-todo-id={todo.id}>
      <TodoConent className="" size={size}>
        {todo.content}
      </TodoConent>
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

TodoItem.propTypes = {
  size: PropTypes.string,
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
};
