import { useState, useMemo } from "react";

export const usePagination = (data = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const maxPage = Math.ceil(data.length / itemsPerPage);

    const currentData = useMemo(() => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }, [data, currentPage, itemsPerPage]);

    const next = () => setCurrentPage((page) => Math.min(page + 1, maxPage));
    const prev = () => setCurrentPage((page) => Math.max(page - 1, 1));
    const jump = (page) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(Math.min(pageNumber, maxPage));
    };

    return { currentData, currentPage, maxPage, next, prev, jump };
};