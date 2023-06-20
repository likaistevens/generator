export type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: StateType;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  categoryType?: number;
};

export enum StateType {
  open = 1,
  process = 2,
  reject = 3,
}
