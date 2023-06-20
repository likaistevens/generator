import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Cascader, Dropdown, Select, Space, Tag } from "antd";
import { useRef } from "react";
import { request } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";
export type SeniorContentVO = {
  id: number;
  title: string;
  receiveCount?: number;
  fileUrl?: string;
  auditStatus?: AuditStatusType;
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
const columns: ProColumns<SeniorContentVO>[] = [
  {
    title: "id",
    dataIndex: "id",
    search: false,
  },
  {
    title: "title",
    dataIndex: "title",
  },
  {
    title: "receiveCount",
    dataIndex: "receiveCount",
    search: false,
  },
  {
    title: "fileUrl",
    dataIndex: "fileUrl",
    search: false,
  },
  {
    title: "auditStatus",
    dataIndex: "auditStatus",
    valueEnum: {
      10: {
        text: "unsubmit",
      },
      20: {
        text: "unapprove",
      },
      30: {
        text: "reject",
      },
      40: {
        text: "pass",
      },
    },
  },
  {
    title: "publishStatus",
    dataIndex: "publishStatus",
    valueEnum: {
      0: {
        text: "unpublish",
      },
      1: {
        text: "publish",
      },
    },
  },
  {
    title: "submitCheckTime",
    dataIndex: "submitCheckTime",
    search: false,
  },
  {
    title: "lastCheckTime",
    dataIndex: "lastCheckTime",
    search: false,
  },
];

export default function Note() {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer ghost>
      <ProTable<SeniorContentVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: SeniorContentVO[];
          }>("https://proapi.azurewebsites.net/github/issues", {
            params,
          });
        }}
        // editable={{
        //   type: 'multiple',
        // }}
        // columnsState={{
        //   persistenceKey: 'pro-table-singe-demos',
        //   persistenceType: 'localStorage',
        //   onChange(value) {
        //     console.log('value: ', value);
        //   },
        // }}
        // search={false}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          span: 6,
          labelWidth: "auto",
        }}
        options={false}
        // options={{
        //   setting: {
        //     listsHeight: 400,
        //   },
        // }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                state: values.state ? JSON.parse(values.state).map((x: string) => [x]) : undefined,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        // pagination={{
        //   pageSize: 5,
        //   onChange: (page) => console.log(page),
        // }}
        pagination={false}
        dateFormatter="string"
        headerTitle="读书笔记列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
}
