import './App.css';
import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25);
    const [startStop, setStartStop] = useState(false);

    return (
        <div className="App">
            <div id="break-label">Break Length</div>
            <div id="session-label">Session Length</div>
            <div className="break">
                <button id="break-decrement"><FontAwesomeIcon icon={solid('circle-minus')}/></button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment"><FontAwesomeIcon icon={solid('circle-plus')}/></button>
            </div>
            <div className="session">
                <button id="session-decrement"><FontAwesomeIcon icon={solid("circle-minus")}/></button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment"><FontAwesomeIcon icon={solid('circle-plus')}/></button>
            </div>
            <p id="timer-label">{startStop ? "Session" : ""}</p>
            <p id="time-left">{timeLeft}</p>
            <div className="start_stop-controls">
                <button id="start_stop">{!startStop ? <FontAwesomeIcon icon={solid('play')}/> :
                    <FontAwesomeIcon icon={solid('stop')}/>}</button>
                <button id="reset"><FontAwesomeIcon icon={solid('backward-fast')}/></button>
            </div>

        </div>
    );
}

export default App;
