import React, { Component } from 'react';
import ApiContext from '../../ApiContext';
import './AddFolder.css';

export default class AddFolder extends Component {
    state = {
        folderName: ''
    }
    static contextType = ApiContext;

   setFolder = (name) => {
        console.log(name)
        this.setState({folderName: name}) 
}

   handleFolder = (e) => {
       e.preventdefault();
       const newFolderName = this.context.addFolderName
       newFolderName(this.state.folderName)

       let nameToJson = JSON.stringify({name: this.state.folderName});

       fetch("http://localhost:9090/folders",
       {method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json'}),
        body: nameToJson  
})
        .then(res => {
            console.log(res)
            if (!res.ok) {
                return res.json();
            }
        })
        .catch(err => alert (err.message))

        this.props.history.push('/');
    
   }
   render () {
       return (
           <section className='addFolderForm'>
               <h2 class='header'>Make a new folder!</h2>
               <form class='folder-farm' onSubmit={(e) => this.handleFolder(e)}>
                   <input 
                        type='text'
                        placeholder='Folder Name'
                        onChange={e => this.setFolder(e.target.value)}
                        required/>
                <button type='submit'>Submit</button>
                </form>
               </section>
       )
   }


} 

