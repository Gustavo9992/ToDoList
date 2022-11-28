import { Check, Trash } from 'phosphor-react';

interface TaskProps {
  title: string;
  id: string;
  isComplete: boolean;
  onChangeIsComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function Task({title, id, isComplete, onChangeIsComplete, onDeleteTask}: TaskProps) {
  function handleChangeIsComplete() {
    onChangeIsComplete(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className="flex flex-row items-start p-4 gap-3 w-[46rem] h-[72px] bg-gray-600 border-2 border-solid border-sky-500 rounded-lg">
      <button onClick={handleChangeIsComplete} className={isComplete ? "flex justify-center items-center border-2 border-solid border-purple-dark w-[20px] h-[20px] rounded-[999px] bg-purple-dark hover:bg-purple-light hover:border-purple-light" : "border-2 border-solid border-blue-light w-[20px] h-[20px] rounded-[999px] hover:bg-blue-dark"}>
        <Check size={12} weight="bold" className={isComplete ? "text-gray-100" : "invisible"} />
      </button>
      <span className={isComplete ? "not-italic font-normal text-sm w-[632px] line-through text-gray-300" : "not-italic font-normal text-sm text-gray-100 w-[632px]"}>{title}</span>
      <button onClick={handleDeleteTask} className="text-gray-300 hover:text-red-500 w-6 h-6 hover:bg-gray-400 hover:rounded-[4px] transition-all">
        <Trash size={24} />
      </button>
    </div>
  );
}