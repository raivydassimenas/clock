import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState("00:10");
    const [startStop, setStartStop] = useState(false);
    const [timerLabel, setTimerLabel] = useState("Pause");
    const [isBreak, setBreak] = useState(false);
    // const [audio] = useRef(document.getElementById("#beep").src);

    const resetClock = () => {
        setStartStop(false);
        setBreak(false);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft("25:00");
        document.getElementById("#beep").pause();
        document.getElementById("#beep").currentTime = 0;
    }

    const breakDecrement = () => {
        setBreakLength(breakLength => {
            return breakLength > 1 ? breakLength - 1 : 1;
        });
    }

    const breakIncrement = () => {
        setBreakLength(breakLength => {
            return breakLength < 60 ? breakLength + 1 : 60;
        });
    }

    const sessionDecrement = () => {
        setSessionLength(sessionLength => {
            return sessionLength > 1 ? sessionLength - 1 : 1;
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
            let time = timeLeft.split(":").map((item) => parseInt(item));
            if (time[1] > 0) {
                time[1]--;
            } else if (time[0] > 0) {
                time[0]--;
                time[1] = 59;
            } else if (time[1] === 0 && time[0] === 0) {
                if (isBreak) {
                    setTimeLeft([('00' + sessionLength).slice(-2), '00'].join(':'));
                } else {
                    setTimeLeft([('00' + breakLength).slice(-2), '00'].join(':'))
                }
                setBreak(!isBreak);
                // audio.play();
            }
            let timeString = [('00' + time[0]).slice(-2), ('00' + time[1]).slice(-2)];
            setTimeLeft(timeString.join(':'));
    }, [timeLeft, isBreak, breakLength, sessionLength]);

    useEffect(() => {
        if (startStop) {
            setTimerLabel(isBreak ? "Break" : "Session");
            setTimeout(countdown, 1000)
        } else {
            setTimerLabel("Pause");
        }
    }, [startStop, countdown, isBreak]);

    return (
        <div className="App">
            <div id="break-label">Break Length</div>
            <div id="session-label">Session Length</div>
            <div className="break">
                <button id="break-decrement" onClick={breakDecrement}><FontAwesomeIcon
                    icon={solid('circle-minus')} /></button>
                <span id="break-length">{breakLength}</span>
                <button id="break-increment" onClick={breakIncrement}><FontAwesomeIcon icon={solid('circle-plus')} />
                </button>
            </div>
            <div className="session">
                <button id="session-decrement" onClick={sessionDecrement}><FontAwesomeIcon
                    icon={solid("circle-minus")} /></button>
                <span id="session-length">{sessionLength}</span>
                <button id="session-increment" onClick={sessionIncrement}><FontAwesomeIcon
                    icon={solid('circle-plus')} /></button>
            </div>
            <audio id="beep" src="./beep-01a.mp3"/>
            <p id="timer-label">{timerLabel}</p>
            <p id="time-left">{timeLeft}</p>
            <div className="start_stop-controls">
                <button id="start_stop" onClick={handleStartStop}>{!startStop ?
                    <FontAwesomeIcon icon={solid('play')} /> :
                    <FontAwesomeIcon icon={solid('stop')} />}</button>
                <button id="reset" onClick={resetClock}><FontAwesomeIcon icon={solid('backward-fast')} /></button>
            </div>
        </div>
    );
}

export default App;
