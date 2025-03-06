export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee: string;
  timeSpent: number;
  timeEstimate: number;
  createdAt: Date;
  comments: Comment[];
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

