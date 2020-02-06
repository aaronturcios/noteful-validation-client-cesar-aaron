  
import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../../ApiContext';
import {findNote} from '../../App';
import './NotePageMain.css';

 export default class NotePageMain extends React.Component {
   static defaultProps = {
     match: { params: {}}
   }

   static contextType = ApiContext;

   render () {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {content: ''}
    
    return (
      
          <section className='NotePageMain'>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
            <div className='note-content'>
              {note.content.split('/n').map((para, i) =>
                <p key={i}>{para}</p>
              )}
            </div>
          </section>
        )}
    
}