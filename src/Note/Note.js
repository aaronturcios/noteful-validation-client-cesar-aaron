import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ApiContext from '../../ApiContext'

class Note extends React.Component {
  static contextType = ApiContext;
  static defaultProps = {onDelete: () => {}}

  handleDelete = (e) => {
    e.preventDefault();
    const deleteMe = this.context.deleteNote
    const noteToDelete= this.props.id
    const URL = 'http://localhost:9090/';
    fetch(URL + `notes/${noteToDelete}` ,
    {method: 'DELETE'})
    .then((res) => {
      if (res.ok) {
        console.log('DELETE API response ok!')
        return res.json();
      } else {
        throw new Error('Failed to delete from API');
      }
    })
    .then(() => {
      
     deleteMe(noteToDelete)
     this.props.onDelete(noteToDelete)
      })
    .catch((err) => {
      console.log({err})
      }
    )};



  

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="note-item">
        <h2>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
          <p>Modified: {format( modified, 'Do MMM YYYY' )}</p>
        <button name='delete' onClick={this.handleDelete}>Delete</button>
      </div>
    )
  }
}


export default Note;
