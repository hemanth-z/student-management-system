import React from 'react'

import {
  requestAndResponse,
  removeNull,
  convertObjectToQueryParams
} from '../../../utils/query'

const leaveHeader = [{
  title: 'Edit',
  prop: 'edit',
  isEdit: true,
  onEdit: (resolve, reject, data, oldData) => {
    requestAndResponse(
        '../api/leave/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(data),
            oldData: removeNull(oldData)
          })
        },
        resolve,
        reject
      )
  }
},
{
  title: 'Delete',
  prop: 'delete',
  isDelete: true,
  formatter: () => < div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
  onDelete: (resolve, reject, data) => {
    requestAndResponse(
        '../api/leave/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              student_id: data.student_id,
              semester: data.semester,
              year: data.year
            }
          })
        },
        resolve,
        reject
      )
  }
},
{
  title: 'รหัสนิสิต',
  prop: 'student_id',
  isEditable: false,
  isNullable: true
},
{
  title: 'ชื่อจริง',
  prop: 'firstname',
  isEditable: false,
  isNullable: true,
  isAddable: false
},
{
  title: 'นามสกุล',
  prop: 'lastname',
  isEditable: false,
  isNullable: true,
  isAddable: false
},
{
  title: 'ภาคการศึกษา',
  prop: 'semester',
  isEditable: true,
  isNullable: true,
  isAddable: true
},
{
  title: 'ปี',
  prop: 'year',
  isEditable: true,
  isNullable: true,
  isAddable: true
},
{
  title: 'ประเภทการลา',
  prop: 'leave_type',
  isEditable: true,
  isNullable: true,
  isAddable: true
},
{
  title: 'คำอธิบาย',
  prop: 'leave_description',
  isNullable: true
}
]

export default {
  table: {
    onAdd: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/leave/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(newData)
          })
        },
        resolve,
        reject
      )
    },
    filterOptions: (filterStr) => {
      const url = '../api/leave/all?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: leaveHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/leave/all',
    parser: (raw) => raw.data
  }
}