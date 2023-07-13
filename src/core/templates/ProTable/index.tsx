export default function Comment() {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer ghost>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: GithubIssueItem[];
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
                state: values.state
                  ? JSON.parse(values.state).map((x: string) => [x])
                  : undefined,
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
        headerTitle="学长学姐说列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
}
