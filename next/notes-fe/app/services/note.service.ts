import axios from "axios";
import { getCookie } from "cookies-next";

export interface NotePayload {
  title: string;
  content: string;
}

export interface Note {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface NoteResponse {
  status: string;
  data: Note[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function index(query:any): Promise<NoteResponse> {
  const token = getCookie("token");
  try {
    const { data } = await axios.get<NoteResponse>(`${API_URL}/api/notes?${query}`, {
      headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "API failed");
  }
}

export async function view(id: number): Promise<Note> {
  const token = getCookie("token");
  try {
    const { data } = await axios.get<{data:Note}>(
      `${API_URL}/api/notes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "API failed");
  }
}

export async function create(payload: NotePayload ): Promise<Note> {
  const token = getCookie("token");
  try {
    const { data } = await axios.post<Note>(
      `${API_URL}/api/notes`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "API failed");
  }
}

export async function update(id: number, payload: NotePayload ): Promise<Note> {
  const token = getCookie("token");
  try {
    const { data } = await axios.put<Note>(
      `${API_URL}/api/notes/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "API failed");
  }
}

export async function destroy(id: number): Promise<Note> {
  const token = getCookie("token");
  try {
    const { data } = await axios.delete<Note>(
      `${API_URL}/api/notes/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "API failed");
  }
}
