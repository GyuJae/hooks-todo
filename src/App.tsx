import React from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { ActionKind, useToDo } from "./contexts/todo.context";
import TodoItem from "./components/TodoItem";
import { FaFish } from "react-icons/fa";

interface IForm {
  todo: string;
}

const Container = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IconContainer = styled.div`
  font-size: 70px;
  margin-bottom: 20px;
  color: skyblue;
`;

const TodosContainer = styled.div`
  margin-top: 15px;
`;

const TodoInput = styled.input`
  padding: 15px 20px;
  width: 350px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

const TodosList = styled.ol`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  border-radius: 7px;
  width: 500px;
`;

const CompleteList = styled.ol`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  border-radius: 7px;
  width: 500px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h2`
  font-weight: 700;
  margin-bottom: 10px;
`;

function App() {
  const { state, dispatch } = useToDo();

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = ({ todo }) => {
    if (dispatch) {
      dispatch({
        type: ActionKind.ADD,
        payload: { todo, id: uuidv4(), complete: false },
      });
    }
    setValue("todo", "");
  };

  return (
    <Container>
      <IconContainer>
        <FaFish />
      </IconContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TodoInput placeholder="Add task..." {...register("todo")} />
      </form>
      <TodosContainer>
        <TodosList>
          {state.todos.map(
            (payload) => !payload.complete && <TodoItem payload={payload} />
          )}
        </TodosList>
        <CompleteList>
          <Title>COMPLETE</Title>
          {state.todos.map(
            (payload) => payload.complete && <TodoItem payload={payload} />
          )}
        </CompleteList>
      </TodosContainer>
    </Container>
  );
}

export default App;
