export const getJsxStr = ({
  pageName = "Page",
  formTypeKey,
  headerTitle = "列表",
}: {
  pageName: string;
  formTypeKey: string;
  headerTitle: string;
}) => {
  return `
    export default function ${pageName}() {
        const actionRef = useRef<ActionType>();
        return (
          <PageContainer ghost>
            <ProTable<${formTypeKey}>
              columns={columns}
              actionRef={actionRef}
              cardBordered
              request={async (params = {}) => {
                // console.log(sort, filter);
                const { data, total } = await Service.fetchData({
                  type: 20,
                  pageQuery: params,
                  ...params,
                });
                return {
                  data: data || [],
                  success: true,
                  total: total || 0,
                };
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
              pagination={{
                showQuickJumper: true,
                pageSize: 50,
                showSizeChanger: false,
              }}
              // pagination={false}
              dateFormatter="string"
              headerTitle="${headerTitle}"
              toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined />} type="primary">
                  新建
                </Button>,
              ]}
            />
          </PageContainer>
        );
      }
      
    `;
};
