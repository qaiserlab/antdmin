import { useRef } from 'react'
import { useFormik } from 'formik'
import { Space, Input, Button } from 'antd'
import { SearchOutlined, FilterOutlined, ReloadOutlined } from "@ant-design/icons"

export default function useFilterable(props: any) {
  const searchInputRef = useRef(null)
  
  const formik = useFormik({
    initialValues: {
      keyword: '',
    },
    
    onSubmit: async (values, { setSubmitting }) => {
      if (props.onFilter) {
        props.onFilter(props.dataIndex, values.keyword)
      }
      
      setSubmitting(false)
    }
  })

  return {
    ...props,
    filterDropdown: () => (
      <form onSubmit={formik.handleSubmit} style={{ padding: 8 }}>
        <Input
          id={props.dataIndex}
          name={props.dataIndex}
          ref={searchInputRef}
          placeholder={`Search ${props.title}`}
          value={formik.values.keyword}
          onChange={(event: any) => formik.setFieldValue('keyword', event.target.value)}
          // onBlur={formik.handleBlur}
          autoComplete={'off'}
          style={{ marginBottom: 8, display: 'block' }}
          disabled={formik.isSubmitting}
        />
        <Space>
          <Button
            type={'primary'}
            htmlType={'submit'}
            size={'small'}
            icon={<FilterOutlined />}
            style={{ width: 90 }}
            disabled={!(formik.values.keyword)}
          >
            Filter
          </Button>
          <Button
            size={'small'} 
            icon={<ReloadOutlined />} 
            style={{ width: 90 }}
            onClick={formik.handleReset} 
            disabled={!(formik.values.keyword)}
          >
            Reset
          </Button>
        </Space>
      </form>
    ),
    filterIcon: (filtered: string) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100)
      }
    },
  }
}