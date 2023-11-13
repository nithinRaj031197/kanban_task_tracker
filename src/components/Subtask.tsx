import { BaseSyntheticEvent, useState } from "react";
import { SubTask } from "../global";
import { useDispatch, useSelector } from "react-redux";
import { setSubtaskCompleted } from "../redux/boardsSlice";
import { RootState } from "../redux/store";

type SubtaskProps = {
  subtask: SubTask;
  columnId: string;
  taskId: string;
};

const Subtask = ({ subtask, columnId, taskId }: SubtaskProps) => {
  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.boards);
  const board = boards?.find((b) => b.isActive);
  const column = board?.columns.find((c) => c.id === columnId);
  const task = column?.tasks.find((t) => t.id === taskId);
  const subTask = task?.subtasks.find((s) => s.id === subtask.id);

  const checked = subTask && subTask.isCompleted;

  const handleCheckBox = (e: BaseSyntheticEvent) => {
    dispatch(setSubtaskCompleted({ columnId, taskId, subTaskId: subtask.id }));
  };

  return (
    <div className=" w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
      <input
        className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={handleCheckBox}
      />
      <p className={checked ? " line-through opacity-30 " : ""}>{subtask.title}</p>
    </div>
  );
};

export default Subtask;
