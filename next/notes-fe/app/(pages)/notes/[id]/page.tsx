"use client";
import Empty from "@/app/_components/empty";
import Loading from "@/app/_components/loading";
import { useDeleteNote, useNote } from "@/app/hooks/useNotes";
import formatDate from "@/app/utils/formatDate";
import { ArrowLeft2, Edit, Trash } from "iconsax-reactjs";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import DetailLayout from "../_components/detail-layout";

export default function Detail() {
    const router = useRouter()
  const params = useParams();
  const id = Number(params.id);
  const { data, isLoading, error } = useNote(id);
  const deleteNote = useDeleteNote();

  if (isLoading) return <Loading />;
  if (error) return <Empty />;

  const handleDelete = () => {
    deleteNote.mutate(id, {
      onSuccess: () => {
        alert("Delete Success!");
        router.back();
      },
    });
  };


  return (
    <DetailLayout
      title={data?.title}
      updatedAt={formatDate(data?.updated_at ?? "")}
      content={data?.content}
      onEdit={() => router.push(`update/${id}`)}
      onDelete={handleDelete}
      isDeleting={deleteNote.isLoading}
    />

  );
}
