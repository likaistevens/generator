export enum TemplateType {
  protable = 10,
}

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
};

export enum StateType {
  open = 1,
  process = 2,
  reject = 3,
}

const config = {
  pageName: "Note",
  headerTitle: "读书笔记列表",
  search: ["title", "auditStatus", "publishStatus"],
};
