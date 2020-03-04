import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import {getNotes} from '../App';
import './MainPageList.css'

class MainPageList extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext;

  render () {
    const { folderId } = this.props.match.params
    const { notes = [] } = this.context
    const notesForFolder = getNotes(notes, folderId)
  return (

        <section className="MainPageList">
          <ul>
            {notesForFolder.map( note => {
              return <li key={note.id}>
                <Note 
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
              }
            )}
          
          </ul>

          <button>
            <Link 
              to='/add-note'
              type='button'>
              Add Note
            </Link>
            </button>
        </section>
        )}

}


MainPageList.defaultProps = {
  notes: []
}

export default MainPageList;

