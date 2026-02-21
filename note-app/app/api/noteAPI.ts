const API_URL = "http://192.168.100.76:3000/api/v1/";

export interface Note {
  id: number;
  note: string;
  status: boolean;
}

export interface NotePayload {
  note: string;
  status: boolean;
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetch(`${API_URL}notes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function createNote(payload: NotePayload): Promise<Note> {
  const response = await fetch(`${API_URL}notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: payload }),
  });
  return await response.json();
}

export async function updateNote(id: number, payload: NotePayload): Promise<Note> {
  const response = await fetch(`${API_URL}notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: payload }),
  });
  return await response.json();
}