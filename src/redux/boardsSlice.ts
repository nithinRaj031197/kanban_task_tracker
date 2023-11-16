import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import data from "../data.json";
import { Board, CreateTaskType, EditTaskType, Task } from "../global";
import { v4 as uuidv4 } from "uuid";

const initialState: Board[] = data.boards;

const boardsSlice = createSlice({
  name: "boards",
  initialState, // initialState: initialState
  reducers: {
    createBoard: (state, action: PayloadAction<Omit<Board, "isActive">>) => {
      const isActive = state.length > 0 ? false : true;
      const newBoard = {
        id: uuidv4(),
        name: action.payload.name,
        columns: action.payload.columns,
        isActive: isActive,
      };
      state.push(newBoard);
    },
    editBoard: (state, action: PayloadAction<Partial<Board>>) => {
      const { id, name, columns } = action.payload;
      const board = state.find((b) => b.id === id);
      if (board) {
        if (name !== undefined) board.name = name;
        if (columns?.length) board.columns = columns;
      }
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      board && state.splice(state.indexOf(board), 1);

      state[0].isActive = true;
    },
    setIsActiveBoard: (state, action: PayloadAction<Partial<Board>>) => {
      const { id } = action.payload;
      state.map((board) => {
        if (id === board.id) {
          board.isActive = true;
        } else {
          board.isActive = false;
        }
        return board;
      });
    },
    addTask: (state, action: PayloadAction<CreateTaskType>) => {
      const { title, description, subtasks, status, columnId } = action.payload;

      const board = state.find((board) => board.isActive);

      const column = board && board.columns.find((col) => col.id === columnId);

      if (title && description && subtasks && status) {
        const newTask: Task = {
          id: uuidv4(),
          title,
          description,
          subtasks,
          status,
        };

        column?.tasks.push(newTask);
      }
    },
    editTask: (state, action: PayloadAction<EditTaskType>) => {
      const { columnId, taskId, title, description, subtasks, status, previousColumId } = action.payload;

      const board = state.find((b) => b.isActive);

      const previousColumn = board && board.columns.find((c) => c.id === previousColumId);

      if (previousColumId !== columnId) {
        const column = board && board.columns.find((c) => c.id === columnId);
        if (title && description && subtasks && status) {
          const task: Task = {
            id: taskId,
            title,
            description,
            subtasks,
            status,
          };
          column?.tasks.push(task);

          deleteTask({ columnId: previousColumId, taskId });
        }
      } else {
        const task = previousColumn && previousColumn.tasks.find((t) => t.id === taskId);
        if (task && title && description && subtasks && status) {
          task.title = title;
          task.description = description;
          task.subtasks = subtasks;
          task.status = status;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{ columnId: string; taskId: string }>) => {
      const { columnId, taskId } = action.payload;

      const board = state.find((board) => board.isActive);
      const column = board && board.columns.find((c) => c.id === columnId);
      if (column) {
        column.tasks = column && column.tasks.filter((t) => t.id !== taskId);
      }
    },
    dropTask: (
      state,
      action: PayloadAction<{
        colIndex: number;
        prevcolIndex: number;
        taskIndex: number;
      }>
    ) => {
      const { colIndex, prevcolIndex, taskIndex } = action.payload;

      const board = state.find((b) => b.isActive);
      const col = board?.columns.find((_, i) => i === prevcolIndex);
      const task = col?.tasks.splice(taskIndex, 1)[0];
      task && board?.columns.find((_, i) => i === colIndex)?.tasks.push(task);
    },
    setSubtaskCompleted: (state, action: PayloadAction<{ columnId: string; taskId: string; subTaskId: string }>) => {
      const { columnId, taskId, subTaskId } = action.payload;

      const board = state.find((b) => b.isActive);
      const column = board?.columns.find((c) => c.id === columnId);
      const task = column?.tasks.find((t) => t.id === taskId);
      const subTask = task?.subtasks.find((s) => s.id === subTaskId);
      if (subTask) {
        subTask.isCompleted = !subTask?.isCompleted;
      }
    },
  },
});

export const {
  createBoard,
  dropTask,
  deleteBoard,
  editBoard,
  setIsActiveBoard,
  addTask,
  setSubtaskCompleted,
  deleteTask,
  editTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
