import Clipboard from '../assets/Clipboard.svg';
import { PlusCircle } from 'phosphor-react';
import { Task } from './Task';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface TaskProps {
  title: string;
  id: string;
  isComplete: boolean;
}

export function CreateTask() {
  const [ tasks, setTasks ] = useState<TaskProps[]>([])
  const [ newTaskText, setNewTaskText ] = useState('');
  const [ completedTasks, setCompletedTasks ] = useState(0)

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      title: newTaskText,
      id: uuid(),
      isComplete: false
    }

    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleCompleteTask() {
    let count = 0;
    tasks.filter(task => {
      if (task.isComplete === true) {
        count ++;
      }
    })

    setCompletedTasks(count);
  }

  function handleChangeIsComplete(id: string) {
    tasks.map(task => {
      if (task.id === id) {
        return task.isComplete = !task.isComplete;
      }
    })

    handleCompleteTask();
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    })
    tasks.map(task => {
      if (task.id === id && task.isComplete === true) {
        return handleChangeIsComplete(id);
      }
    })

    setTasks(tasksWithoutDeletedOne);
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className="flex flex-row items-center gap-2 absolute w-[46rem] h-[54px] left-[calc(50%-46rem/2)] top-[173px]">
        <input 
          className="p-4 gap-2 w-[638px] h-[54px] bg-gray-500 border border-solid border-gray-700 rounded-lg placeholder:text-gray-300 placeholder:not-italic font-normal text-base text-blue-light focus:border-2 focus:border-solid focus:border-blue-dark" 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskTextChange}
          value={newTaskText}
        />
        <button className="flex flex-row items-center justify-center gap-2 w-[90px] h-[52px] bg-blue-dark rounded-lg not-italic font-bold text-sm text-gray-100 hover:bg-blue-light transition-all">
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>
      <div className="flex flex-col items-start gap-6 absolute w-[46rem] h-[287px] left-[calc(50%-46rem/2)] top-[291px]">
        <div className="flex flex-row justify-between items-end  w-[46rem] h-[19px]">
          <div className="flex items-center flex-row gap-2 w-[135px] h-[19px]">
            <span className="not-italic font-bold text-sm leading-[17px] text-blue-light">Tarefas criadas</span>
            <span className="flex flex-col justify-center items-center py-[2px] px-2 gap-[10px] w-[25px] h-[19px] bg-gray-400 rounded-[999px] text-gray-200 text-xs leading-[14px] font-bold">{tasks.length}</span>
          </div>
          <div className={completedTasks > 0 ? "flex flex-row items-center gap-2 w-[148px] h-[19px] justify-end" : "flex flex-row items-center gap-2 w-[111px] h-[19px]"}>
            <span className="not-italic font-bold text-sm leading-[17px] text-purple-light">Concluídas</span>
            <span className={completedTasks > 0 ? "flex flex-col justify-center items-center py-[2px] px-2 gap-[10px] w-auto h-[19px] bg-gray-400 rounded-[999px] text-gray-200 text-xs leading-[14px] font-bold" : "flex flex-col justify-center items-center py-[2px] px-2 gap-[10px] w-[25px] h-[19px] bg-gray-400 rounded-[999px] text-gray-200 text-xs leading-[14px] font-bold"}>{completedTasks > 0 ? `${completedTasks} de ${tasks.length}` : 0}</span>
          </div>
        </div>
        {tasks.length === 0 ? 
          <div className="flex flex-col justify-center items-center py-16 px-6 gap-4 w-[46rem] h-[244px] border-t border-solid border-gray-400 rounded-lg">
            <img src={Clipboard} alt="" />
            <div className="w-[688px] h-[44px] not-italic text-base text-center text-gray-300">
              <strong className="block">Você ainda não tem tarefas cadastradas</strong>
              <span className="block">Crie tarefas e organize seus itens a fazer</span>
            </div>
          </div>  
         : tasks.map(task => {
          return (
            <Task
              title={task.title}
              id={task.id}
              key={task.id}
              isComplete={task.isComplete}
              onChangeIsComplete={handleChangeIsComplete}
              onDeleteTask={handleDeleteTask}
            />
          ) 
         }) 
         }
      </div>
    </>
  );
}