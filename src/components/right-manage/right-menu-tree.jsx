import React, { forwardRef } from 'react'
import { Tree } from 'antd' 
import { useSelector } from 'react-redux'

const RightMenuTree = forwardRef((props, ref) => {

  const { roleRightsMenu} = props
  const { rightList } = useSelector(state => state.rightManage)

  


  return (
    <Tree
      ref={ref}
      checkable
      defaultExpandAll={true}
      defaultCheckedKeys={roleRightsMenu}
      treeData={rightList}
    />
  )
})

export default RightMenuTree