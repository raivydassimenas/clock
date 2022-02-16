import './App.css';
import {useState, useEffect, useCallback} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState("25:00");
    const [startStop, setStartStop] = useState(false);

    const resetClock = () => {
        setStartStop(false);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft("25:00");
    }

    const breakDecrement = () => {
        setBreakLength(breakLength => {
            return breakLength > 1 ? breakLength - 1 : 0;
        });
    }

    const breakIncrement = () => {
        setBreakLength(breakLength => {
            return breakLength < 60 ? breakLength + 1 : 60;
        });
    }

    const sessionDecrement = () => {
        setSessionLength(sessionLength => {
            return sessionLength > 1 ? sessionLength - 1 : 0;
        });
    }

    const sessionIncrement = () => {
        setSessionLength(sessionLength => {
            return sessionLength < 60 ? sessionLength + 1 : 60;
        });
    }

    const handleStartStop = () => {
        setStartStop(!startStop);
    }

    const countdown = useCallback(() => {
        let time = timeLeft.split(":");
        if (time[1] > 0) {
            time[1]--;
        } else if (time[0] > 0) {
            time[0]--;
            time[1] = 59;
        }
        let timeString = [('00' + time[0]).slice(-2), ('00' + time[1]).slice(-2)];
        setTimeLeft(timeString.join(":"));
    }, [timeLeft]);

    useEffect(() => {
        if (startStop) {
            setTimeout(countdown,1000);
        }
    }, [startStop, countdown]);

    return (
        <div className="App">
            <div id="break-label">Break Length</div>
            <div id="session-label">Session Length</div>
            <div className="break">
                <button id="break-decrement" onClick={breakDecrement}><FontAwesomeIcon icon={solid('circle-minus')}/></button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment" onClick={breakIncrement}><FontAwesomeIcon icon={solid('circle-plus')}/></button>
            </div>
            <div className="session">
                <button id="session-decrement" onClick={sessionDecrement}><FontAwesomeIcon icon={solid("circle-minus")}/></button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment" onClick={sessionIncrement}><FontAwesomeIcon icon={solid('circle-plus')}/></button>
            </div>
            <p id="timer-label">{startStop ? "Session" : ""}</p>
            <p id="time-left">{timeLeft}</p>
            <div className="start_stop-controls">
                <button id="start_stop" onClick={handleStartStop}>{!startStop ? <FontAwesomeIcon icon={solid('play')}/> :
                    <FontAwesomeIcon icon={solid('stop')}/>}</button>
                <button id="reset" onClick={resetClock}><FontAwesomeIcon icon={solid('backward-fast')}/></button>
            </div>
        </div>
    );
}

export default App;
