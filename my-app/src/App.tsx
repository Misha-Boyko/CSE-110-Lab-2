import './App.css';
import { useEffect, useState } from "react"; 
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme, { ClickCounter } from './hooksExercise';
import { likeButtonThemes } from './buttonThemeContext'; 
import { LikeButton } from './LikeButton';
import { ThemeContext, themes } from './themeContext'; // adjust the import path as necessary



function App() {
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const [favoriteList, setFavoriteList] = useState([])
  const [data, setData] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(themes.dark);


  useEffect(() => {
    setData(favoriteList);
    console.log(data);
  }, [favoriteList]);

  const createNoteHandler = (e:any) => {
    e.preventDefault();

    setCreateNote({ ...createNote, id: dummyNotesList.length });
    const newNotesList = [...notes, createNote];
    setNotes(newNotesList);

  }

  const onNoteChange = (e:any, noteID:Note["id"]) => {
    const newTitle = e.target.innerHTML;
    setSelectedNote(notes[noteID]);

    // Inplace edit the note in the Note array (just edit the title)
    setNotes((notes) =>
      notes.map((note) =>
        note.id === noteID ? { ...note, title: newTitle } : note
      )
    );
  };

  const onDelete = (noteID: Note["id"]) => {
    const newNotesList = notes.filter((item: any) => item.id !== noteID);
    setNotes(newNotesList);
  }

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  }

  return (
    <div className='app-container'>

      <form 
        className="note-form" 
        onSubmit={createNoteHandler}
      >
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
              onFocus={(event) => event.target.style.backgroundColor = "#e0f7fa"}  // Light blue background on focus
              onBlur={(event) => event.target.style.backgroundColor = ""}  // Reset background on blur
            required>
          </input>
        </div>

        <div>
          <textarea
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
              onFocus={(event) => event.target.style.backgroundColor = "#e0f7fa"}  // Light blue background on focus
              onBlur={(event) => event.target.style.backgroundColor = ""}  // Reset background on blur
            required>
          </textarea>
        </div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            style={{ background: currentTheme.foreground, color: currentTheme.background }}            >
            <div className="notes-header">
              <LikeButton title={note.title} favList={favoriteList} setFavList={setFavoriteList}/>
              <button onClick={() => onDelete(note.id)}>x</button>
            </div>
            <h2 contentEditable="true" onInput={(e) => onNoteChange(e, note.id)}> {note.title} </h2>
            <p contentEditable="true"> {note.content} </p>
            <p contentEditable="true"> {note.label} </p>
          </div>
        ))}
        <h2>List of favorites:</h2>
        <div>
          {data.map(txt => <p>{txt}</p>)}
        </div>
      </div>

      <button 
        onClick={toggleTheme}
        style={{
          width: "200px", 
          height: "100px" 
        }}
      >
        Toggle Theme
      </button>

    </div>
  );
}

export default App;

