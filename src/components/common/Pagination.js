import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const pages = [];
    let skipped = false;
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 6) {
        if (i < 4 || i === totalPages - 1 || i === totalPages) pages.push(i);
        else {
          if (!skipped) {
            pages.push("...");
            skipped = true;
          }
        }
      } else pages.push(i);
    }
    setPageNumbers(pages);
  }, [totalPages]);

  return (
    <nav className="flex">
      <ul className="flex pagination justify-center items-center">
        <li key={"back"} className={`mx-1`}>
          <button
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage)}
          >
            <ChevronLeftIcon sx={{ marginBottom: 0.3 }} />
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`mx-1 ${
              currentPage + 1 === page ? "text-textBlue" : ""
            }`}
          >
            <button
              disabled={typeof page !== "number"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li key={"back"} className={`mx-1`}>
          <button
            disabled={currentPage + 1 === totalPages}
            onClick={() => onPageChange(currentPage + 2)}
          >
            <NavigateNextIcon sx={{ marginBottom: 0.3 }} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
