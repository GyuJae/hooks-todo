import React from "react";
import styled from "styled-components";
import { ActionKind, ITodo, useToDo } from "../contexts/todo.context";

interface ITodoItem {
  payload: ITodo;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const Input = styled.input``;

const Item = styled.li<{ checked: boolean }>`
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;

const DelBtn = styled.button`
  background-color: #fd4747;
  color: white;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    filter: brightness(90%);
  }
`;

const TodoItem: React.FC<ITodoItem> = ({ payload }) => {
  const { dispatch } = useToDo();

  const onChangeChecked = ({
    target: { checked, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const payload = JSON.parse(value);
    payload.complete = checked;
    if (dispatch) {
      dispatch({ type: ActionKind.COMPLETE, payload });
    }
  };

  return (
    <Container key={payload.id}>
      <Input
        type="checkbox"
        onChange={onChangeChecked}
        value={JSON.stringify(payload)}
        checked={payload.complete}
      />
      <Item checked={payload.complete} id={payload.id}>
        {payload.todo}
      </Item>
      <DelBtn
        onClick={() =>
          dispatch && dispatch({ type: ActionKind.Delete, payload })
        }
      >
        Del
      </DelBtn>
    </Container>
  );
};

export default TodoItem;
