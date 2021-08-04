import React, { useState } from 'react';
import { questionPropsType } from './../Types/quiz_type';

const QuestionCard: React.FC<questionPropsType> = ({ question, options, callback }) => {
    // console.log(question, options)
    let[selectedAns, setSelectedAns] = useState("");
   
    const handleSelection = (ev: any) => {
        // console.log(ev.target.value)
        setSelectedAns(ev.target.value)
    }

    return (
        <div className="question-container">
            <div className="question">
                <h4>{question}</h4>
            </div>

            <form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e, selectedAns)}
                className="question-form"
            >
                {
                    options.map((opt: string, ind: number) => {
                        return (
                            <div key={ind}>
                                <label className="radio-btn">
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
                <input type="submit" className="submit-btn" />
            </form>
        </div>
    )
}

export default QuestionCard;