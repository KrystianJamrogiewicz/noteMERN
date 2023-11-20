import React, { useState } from "react";

export default function EditNote(props) {

    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.body);

    const chabgeTitleHandler = event => {
        const value = event.target.value;
        setTitle(value);
    }

    const chabgeDescriptionHandler = event => {
        const value = event.target.value;
        setDesc(value);
    }
    const editNote = () => {
        const note = {
            title: title,
            body: desc,
            _id: props._id
        };
        props.onEdit(note);
    }
    
    return (
        <div className="note">
                <label>Tytuł notatki </label>
                <input type="text" 
                value={title}
                onChange={chabgeTitleHandler}/>

                <label>Opis notatki </label>
                <input type="text"
                value={desc}
                onChange={chabgeDescriptionHandler}/>

                <button onClick={() => editNote()}>Zapisz</button>

            </div>
    );
}