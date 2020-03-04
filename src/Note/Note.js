import React from 'react';
import { Link } from 'react-router-dom';
import { FontAweseomIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import config from '../config';
import ApiContext from '../ApiContext'

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
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          Delete
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
};


export default Note;
