import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListMain from "./MainPageList/MainPageList";
import MainPageNav from "./components/MainPageNav/MainPageNav";
import NotePageSidebar from "./components/NotePage/NotePageSidebar";
import NotePageMain from "./components/NotePage/NotePageMain";
import AddNote from "./components/AddNote/AddNote";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from "./ApiContext";
import AddFolder from "./components/AddFolder/AddFolder";
import ErrorPage from './CatchError';
import "./App.css";
import config from '../config';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={MainPageNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageSidebar} />
        <Route path="/add-folder" component={NotePageSidebar} />
        <Route path="/add-note" component={NotePageSidebar} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };
    return (
      <ApiContext.Provider value={value}>
          <div className="App">
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
            <header className="App__header">
              <h1>
                <Link to="/">Noteful</Link>{" "}
                <FontAwesomeIcon icon="check-double" />
              </h1>
            </header>
            <main className="App__main"><ErrorPage>{this.renderMainRoutes()}</ErrorPage></main>
          </div>
      </ApiContext.Provider>
    );
  }
}

export default App;

