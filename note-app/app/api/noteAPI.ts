const API_URL = "http://192.168.100.76:3000/api/v1/";

export interface Note{
    id: Number;
    note: string;
    status: boolean;
}

interface NewNotesPayload {
    note: string;
    status: boolean;
}

export async function getNotes() {
    const requestInfo = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(`${API_URL}notes`, requestInfo);
    const notes = await response.json();
    console.log("API");
    console.log(notes);
    return notes;
}

export async function createNote(payload: NewNotesPayload) {
    const requestInfo = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    const response = await fetch(API_URL + "notes", requestInfo);
    const note = await response.json();
    return note;
}