export type ITodoList = ITodoItem[];

export interface ITodoItem {
  id: number;
  completed: boolean;
  title: string;
}

export enum statusesEnum {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface IStatusesList {
  id: number;
  label: statusesEnum;
}
