export type Recipe = {
  id: string;
  title: string;
  description: string;
  summary: string;
  ingredients: string;
  image: string;
  tags: string[];
};

export type File = {
  id: string;
  name: string;
  type: string;
  size: number;
};
