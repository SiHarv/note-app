import axios from "axios";

const API_URL = "http://192.168.100.101:3000/api/v1/";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export interface Note {
  id: number;
  note: string;
  status: boolean;
}

export interface NotePayload {
  note: string;
  status: boolean;
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get("notes");
  return response.data;
}

export const createNote = async (payload: NotePayload): Promise<Note> => {
  const response = await api.post("notes", {
    note: payload,
  });
  return response.data;
}

export const updateNote = async (
  id: number,
  payload: NotePayload
): Promise<Note> => {
  const response = await api.put(`notes/${id}`, {
    note: payload,
  });
  return response.data;
}


export const  deleteNote = async (id: number): Promise<void> => {
  await api.delete(`notes/${id}`);
}