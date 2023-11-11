type CreateEditTaskModalProps = {
  setIsOpenTaskModal: (val: boolean) => void;
};

const CreateEditTaskModal = ({ setIsOpenTaskModal }: CreateEditTaskModalProps) => {
  return (
    <div
      className="absolute dropdown w-full h-full flex justify-center items-center"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsOpenTaskModal(false);
      }}
    >
      <div className="bg-white  w-96 h-96">Add New Task</div>
    </div>
  );
};

export default CreateEditTaskModal;
