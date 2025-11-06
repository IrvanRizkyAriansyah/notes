"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useNote, useCreateNote } from "@/app/hooks/useNotes";
import Empty from "@/app/_components/empty";
import Loading from "@/app/_components/loading";
import formatDate from "@/app/utils/formatDate";
import DetailLayout from "../_components/detail-layout";

export default function CreateNote() {
  const router = useRouter();
  const params = useParams();

  const createNote = useCreateNote();

  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNote.mutate(
      { payload: form },
      {
        onSuccess: () => {
          alert("Note created successfully!");
          router.push("/notes/");
        },
        onError: (err: any) => {
          alert(err.message || "Failed to create note");
        },
      }
    );
  };

  return (
    <DetailLayout
      isEdit
      form={form}
      setForm={setForm}
      onSubmit={handleSubmit}
    />
  );
}
