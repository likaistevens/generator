const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: "ID",
    dataIndex: "userId",
    // valueType: 'indexBorder',
    copyable: true,
    search: false,
  },
  {
    title: "标题",
    dataIndex: "title",
    // copyable: true,
    ellipsis: true,
    // tip: '标题过长会自动收缩',
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '此项为必填项',
    //     },
    //   ],
    // },
    width: 200,
  },
  {
    title: "点赞",
    dataIndex: "dig",
    search: false,
  },
  {
    disable: true,
    title: "审核状态",
    dataIndex: "state",
    // filters: true,
    // onFilter: true,
    // ellipsis: true,
    fieldProps: {
      multiple: true,
      options: [
        {
          field: "front end",
          value: "fe",
        },
        {
          field: "back end",
          value: "be",
        },
      ],
      fieldNames: {
        label: "field",
      },
    },
    valueType: "cascader",
    search: {
      transform: (value, namePath, allValues) => {
        return {
          state: JSON.stringify(value?.map((x: any) => x[0])),
        };
      },
    },
  },
  {
    disable: true,
    title: "发布状态",
    dataIndex: "state2",
    // search: false,
    // renderFormItem: (_, { defaultRender }) => {
    //   return defaultRender(_);
    // },
    // render: (_, record) => (
    //   <Space>
    //     {record.labels.map(({ name, color }) => (
    //       <Tag color={color} key={name}>
    //         {name}
    //       </Tag>
    //     ))}
    //   </Space>
    // ),
    valueEnum: {
      all: { text: "超长".repeat(50) },
      processing: {
        text: "待提交审核",
        status: "Processing",
      },
      open: {
        text: "待审核",
        status: "Error",
      },
      closed: {
        text: "审核通过",
        status: "Success",
      },
      reject: {
        text: "审核驳回",
        status: "Reject",
      },
    },
  },
  {
    title: "最新提交审核时间",
    // key: 'showTime',
    dataIndex: "created_at",
    valueType: "date",
    search: false,
    // sorter: true,
    // hideInSearch: true,
  },
  {
    title: "最新审核时间",
    dataIndex: "created_at",
    valueType: "date",
    search: false,
    // hideInTable: true,
    // search: {
    //   transform: (value) => {
    //     return {
    //       startTime: value[0],
    //       endTime: value[1],
    //     };
    //   },
    // },
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      // <a
      //   key="editable"
      //   onClick={() => {
      //     action?.startEditable?.(record.id);
      //   }}
      // >
      //   编辑
      // </a>,
      // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      //   查看
      // </a>,
      // <TableDropdown
      //   key="actionGroup"
      //   onSelect={() => action?.reload()}
      //   menus={[
      //     { key: 'copy', name: '复制' },
      //     { key: 'delete', name: '删除' },
      //     { key: 'copy', name: '复制' },
      //   ]}
      // />,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        提交审核
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        记录
      </a>,
    ],
  },
];
