import React, { useState } from "react";

function NewNote(props) {


    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const chabgeTitleHandler = event => {
        const value = event.target.value;
        setTitle(value);
    }

    const chabgeDescriptionHandler = event => {
        const value = event.target.value;
        setDesc(value);
    }

    const addNote = () => {
        const note = {
            title: title,
            body: desc
        };
        props.onAdd(note);

        setTitle("");
        setDesc("");
        setShowForm(false);
        
    }

    return (
        showForm ? (
            <div className="note">
                <label>Tytuł notatki </label>
                <input type="text" 
                value={title}
                onChange={chabgeTitleHandler}/>

                <label>Opis notatki </label>
                <input type="text"
                value={desc}
                onChange={chabgeDescriptionHandler}/>

                <button onClick={() => addNote()}>Dodaj notatkę</button>

            </div>
        ) : (
            <button onClick={() => setShowForm(true)}>Nowa notatka</button>
        )
    );
 }

export default NewNote;