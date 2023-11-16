import { BaseSyntheticEvent, useState } from "react";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import { Task } from "../global";
import Subtask from "../components/Subtask";
import ElipsisMenu from "../components/EllipsisMenu";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/boardsSlice";
import CreateEditTaskModal from "./CreateEditTaskModal";
import DeleteModal from "./DeleteModal";

type TaskModalProps = {
  task: Task;
  columnId: string;
  setIsIndividualTaskOpen: (val: boolean) => void;
};

const TaskModal = ({ task, setIsIndividualTaskOpen, columnId }: TaskModalProps) => {
  const { title, description, subtasks } = task;

  const dispatch = useDispatch();

  const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);

  const [isEditTaskModal, setIsEditTaskModal] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onClose = (e: BaseSyntheticEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setIsIndividualTaskOpen(false);
  };

  let completed = 0;

  subtasks.map((s) => {
    if (s.isCompleted) {
      completed += 1;
    }
  });

  function openEditModel() {
    setIsEllipsisOpen(false);
    setIsEditTaskModal(true);
  }

  function openDeleteModel() {
    setIsEllipsisOpen(false);
    dispatch(deleteTask({ columnId, taskId: task.id }));
  }

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1>{title}</h1>

          <img
            onClick={() => {
              setIsEllipsisOpen(true);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {isEllipsisOpen && (
            <ElipsisMenu
              type="Tasks"
              setOpenEditModal={openEditModel}
              setOpenDeleteModal={() => setIsDeleteModalOpen(true)}
            />
          )}
        </div>

        <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-6">{description}</p>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask) => {
            return <Subtask key={subtask.id} subtask={subtask} columnId={columnId} taskId={task.id} />;
          })}
        </div>
      </div>

      {isEditTaskModal && (
        <CreateEditTaskModal
          type="edit"
          setIsOpenTaskModal={setIsEditTaskModal}
          task={task}
          setIsIndividualTaskOpen={setIsIndividualTaskOpen}
          columnId={columnId}
        />
      )}

      {isDeleteModalOpen && (
        <div className="absolute top-1/2 left-1/2 ">
          {task && (
            <DeleteModal
              type="task"
              title={task.title}
              onDeleteBtnClick={openDeleteModel}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TaskModal;
