import logo from './logo.svg';
import './App.css';

const ZIP_FILE_URL = 'http://localhost:3000/FalseAlarm.zip';

function App() {
 
  const download = () => {
    const aTag = document.createElement('a');
    aTag.href = ZIP_FILE_URL;
    aTag.setAttribute('download', 'FalseAlarm.zip');
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }

  return (
    <div className="app">
      <h1>Download False Alarm</h1>
      <b>
        False Alarm is a traffic racing game designed to be played on a gamepad/controller. The aim of the game is to dodge cars on the road while maintaining a certain speed limit
        that is constantly rising in increments. Failure to keep up or crashing into other cars results in the player exploding. There are multiple styles of cars on the road that all
        have different behaviors, and it is your job to act accordingly. The game also tracks various achievements and scores during each run and saves them to a file.
        To support False Alarm, please leave a rating and comment for feedback. This is a game programmed in XNA/Monogame using C# to demonstrate OOP, polymorphism,
        custom data structures such as linked lists and queues, and more. Thanks for checking out False Alarm!
      </b>

      <button onClick={download}>Download FalseAlarm</button>
    </div>
  );
}

export default App;
