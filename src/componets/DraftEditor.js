import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

//styles
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function DraftEditor({ body }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (body) {
      setEditorState(
        EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(body))),
      );
    }
  }, [body]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorClassName="editor"
    />
  );
}
