export type Board = {
  id: string;
  name: string;
  isActive: boolean;
  columns: Column[];
};

export type Column = {
  name: string;
  tasks: Task[];
  id: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
};

export type SubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type CreateTaskType = Partial<Task> & { columnId: string };
