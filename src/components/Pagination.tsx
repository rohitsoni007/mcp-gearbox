import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
}

export function ReusablePagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
}: ReusablePaginationProps) {
  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={
            currentPage === 1
              ? 'pointer-events-none opacity-50'
              : 'cursor-pointer'
          }
        />
      </PaginationItem>
    );

    // First pages
    for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Ellipsis and middle pages
    if (totalPages > boundaryCount * 2 + siblingCount * 2 + 2) {
      // Start ellipsis
      if (currentPage > boundaryCount + siblingCount + 1) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      // Sibling pages before current page
      const start = Math.max(boundaryCount + 1, currentPage - siblingCount);

      // Sibling pages after current page
      const end = Math.min(
        totalPages - boundaryCount,
        currentPage + siblingCount
      );

      // Add sibling pages
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // End ellipsis
      if (currentPage < totalPages - boundaryCount - siblingCount) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }
    } else {
      // Show all pages if not enough to warrant ellipsis
      for (let i = boundaryCount + 1; i <= totalPages - boundaryCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Last pages
    for (
      let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1);
      i <= totalPages;
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className={
            currentPage === totalPages
              ? 'pointer-events-none opacity-50'
              : 'cursor-pointer'
          }
        />
      </PaginationItem>
    );

    return items;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>{generatePaginationItems()}</PaginationContent>
    </Pagination>
  );
}
