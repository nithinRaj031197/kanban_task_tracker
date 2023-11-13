import { Column as ColumnType } from "../global";
import { useEffect, useState } from "react";
import Task from "./Task";
import { useDispatch } from "react-redux";
import { dropTask } from "../redux/boardsSlice";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-sky-500",
];

type ColumnProps = {
  col: ColumnType;
  colIndex: number;
};
const Column = ({ col, colIndex }: ColumnProps) => {
  const dispatch = useDispatch();

  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(colors.pop() ?? "");
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dataTransfer = e.dataTransfer;

    if (dataTransfer) {
      const { prevcolIndex, taskIndex } = JSON.parse(dataTransfer.getData("text"));

      dispatch(dropTask({ colIndex, prevcolIndex, taskIndex }));
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleOnDragOver(e)}
    >
      <div className="flex items-center gap-2 font-semibold tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`w-4 h-4 ${color} rounded-full`}></div>
        {col.name} ({col.tasks.length})
      </div>

      {col?.tasks.map((task, index) => {
        return <Task key={task.id} task={task} colIndex={colIndex} taskIndex={index} columnId={col.id} />;
      })}
    </div>
  );
};

export default Column;
