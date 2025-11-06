"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useNote, useUpdateNote } from "@/app/hooks/useNotes";
import Empty from "@/app/_components/empty";
import Loading from "@/app/_components/loading";
import formatDate from "@/app/utils/formatDate";
import DetailLayout from "../../_components/detail-layout";

export default function UpdateNote() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, error } = useNote(id);
  const updateNote = useUpdateNote();

  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (data) {
      setForm({ title: data.title ?? "", content: data.content ?? "" });
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <Empty />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNote.mutate(
      { id, payload: form },
      {
        onSuccess: () => {
          alert("Note updated successfully!");
          router.push("/notes/" + id);
        },
        onError: (err: any) => {
          alert(err.message || "Failed to update note");
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
      updatedAt={formatDate(data?.updated_at ?? "")}
    />
  );
}
