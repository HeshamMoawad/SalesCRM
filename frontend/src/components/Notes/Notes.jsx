import React, { useState } from "react";
import "./Notes.css";
import { getDate } from "../../utils/time";
import { useNotesFetcher , saveNote } from "../../Hooks/fetchers";
import AddLogo from "../../assets/icons/add.png";

const Notes = ({ subscriptionId, isDisabled = false }) => {
    const { notes } = useNotesFetcher(subscriptionId);
    const [newNote, setNewNote] = useState("");
    return (
        <div className="notes">
            <label className="header">Notes : {notes.length}</label>
            {notes.length > 0
                ? notes.map((note) => {
                      return (
                          <div className="note">
                              <label htmlFor="note">Note : {note.note}</label>
                              <label htmlFor="by">
                                  Noted at : {getDate(note.created_at)}
                              </label>
                              <label htmlFor="name">
                                  Noted by: {note?.creator?.username}{" "}
                              </label>
                          </div>
                      );
                  })
                : null}
            {isDisabled ? null : (
                <div className="add-note">
                    <div className="create-note">
                        <label className="note">Note : </label>
                        <input
                            value={newNote}
                            onChange={(e) => {
                                setNewNote(e.target.value);
                            }}
                        />
                    </div>
                    <button className="add-btn" onClick={async(e)=>{
                        if (newNote !== ''){
                            await saveNote(subscriptionId,{note:newNote})
                        }
                    }}>
                        <img src={AddLogo} alt="..." />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notes;
