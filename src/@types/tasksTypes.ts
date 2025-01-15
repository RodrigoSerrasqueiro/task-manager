export interface Tasks {
  _id: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  images: [string];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
