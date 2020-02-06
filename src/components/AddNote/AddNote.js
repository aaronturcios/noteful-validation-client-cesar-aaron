import React, { Component } from 'react';
import ApiContext from '../../ApiContext';
import './AddNote.css';

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }

  state = {
    name: '',
    description: '',
    selected: null,
    check: false
  }

  static contextType = ApiContext;

  
  handleInputName = (e) => {
    this.setState({
      name: e
    });
  }

  handleInputDescription = (e) => {
    this.setState({
      description: e
    });
  }

  handleSelect = (e) => {
    console.log(e);
    this.setState({
      selected: e
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name === '') {
      alert('Enter a name!!!')
      this.setState({
        check: !this.state.check
      })
    }
    if (this.state.name) {
      console.log(`this.state.name evalled true`)
      const date = Date.now()
      const note = { name: this.state.name, content: this.state.description, folderId: this.state.selected, modified: date }
      this.context.addNote(this.state.name, this.state.description, this.state.selected, date);

      fetch("http://localhost:9090/notes", {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(note)
      })
        .then(res => {
          if (!res.ok)
            return res.json();
        })
        .catch(err => {
          console.log(err.message)
   
        }
        )
      this.props.history.push('/');
    }
  }


 

  render() {
    const { folders } = this.context

    return (

      <section className="addNoteForm">
        <h2>Add A Note</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input 
            type="text" 
            placeholder="name" 
            onChange={(input) => this.handleInputName(input.target.value)} /><br/>
          <textarea 
              placeholder="description" 
                onChange={(e => this.handleInputDescription(e.target.value))} /><br/>
          <select id='note-folder-select' onChange={(e) => this.handleSelect(e.target.value)}>
            <option value="null">...</option>
            {folders.map(folder =>
              <option key={folder.id} value={folder.id} >
                {folder.name}
              </option>
            )}
          </select><br/>
          <button type="submit">Submit</button>
        </form>
      </section>
    )
  }
}