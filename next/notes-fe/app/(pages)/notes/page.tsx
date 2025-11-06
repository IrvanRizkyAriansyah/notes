"use client";
import React, { useState } from "react";
import Pagination from "./_components/pagination";
import { Edit, Eye, Trash } from "iconsax-reactjs";
import { useDeleteNote, useNotes } from "../../hooks/useNotes";
import formatDate from "../../utils/formatDate";
import Loading from "@/app/_components/loading";
import Empty from "@/app/_components/empty";
import { useRouter } from "next/navigation";

export default function Notes() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useNotes(`page=${currentPage}`);

  const deleteNote = useDeleteNote();

  if (isLoading)
    return (
      <Loading/>
    );
  if (isError) return <Empty />;

  return (
    <div className="flex flex-col gap-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 text-xs opacity-60 tracking-wide">All Notes</li>

        {data?.data.length == 0 && <div className="py-5"><Empty/></div>}
        {data?.data.map((note, index) => (
          <li key={note.id} className="list-row">
            <div className="text-4xl font-thin opacity-30 tabular-nums">
              {index + 1}
            </div>
            <div></div>
            <div className="list-col-grow">
              <div>{note.title}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {formatDate(note.updated_at)}
              </div>
              <p className="truncate overflow-hidden max-w-[900px] mt-3 text-gray-400">
                {note.content}
              </p>
            </div>
            <button className="btn btn-square btn-ghost" onClick={()=>router.push('notes/'+note.id)}>
              <Eye />
            </button>
            <button className="btn btn-square btn-ghost" onClick={()=>router.push('notes/update/'+note.id)}>
              <Edit />
            </button>
            <button
              className="btn btn-square btn-ghost"
              onClick={() => {
                if (confirm("Are you sure you want to delete this note?")) {
                  deleteNote.mutate(note.id);
                  alert('Delete Success!')
                }
              }}
            >
              <Trash className="text-red-400" />
            </button>
          </li>
        ))}
      </ul>

      <Pagination
        current_page={data?.pagination.current_page}
        last_page={data?.pagination.last_page}
        per_page={data?.pagination.per_page}
        total={data?.pagination.total}
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
}
