// W tym pliku znajdują się ustawienia dla pojedynczej notatki

import React, { useState } from "react";

function Note(props) {

    const [showDesc, setShowDesc] = useState(false); //Chowany opis notatek

    const toggleDesc = () => {
        setShowDesc(!showDesc); // Zmienienie funkcji na odwrotność aktualnej, aby pokazywać i chować opis
        
    }

    const editHandler = () => {
        props.onEdit({ 
            title: props.title, 
            body: props.body, 
            _id: props._id
        });
    }
    return (
        <div className="note">
            <p onClick={() => toggleDesc()}>{props.title}</p>
            {showDesc && (
                <div className="description">{props.body}</div>
            )}
            <button onClick={editHandler}>Edytuj</button>
            <button 
            className="delete" 
            onClick={() => props.onDelete(props._id)}>Usuń</button>
        </div>
    );
}

export default Note;