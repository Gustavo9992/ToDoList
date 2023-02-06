import { Check, Trash } from 'phosphor-react';

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({ id, title, isComplete, onCompleteTask, onDeleteTask }: TaskProps) {
  function handleCompleteTask() {
    onCompleteTask(id)
  }

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <div className="w-[46rem] min-h-[4.5rem] flex flex-row items-start p-4 gap-3 bg-gray-500 border border-solid border-gray-400 rounded-lg">
      <button onClick={handleCompleteTask} className={isComplete ? "w-5 h-5 rounded-[999px] bg-transparent border-2 border-solid border-blue-dark bg-blue-dark hover:bg-blue-light hover:border-blue-light transition-all" : "w-5 h-5 rounded-[999px] bg-transparent border-2 border-solid border-purple-light hover:bg-purple-dark transition-all"}>
        <Check size={14} weight="bold" className={isComplete ? "text-gray-100" : "hidden"} />
      </button>
      <div className={isComplete ? "w-[39.5rem] text-sm text-gray-100 opacity-50" : "w-[39.5rem] text-sm text-gray-100"}>
        <span>{title}</span>
      </div>
      <button onClick={handleDeleteTask} className="text-gray-300 hover:text-danger transition-all hover:bg-gray-400 hover:rounded-sm">
        <Trash size={24} />
      </button>
    </div>
  )
}