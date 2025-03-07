export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string;
  timeSpent: number;
  timeEstimate: number;
  createdAt: Date;
  comments: Comment[];
  label?: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  members: User[];
}

export interface Comment {
  id: number;
  text: string;
  author: string;
  date: Date;
}

export type Status = 'todo' | 'in-progress' | 'review' | 'done';

export type Priority = 'low' | 'medium' | 'high';

