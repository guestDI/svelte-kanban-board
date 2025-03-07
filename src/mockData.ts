import type { Project, Task, User } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'Project Manager'
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'Developer'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?img=67',
    role: 'Designer'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design User Interface',
    description: 'Create wireframes and mockups for the main dashboard',
    status: 'in-progress',
    assignee: '3',
    priority: 'high',
    timeSpent: 4,
    timeEstimate: 8,
    createdAt: new Date('2024-03-15'),
    comments: []
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user authentication and authorization',
    status: 'todo',
    assignee: '2',
    priority: 'high',
    timeSpent: 0,
    timeEstimate: 12,
    createdAt: new Date('2024-03-16'),
    comments: []
  },
  {
    id: '3',
    title: 'Implement dev pipeline ',
    description: 'Set up pipeline for dev branch',
    status: 'todo',
    assignee: '2',
    priority: 'medium',
    timeSpent: 0,
    timeEstimate: 12,
    createdAt: new Date('2024-03-16'),
    label: ['Release 1', 'CI/CD'],
    comments: []
  },
  {
    id: '4',
    title: 'Project Planning',
    description: 'Create project timeline and resource allocation',
    status: 'done',
    priority: 'high',
    assignee: '1',
    timeSpent: 6,
    timeEstimate: 6,
    label: ['Project setup'],
    createdAt: new Date('2024-03-14'),
    comments: []
  }
];

export const project: Project = {
  id: '1',
  name: 'Project Management Tool',
  description: 'A collaborative project management application for small teams',
  tasks,
  members: users
};