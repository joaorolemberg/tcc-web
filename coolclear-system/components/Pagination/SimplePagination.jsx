import React from 'react';
import {
  Pagination, PaginationItem, PaginationLink, Spinner,
} from 'reactstrap';

const SimplePagination = function b() {
  const loadingPagination = false;
  return (
    <nav aria-label="..." className="mt-3">
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        {' '}
        {loadingPagination ? (
          <PaginationItem className="align-self-center mr-3">
            <Spinner color="warning" size="sm" />
          </PaginationItem>
        ) : (
          <div />
        )}
        <PaginationItem>
          <PaginationLink style={{ color: 'green' }}>
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink style={{ color: 'green' }}>
            <i className="fas fa-angle-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export default SimplePagination;
