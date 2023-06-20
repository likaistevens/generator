export type SeniorContentVO = {
  id: number;
  /** 标题 */
  title: string;
  receiveCount?: number;
  /**  */
  fileUrl?: string;
  /** 审核状态 */
  auditStatus?: AuditStatusType;
  /** 发布状态 */
  publishStatus?: PublishStatusType;
  submitCheckTime?: number;
  lastCheckTime?: number;
};

export enum AuditStatusType {
  unsubmit = 10,
  unapprove = 20,
  reject = 30,
  pass = 40,
}

export enum PublishStatusType {
  unpublish = 0,
  publish = 1,
}

const config = {
  pageName: "Note",
  headerTitle: "读书笔记列表",
  search: ["title", "auditStatus", "publishStatus"],
};
