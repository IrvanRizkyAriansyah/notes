"use client"
import React, { useState, useEffect } from 'react'

export interface PaginationProps {
  current_page?: number;
  per_page?: number;
  total?: number;
  last_page?: number;
  onPageChange?: (page: number) => void; // tambahkan callback
}

export default function Pagination(props: PaginationProps) {
  const currentPage = props.current_page || 1;
  const perPage = props.per_page || 1;
  const total = props.total || 0;

  const [page, setPage] = useState<number>(currentPage);

  useEffect(() => {
    setPage(currentPage); 
  }, [currentPage]);

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  const lastPage = props.last_page || 1;
  const pageButtons = Array.from({ length: lastPage }, (_, i) => i + 1);

  const handlePageClick = (p: number) => {
    setPage(p);
    if (props.onPageChange) props.onPageChange(p); // panggil callback ke parent
  }

  return (
    <div className='flex justify-between items-center'>
      <p>Showing {total === 0 ? 0 : start} to {total === 0 ? 0 : end} of {total} entries</p>
      <div className="join">
        {pageButtons.map((p) => (
          <button
            key={p}
            className={`join-item btn btn-square ${page === p ? "btn-primary" : "btn-ghost"}`}
            onClick={() => handlePageClick(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
