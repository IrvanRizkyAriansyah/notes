"use client"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { index, view, update, destroy, NotePayload, Note, NoteResponse, create } from "../services/note.service";

export function useNotes(query: string) {
  return useQuery<NoteResponse, Error>(["notes", query], () => index(query));
}

export function useNote(id: number) {
  return useQuery<Note, Error>(["note", id], () => view(id));
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation(
    ({payload}:{payload: NotePayload}) => create(payload),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["notes"]);
        queryClient.setQueryData(["note", data.id], data);
      },
    }
  );
}


export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, payload }: { id: number; payload: NotePayload }) => update(id, payload),
    {
      onSuccess: (data:any) => {
        queryClient.setQueryData(["note", data.id], data);
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number) => destroy(id),
    {
      onSuccess: (_, id) => {
        queryClient.removeQueries(["note", id]);
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );
}
