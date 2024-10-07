import './App.css';
import { useEffect, useState } from "react"; 
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme, { ClickCounter } from './hooksExercise';
import { likeButtonThemes } from './buttonThemeContext'; 
import { LikeButton } from './LikeButton';


function App() {

  const [favoriteList, setFavoriteList] = useState([])
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(favoriteList);
    console.log(data);
  }, [favoriteList]);


return (
  <div className='app-container'>
    <ToggleTheme />
    <form className="note-form">
      <div><input placeholder="Note Title"></input></div>

      <div><textarea></textarea></div>

      <div><button type="submit">Create Note</button></div>
    </form>
    <div className="notes-grid">
      {dummyNotesList.map((note) => (
        <div
          key={note.id}
          className="note-item">
          <div className="notes-header">
            <LikeButton title={note.title} favList={favoriteList} setFavList={setFavoriteList}/>
            <button>x</button>
          </div>
          <h2> {note.title} </h2>
          <p> {note.content} </p>
          <p> {note.label} </p>
        </div>
      ))}
      <h2>List of favorites:</h2>
      <div>
        {data.map(txt => <p>{txt}</p>)}
      </div>

    </div>

  </div>

);
}

export default App;