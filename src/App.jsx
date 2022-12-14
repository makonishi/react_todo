import { useState } from 'react';
import "./App.css";

import InputTodo from './components/InputTodo';
import IncompleteTodo from './components/IncompleteTodo';
import CompleteTodo from './components/CompleteTodo';

export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => { setTodoText(event.target.value); }

  const onClickAdd = () => {
    if(todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  }

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  }

  const onClickComplete = (index) => {
    const completeTodo = incompleteTodos[index];
    const newCompleteTodos = [...completeTodos, completeTodo];
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    const newIncompleteTodos = [...incompleteTodos, newCompleteTodos[index]];
    newCompleteTodos.splice(index, 1);

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }
  
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onClickAdd={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && 
        <p style={{ color: 'red' }}>登録できるtodoは5個までです。消化してください。</p>
      }
      
      <IncompleteTodo 
        todos={incompleteTodos} 
        onClickComplete={onClickComplete} 
        onClickDelete={onClickDelete} 
      />
      <CompleteTodo
        todos={completeTodos} 
        onClickBack={onClickBack}
      />
    </>
  );
}
