import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const options = {
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: (c = this) => console.log(c),
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
}

class Wysiwyg extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div style={ { maxWidth: '90%', margin: 'auto', padding: '2rem' } }>
        <Editor
          toolbar={ options }
          editorState={ editorState }
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={ this.onEditorStateChange }
        />
        <textarea
          style={ { width: '100%' } }
          readOnly
          rows="5"
          disabled
          value={ draftToHtml(convertToRaw(editorState.getCurrentContent())) }
        />
      </div>
    );
  }
}

export default Wysiwyg;