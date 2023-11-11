import { DragEvent } from "react";
import { Task as TaskType } from "../global";

type TaskProps = {
  task: TaskType;
  colIndex: number;
  taskIndex: number;
};

const Task = ({ task, colIndex, taskIndex }: TaskProps) => {
  let completed: number = 0;
  const subtasks = task.subtasks;

  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed += 1;
    }
  });

  const handleOnDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("text", JSON.stringify({ prevcolIndex: colIndex, taskIndex }));
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg dark:bg-[#2b2c37] py-6 px-3 first:my-5 w-[280px] shadow-[#364e7e1a] shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer select-none"
        onDragStart={(e) => handleOnDragStart(e)}
        draggable
      >
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
    </div>
  );
};

export default Task;
