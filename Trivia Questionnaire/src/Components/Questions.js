import React from "react"
import he from "he"
import {nanoid} from "nanoid"


export default function Questions(props) {

    function htmlOptions(options) {
        options = options.map(option => {
            let style = ""
            let selected = props.selected.find(obj => obj.id === props.id).select
            if (props.checked) {
                if (he.decode(option) === he.decode(props.correct_answer)) {
                    style = "correct"
                } else if (
                    (selected === he.decode(option)) && 
                    (selected !== he.decode(props.correct_answer))
                    ) {
                    style = "incorrect"
                } else {
                    style = "faded"
                }
            } else {
                if (selected === he.decode(option)) {
                    style = "selected"
                }
                return (
                    <button key={nanoid()} className={style} onClick={updateAnswer}>{he.decode(option)}</button>
                )
            }
            return (
                <button key={nanoid()} className={style}>{he.decode(option)}</button>
            )
        })
          return options
    }
    
    function updateAnswer(event) {
        props.update(props.id, event.target.innerText, props.correct_answer)
    }

    return (
        <main className="question-box">
            <h2 className="question">{he.decode(props.question)}</h2>
            <div className="question-options">{htmlOptions(props.options)}</div>
            {/* <h4>Correct answers: {props.correct_answer}</h4>
            <h4>Selected answers: {props.selected.find(obj => obj.id === props.id).select}</h4> */}
            <hr />
        </main>
    )
}
