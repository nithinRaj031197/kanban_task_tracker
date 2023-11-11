import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { Column } from "../global";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, editBoard } from "../redux/boardsSlice";
import { RootState } from "../redux/store";

type CreateEditBoardModalProps = {
  setBoardOpen: (val: boolean) => void;

  boardType: "add" | "edit";
};

const CreateEditBoardModal = ({ setBoardOpen, boardType }: CreateEditBoardModalProps) => {
  const [newColumns, setNewColumns] = useState<Column[]>([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);

  const [boardName, setBoardName] = useState<string>("");

  const board = useSelector((state: RootState) => state.boards).find((b) => b.isActive);

  useEffect(() => {
    if (boardType === "edit" && board) {
      setBoardName(board.name);
      setNewColumns(board.columns);
    }
  }, []);

  const dispatch = useDispatch();

  function handleColumnInput(id: string, newColumnName: string) {
    setNewColumns((prev: Column[]) => {
      const arr = [...prev];
      const column = arr.find((col: Column) => {
        return col.id === id;
      }) as Column;
      column.name = newColumnName;
      return arr;
    });
  }

  const submitChanges = () => {
    if (boardType === "add") {
      dispatch(
        createBoard({
          id: uuidv4(),
          name: boardName,
          columns: newColumns,
        })
      );
    } else {
      dispatch(
        editBoard({
          id: board?.id,
          name: boardName,
          columns: newColumns,
        })
      );
    }
    setBoardOpen(false);
  };

  return (
    <div
      className="py-4 px-2 top-0 bottom-0 left-0 right-0 dropdown z-50 fixed flex justify-center items-center  scrollbar-hide overflow-scroll"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardOpen(false);
      }}
    >
      <div className="bg-white max-h-[95vh] w-full dark:bg-[#2b2c37] font-bold text-black dark:text-white p-8 rounded-xl shadow-md shadow-[#364e7e1a] max-w-md m-auto scrollbar-hide overflow-y-scroll">
        <h3 className="text-lg">{boardType === "edit" ? "Edit " : "Add New "}Board</h3>

        {/* Board Name */}
        <div className="flex flex-col space-y-1 mt-8">
          <label htmlFor="board-name-input" className="text-sm text-gray-500 dark:text-white">
            Board Name
          </label>
          <input
            id="board-name-input"
            type="text"
            placeholder="e.g Web Design"
            value={boardName}
            className="bg-transparent border-[0.5px] border-gray-600 px-4 py-2 rounded-md outline-1 focus:outline-[#635f67] ring-0"
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>

        {/* Board colums */}
        <div className="flex flex-col space-y-3 mt-8">
          <label className="text-sm text-gray-500 dark:text-white">Board Columns</label>
          {newColumns.map((column: Column) => {
            return (
              <div className="flex items-center w-full" key={column.id}>
                <input
                  className="bg-transparent border-[0.5px] border-gray-600 px-4 py-2 rounded-md outline-[1px] focus:outline-[#635f67] flex-grow"
                  value={column.name}
                  type="text"
                  onChange={(e) => handleColumnInput(column.id, e.target.value)}
                />
                <img src={crossIcon} alt="cross icon" className="m-4 cursor-pointer" />
              </div>
            );
          })}

          <div className="flex flex-col gap-10 mt-10">
            <button
              className="rounded-full bg-[#635fc7] py-2 text-white hover:opacity-70 dark:text-[#635fc7] dark:bg-white "
              onClick={() => {
                setNewColumns((prevState) => [...prevState, { name: "", tasks: [], id: uuidv4() }]);
              }}
            >
              + Add New Column
            </button>

            <button
              className="rounded-full bg-[#635fc7] py-2 text-white hover:opacity-70 dark:text-[#635fc7] dark:bg-white"
              onClick={submitChanges}
            >
              {boardType === "edit" ? "Save Changes" : "Create New Board"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditBoardModal;
