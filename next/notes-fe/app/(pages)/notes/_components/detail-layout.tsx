"use client";
import { ArrowLeft2, Edit, Trash } from "iconsax-reactjs";
import React from "react";
import { useRouter } from "next/navigation";

interface DetailLayoutProps {
  title?: string;
  updatedAt?: string;
  content?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  isEdit?: boolean;
  form?: { title: string; content: string };
  setForm?: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function DetailLayout({
  title,
  updatedAt,
  content,
  onEdit,
  onDelete,
  isDeleting,
  isEdit = false,
  form,
  setForm,
  onSubmit,
}: DetailLayoutProps) {
  const router = useRouter();

  return (
    <div className="bg-slate-50">
      <div className="bg-white rounded-lg shadow p-5 min-h-120">
        <div className="flex justify-between items-start mb-5">
          <button className="btn btn-link ml-0 pl-0" onClick={router.back}>
            <ArrowLeft2 /> Back
          </button>

          <div className="text-center w-full">
            {isEdit ? (
              <input
                placeholder="Title"
                value={form?.title || ""}
                onChange={(e) =>
                  setForm?.((prev) => ({ ...prev, title: e.target.value }))
                }
                className="input focus:outline-0 focus:border-2 focus:border-primary rounded-lg w-1/3"
                required
              />
            ) : (
              <h1 className="text-2xl font-bold mb-1">{title}</h1>
            )}

            {updatedAt && !isEdit && (
              <p className="text-sm text-gray-500">Updated: {updatedAt}</p>
            )}
          </div>

          <div className="flex gap-3">
            {onEdit && !isEdit && (
              <button className="btn btn-square btn-ghost" onClick={onEdit}>
                <Edit />
              </button>
            )}
            {onDelete && !isEdit && (
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this item?")) {
                    onDelete();
                  }
                }}
                disabled={isDeleting}
              >
                <Trash className="text-red-400" />
              </button>
            )}
          </div>
        </div>

        <div className="divider" />

        {isEdit ? (
          <form onSubmit={onSubmit}>
            <textarea
              placeholder="Write your note here..."
              value={form?.content || ""}
              onChange={(e) =>
                setForm?.((prev) => ({ ...prev, content: e.target.value }))
              }
              className="textarea textarea-bordered focus:outline-0 focus:border-2 focus:border-primary rounded-lg w-full h-40"
              required
            />
            <div className="mt-4 flex justify-end">
              <button type="submit" className="btn btn-primary rounded-lg">
                Save Note
              </button>
            </div>
          </form>
        ) : (
          <p className="mt-5 whitespace-pre-line">{content}</p>
        )}
      </div>
    </div>
  );
}
