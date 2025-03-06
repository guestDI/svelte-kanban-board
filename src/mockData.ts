import type { Project, Task, User } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    role: 'Project Manager'
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    role: 'Developer'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson',
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
    timeSpent: 4,
    timeEstimate: 8,
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user authentication and authorization',
    status: 'todo',
    assignee: '2',
    timeSpent: 0,
    timeEstimate: 12,
    createdAt: new Date('2024-03-16')
  },
  {
    id: '3',
    title: 'Project Planning',
    description: 'Create project timeline and resource allocation',
    status: 'done',
    assignee: '1',
    timeSpent: 6,
    timeEstimate: 6,
    createdAt: new Date('2024-03-14')
  }
];

export const project: Project = {
  id: '1',
  name: 'Project Management Tool',
  description: 'A collaborative project management application for small teams',
  tasks,
  members: users
};