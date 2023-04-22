import React, { memo, useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
import { getNewsDetail } from '@/services';

const MyEditor = memo((props) => {
  const [editorState, setEditorState] = useState("")
  const { getNewsContent } = props

  useEffect(() => {
    const { updateNewsId } = props

    if (updateNewsId) {
      // 说明本次是修改 news
      // console.log('本次是修改news');
      // 复现内容
      getNewsDetail(updateNewsId).then(res => {
        const html = res.data.content
        if(html===undefined) return
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
        }
      })
    }else{
      // console.log('本次是添加');
      setEditorState("")
    }
  }, [props])

  const handleSaveContent = () => {
   const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
   getNewsContent(content)
  }
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorState)=>{setEditorState(editorState)}}
        onBlur={()=>{handleSaveContent()}}
      />
    </div>
  )
})

export default MyEditor