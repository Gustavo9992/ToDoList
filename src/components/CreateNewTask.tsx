import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import Clipboard from '../assets/Clipboard.svg';
import { PlusCircle } from 'phosphor-react';

import {v4 as uuid} from 'uuid';

import { Task } from './Task';

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

export function CreateNewTask() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuid(),
      title: newTaskText,
      isComplete: false
    }

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleCompleteTask(id: string) {
    let count = 0;
    tasks.map(task => {
      if (task.id === id) {
        return task.isComplete = !task.isComplete
      }
    })
    tasks.filter(task => {
      if (task.isComplete === true) {
        return count++;
      }
    })
    setCompletedTasks(count)
  }

  function handleDeleteTask(id: string) {
    const taskListWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id
    })

    tasks.filter(task => {
      if (task.id === id && task.isComplete === true) {
        return handleCompleteTask(id)
      }
    })

    setTasks(taskListWithoutDeletedOne)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className="w-[46rem] h-14 left-[calc(50%-46rem/2)] flex items-center gap-2 top-[11.4rem] absolute">
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa" 
          className="w-[40rem] p-4 bg-gray-500 border border-solid border-gray-700 rounded-lg h-12 text-base leading-[140%] text-purple-light placeholder:text-gray-300 focus:border-purple-dark focus:border-2"
          onChange={handleNewTaskTextChange}
          value={newTaskText}
          required
          onInvalid={handleNewTaskInvalid}
        />
        <button className="w-[5.625rem] h-12 bg-purple-dark rounded-lg text-gray-100 font-bold gap-2 flex flex-row items-center justify-center text-sm hover:bg-purple-light transition-all">
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>
      <div className="w-[46rem] h-72 left-[calc(50%-46rem/2)] top-72 flex flex-col items-start gap-6 absolute">
        <div className="flex flex-row justify-between items-end w-[46rem] h-5 font-bold">
          <div className="flex flex-row items-center gap-2">
            <span className="text-purple-light text-sm leading-4">Tarefas criadas</span>
            <span className="py-[0.125rem] px-2 gap-[0.625rem] bg-gray-400 rounded-[999px] text-gray-100 text-xs leading-[0.875rem]">{tasks.length}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-blue-light text-sm leading-4">Concluídas</span>
            <span className={completedTasks == 0 ? "py-[0.125rem] px-2 gap-[0.625rem] bg-gray-400 rounded-[999px] text-gray-100 text-xs leading-[0.875rem]" : "py-[0.125rem] px-2 gap-[0.625rem] bg-gray-400 rounded-[999px] text-gray-100 text-xs leading-[0.875rem]"}>{completedTasks > 0 ? `${completedTasks} de ${tasks.length}` : `${completedTasks}`}</span>
          </div>
        </div>
        {tasks.length == 0 ? <div className="w-[46rem] h-[15.25rem] flex flex-col justify-center items-center py-16 px-6 border-t border-solid border-t-gray-400 rounded-lg text-gray-300 gap-4">
          <img src={Clipboard} alt="Ícone de um Clipboard" />
          <div className="w-[43rem] h-[2.75rem] text-base leading-[140%] text-center">
            <strong className="block">Você ainda não tem tarefas cadastradas</strong>
            <span className="block">Crie tarefas e organize seus itens a fazer</span>
          </div>
        </div> :
        tasks.map(task => {
          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              isComplete={task.isComplete}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />)
          })}
      </div>
    </>
  )
}
