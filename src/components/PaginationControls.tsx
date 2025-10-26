"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Previous */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        className={cn(
          "w-9 h-9 rounded-lg text-gray-500 border-gray-300 hover:bg-gray-100",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        ‹
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => handlePageClick(page)}
          className={cn(
            "w-9 h-9 rounded-lg transition-colors",
            page === currentPage
              ? "bg-[#0b0b19] text-white hover:bg-[#0b0b19]"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          )}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        className={cn(
          "w-9 h-9 rounded-lg text-gray-500 border-gray-300 hover:bg-gray-100",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        ›
      </Button>
    </div>
  );
};

export default Pagination;
