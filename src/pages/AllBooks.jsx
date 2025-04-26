import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:1000" 
  : import.meta.env.VITE_BACKEND_URL;

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/api/v1/get-all-books`);
      setData(response.data.data);
    };
    fetch();
  }, []);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = Data.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(Data.length / booksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>All books</h4>
      {!Data.length && <div className='w-full h-screen flex items-center justify-center'><Loader /></div>}

      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {currentBooks.map((items, i) => (
          <div key={i}><BookCard data={items} /></div>
        ))}
      </div>

      {/* Pagination controls */}
      {Data.length > booksPerPage && (
        <div className='flex justify-center items-center gap-4 mt-8 text-white'>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className='bg-yellow-500 px-4 py-2 rounded disabled:opacity-50'
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className='bg-yellow-500 px-4 py-2 rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AllBooks
