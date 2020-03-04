import React from 'react';
import './NotePageSidebar.css';
import ApiContext from '../ApiContext';
import { findFolder, findNote } from '../App';
import CircleButton from '../CircleButton/CircleButton';

class NotePageSidebar extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;
  
  render () {

    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
            <div className='NotePageNav'>
              <CircleButton
                tag='button'
                role='link'
                onClick={() => this.props.history.goBack()}
                className='NotePageNav_back-button'
              >
                <FontAwesomeIcon icon='chevron-left' />

                <br />
                Back
              </CircleButton>
              {folder && (
                <h3 className='NotePageNav__folder-name'>
                  {folder.name}
                </h3>
              )}
            </div>
    )
  }
}

export default NotePageSidebar;