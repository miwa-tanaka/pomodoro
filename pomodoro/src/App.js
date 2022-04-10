import './scss/index.scss';
import settingImg from './img/setting.png';
import close from './img/close.png';
import check from './img/check.png';
import up from './img/up.png';
import down from './img/down.png';
import { useState, useEffect, useRef } from 'react'

import { CircularProgressbar, buildStyles,  CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { clear } from '@testing-library/user-event/dist/clear';

function App() {
  const [pomodoro, setPomodoro] = useState(25);
  const [short, setShort] = useState(5);
  const [long, setLong] = useState(15);
  const [pathColor, setPathColor] = useState('red');
  const [time, setTime] = useState(25);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const red = "#F87070";
  const blue = "#70F3F8";
  const purple = "#D881F8";

  useEffect(() => {
    changeStyle()
  }, []);

  const changeMode = () => {
    preTime();
  }

  useEffect(() => {
    secondsLeftRef.current = time * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        setIsPaused(true);
        return
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  function tick () {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  const totalSeconds = time * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if  (seconds < 10) {
    seconds = '0'+seconds;
  }

  const openSettings = () => {
    const settings = document.getElementById("settings");
    settings.style.display = "block";
  }

  const closeSettings = () => {
    const settings = document.getElementById("settings");
    settings.style.display = "none";
  }

  const incresePomodoro = () => {
    if (pomodoro > 0 && pomodoro < 60) {
      setPomodoro(pomodoro + 1)
    }
  }

  const decresePomodoro = () => {
    if (pomodoro > 1 && pomodoro < 61) {
      setPomodoro(pomodoro - 1)
    }
  }

  const increseShortbreak = () => {
    if (short > 0 && short < 60) {
      setShort(short + 1)
    }
  }

  const decreseShortbreak = () => {
    if (short > 1 && short < 61) {
      setShort(short - 1)
    }
  }

  const increseLongbreak = () => {
    if (long > 0 && long < 60) {
      setLong(long + 1)
    }
  }

  const decreseLongbreak = () => {
    if (long > 1 && long < 61) {
      setLong(long - 1)
    }
  }

  const preTime = () => {
    const options = document.getElementsByName('options');
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        if (options[i].id === "pomodoro") {
          setTime(pomodoro);
        } else if (options[i].id === "shortbreak") {
          setTime(short);
        } else {
          setTime(long);
        }
      }
    }
  }

  const changeStyle = () => {
    const font = document.getElementsByName('font');
    for (let i = 0; i < font.length; i++){
      if (font[i].checked) {
        if (font[i].id === "kumbh-sans") {
          document.documentElement.style.setProperty('--picked-font', 'Kumbh Sans, sans-serif');
        } else if (font[i].id === "roboto-slab") {
          document.documentElement.style.setProperty('--picked-font', 'Roboto Slab, serif');
        } else {
          document.documentElement.style.setProperty('--picked-font', 'Space Mono, monospace');
        }
      }
    }

    const color = document.getElementsByName('color');
    for (let z = 0; z < color.length; z++){
      if (color[z].checked) {
        if (color[z].id === "red") {
          setPathColor(red);
          document.documentElement.style.setProperty('--picked-color', '#F87070');
        } else if (color[z].id === "blue") {
          setPathColor(blue);
          document.documentElement.style.setProperty('--picked-color', '#70F3F8');
        } else {
          setPathColor(purple);
          document.documentElement.style.setProperty('--picked-color', '#D881F8');
        }
      }
    }
  }

  const applySettings = () => {
    const settings = document.getElementById("settings");
    settings.style.display = "none";
    changeStyle();
    changeMode();
  }

  return (
    <div className='main-body'>
      <header>
        <h1>pomodoro</h1>
      </header>
      <main>
        <section className='options'>
          <div onChange={changeMode}>
            <input type="radio" id="pomodoro" name="options" defaultChecked />
            <label htmlFor="pomodoro">pomodoro</label>
            <input type="radio" id="shortbreak" name="options"  />
            <label htmlFor="shortbreak">short break</label>
            <input type="radio" id="longbreak" name="options"  />
            <label htmlFor="longbreak">long break</label>
          </div>
        </section>

        <section className='timer'>
          <div className='timer-bg'>
            <CircularProgressbarWithChildren strokeWidth={4} value={percentage} styles={buildStyles({
              rotation: 1,
              strokeLinecap: 'round',
              pathColor: pathColor,
              trailColor: 'transparent'
              })}>
              {isPaused
                ? <button className='isPaused' onClick={() => { setIsPaused(false); isPausedRef.current = false; }}>
                    <h1 id="number">{minutes + ':' + seconds}</h1>
                    <span>PLAY</span>
                  </button>
                : <button className='isPaused' onClick={() => { setIsPaused(true); isPausedRef.current = true; }}>
                    <h1 id="number">{minutes + ':' + seconds}</h1>
                    <span>PAUSE</span>
                  </button>
              }
            </CircularProgressbarWithChildren>
          </div>
        </section>

        <section className='setting-btn'>
          <button onClick={openSettings}>
            <img src={settingImg} alt="setting button" />
          </button>
        </section>

        <section id="settings">
          <div className='settings-inner'>
            <div className='settings-ttl'>
              <h2>Settings</h2>
              <button onClick={closeSettings}>
                <img src={close} alt="close button" />
              </button>
            </div>
            <hr />
            <div className='settings-details'>
              <h4>TIME (MINUTES)</h4>
              <div className='times'>
                <div className='times-container'>
                  <span className='times-ttl'>pomodoro</span>
                  <div className='times-counts'>
                    <span className='times-num'>{pomodoro}</span>
                    <div className='times-btn'>
                      <button onClick={incresePomodoro}>
                        <img src={up} alt="count up" />
                      </button>
                      <button onClick={decresePomodoro}>
                        <img src={down} alt="count down" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='times-container'>
                  <span className='times-ttl'>short break</span>
                  <div className='times-counts'>
                    <span className='times-num'>{short}</span>
                    <div className='times-btn'>
                      <button onClick={increseShortbreak}>
                        <img src={up} alt="count up" />
                      </button>
                      <button onClick={decreseShortbreak}>
                        <img src={down} alt="count down" />
                      </button>
                    </div>
                   </div>
                </div>
                <div className='times-container'>
                  <span className='times-ttl'>long break</span>
                  <div className='times-counts'>
                    <span className='times-num'>{long}</span>
                    <div className='times-btn'>
                      <button onClick={increseLongbreak}>
                        <img src={up} alt="count up" />
                      </button>
                      <button onClick={decreseLongbreak}>
                        <img src={down} alt="count down" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className='settings-font'>
                <h4>FONT</h4>
                <div className='fonts'>
                  <span>
                    <input type="radio" name="font" id="kumbh-sans" defaultChecked/>
                    <label htmlFor='kumbh-sans' className='kumbh-sans'>Aa</label>
                  </span>
                  <span>
                    <input type="radio" name="font" id="roboto-slab" />
                    <label htmlFor='roboto-slab' className='roboto-slab'>Aa</label>
                  </span>
                  <span>
                    <input type="radio" name="font" id="space-mono" />
                    <label htmlFor='space-mono' className='space-mono'>Aa</label>
                  </span>
                </div>
              </div>
              <hr />
              <div className='settings-color'>
                <h4>COLOR</h4>
                <div className='colors'>
                  <span>
                    <input type="radio" name="color" id="red" defaultChecked/>
                    <label htmlFor='red' className='red'>
                      <img src={check} alt="check button" />
                    </label>
                  </span>
                  <span>
                    <input type="radio" name="color" id="blue" />
                    <label htmlFor='blue' className='blue'>
                      <img src={check} alt="check button" />
                    </label>
                  </span>
                  <span>
                    <input type="radio" name="color" id="purple" />
                    <label htmlFor='purple' className='purple'>
                      <img src={check} alt="check button" />
                    </label>
                  </span>
                </div>
              </div>
            </div>
            <button className='apply-btn' onClick={applySettings}>Apply</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
