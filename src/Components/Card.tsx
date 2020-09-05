import React, { useState, useEffect } from 'react';
import { PropsType } from './../Types/quiz_types'


const Card: React.FC<PropsType> = ({ question, options, callback, setShowResult, totalQuestions, category }) => {

    let [selectedAns, setSelectedAns] = useState("");
    let [minutes, setMinutes] = useState(1);
    let [seconds, setSeconds] = useState(0);
    let [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);

    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);
    }

    useEffect(() => {
        let mounted = true;
        const interval = setInterval(() => {
            if (mounted) {
                if (seconds > 0) {
                    setSeconds(--seconds)
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        setShowResult(true)
                    }
                    else {
                        setMinutes(--minutes);
                        setSeconds(59)
                    }
                }
            }

        }, 1000)

        return () => {
            mounted = false;
        }

    }, [minutes, seconds, setShowResult])

    return (
        <div className="card_container">
            <h3 style={{ textAlign: 'center', fontSize: '25px', marginBottom: '10px' }}>Category: <span style={{ color: '#17898e' }}>{category}</span></h3>
            <h3 style={{ textAlign: 'left' }}>Total Questions: <span style={{ color: '#17898e' }}>{totalQuestions}</span></h3>
            <h3 style={{ textAlign: 'left' }}>Remaining Questions: <span style={{ color: '#17898e' }}>{remainingQuestions}</span></h3>
            {
                minutes === 0 && seconds <= 30 ?
                    <h3 style={{ textAlign: 'right', marginBottom: '10px' }}>Time Remaining: <span style={{ color: 'red' }}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} </span></h3> :
                    <h3 style={{ textAlign: 'right', marginBottom: '10px' }}>
                        Time Remaining: <span style={{ color: '#17898e' }}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                    </h3>
            }

            <div className="question">
                <h4 dangerouslySetInnerHTML={{__html: "Q:"+question}}></h4>
                {/* <p dangerouslySetInnerHTML={{ __html: question }}></p> */}
            </div>

            <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns, remainingQuestions, setRemainingQuestions)} className="question-form">
                {
                    options.map((opt: string, ind: number) => {
                        // console.log(opt)
                        return (
                            <div key={ind}>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="opt"
                                        required
                                        value={opt}
                                        checked={selectedAns === opt}
                                        onChange={handleSelection}
                                    />
                                    {opt}
                                </label>
                            </div>
                        )
                    })
                }
                <input type="submit" value="Next" className="submit" />
            </form>
        </div>
    )
}

export default Card;