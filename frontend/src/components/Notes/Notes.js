import React from "react";
import './Notes.css';
import Note from "./Note/Note";
import NewNote from "../NewNote/NewNote";
import Modal from "react-modal";
import EditNote from "../EditNote/EditNote";
import axios from "../../axios"; // Axios to biblioteka do wynonywania requestów npm i axios
import { NotificationContainer, NotificationManager } from 'react-notifications'; // Biblioteka do wyświetlania okien np o błędzie
import 'react-notifications/lib/notifications.css'; // Styl wyświetlania notyfikacji - powiadomień



class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  //Wewnątrz tego obiektu tablica będzie się odświerzać (czyli notatki znikają przy usuwaniu)
            
            notes: [


                /* Tutaj wyświetlamy notatki z backendu
                {
                    _id: 1,
                    title: "Wykompać psa",
                    body: "Wymyć psa kersherem i nawoską pastą polerską"
                },
                {
                    _id: 2,
                    title: "Zrobić zakupy",
                    body: "Kupić saletre, cukier, zapałki"
                }
                */
            ],
            

            showEditModal: false,
            editNote:{}
        };
    }

    componentDidMount() { // Funkcja reacta, ktora uruchamia sie raz gdy komponent zostanie zamontowany po załadowaniu strony
        this.fetchNotes();
    }

    // Połączenie frontendu  z backendem za pomocą axios przez api
    // Połączenie z endpiontami w api (get, post, put, delete)
    async fetchNotes() {
        // Aby działało należy uruchomić backend: cd backend, node index.js
        const res = await axios.get('/notes'); // Po kropce typ requestu w nawiasie adres endpointa
        const notes = res.data; // Zmienna przechowująca notatki z backendu we frontendzie
        this.setState({ notes });
       // console.log(res); // Test: co znajduje się w zmiennej res?
    }
    // F12 w chrome aby odpalić konsole
    // Początkowo pojawia się tam błąd gdy chcemy dostać się z frontendu na backend
    // W backendzie trzeba zainstalować: npm i cors, i przejść do pliku index.js

    async deleteNote(_id) {
       // console.log("Usuwanie notatki o id: " + _id);
        const notes = [...this.state.notes]
                        .filter(note => note._id !== _id);

        await axios.delete('/notes/' + _id);

        this.setState({notes})
    }

    async addNote(note) {
        const notes = [...this.state.notes];

        try {
            // add to backend
            const res = await axios.post('/notes', note);
            const newNote = res.data;

            // add to frontend
            notes.push(newNote);
            this.setState({ notes });
        } catch (error) {
            // Do wyświetlenia błędu potrzebny jest dodatek: react-notifications, npm install --save react-notifications
            // Ta funkcja ma możliwośc wyświetlania: info, success, warning, error
            NotificationManager.error(error.response.data.message);
            // console.log(error.response.data);
        }
    }

    async editNote(note) {
        const notes = [...this.state.notes];

        try {
            await axios.put('/notes/' + note._id, note);

            const index = notes.findIndex(item => item._id === note._id);
            if (index >= 0) {
                notes[index] = note;
                this.setState({ notes });
            }
            this.toggleModal(); // Fukkcja chowająca okno
        } catch (error) {
            NotificationManager.error(error.response.data.message);
        }
    }

    toggleModal = () => {
        this.setState({
            showEditModal: !this.state.showEditModal 
            });
    }

    editNoteHandler = (note) => {
        this.toggleModal();
        this.setState({ editNote: note });
    }




    render() {
        
        return (
            <div>

                { <NotificationContainer /> 
                /* Miejsce w którym funkcja wklei kod dla pojawiania się notyfikacji (powiadomień np o błędzie), 
                miejsce jest dowolne, to kod będzie ustalał faktyczne położenie wyskakującego okna*/}

                <p>Moje notatki</p>

                <NewNote
                    onAdd={(note) => this.addNote(note)} />

                <Modal 
                   // className="modal" 
                     appElement={document.getElementById('root') || undefined}
                    // onRequestClose={this.closeFoodModal} 
                    
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj notatke" >
                    <EditNote
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        _id={this.state.editNote._id}
                        onEdit={note => this.editNote(note)} />
                        <button 
                            onClick={() => this.toggleModal()}>Anuluj</button>

                </Modal>

                {this.state.notes.map(note => (
                    <Note 
                        key={note._id} // Każdy element pętli powinien mieć unikalny klucz
                        title={note.title} 
                        body={note.body}
                        _id={note._id} 
                        onDelete={(_id) => this.deleteNote(_id)}
                        onEdit={note => this.editNoteHandler(note)} />
                ))}
            </div>
        );
    }
}

export default Notes;