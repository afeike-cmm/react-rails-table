import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';


const NPCTable = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const pageSizes = [10, 25, 50]

    useEffect(() => {
        (async () => {
            const results = await axios("non_playable_character_api/index", {
                params: {
                    page_size: pageSize,
                    page_index: page
                }
            });
            setData(results.data.data)
            setTotalCount(results.data.total)
            const pageCount = results.data.total / pageSize
            setTotalCount(Math.ceil(pageCount))
        })();
    }, [page, pageSize]);

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    }

    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'first_name',
            },
            {
                Header: 'Last Name',
                accessor: 'last_name',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Race',
                accessor: 'race',
            },
            {
                Header: 'Weapon',
                accessor: 'weapon',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        
    } = useTable(
        { 
            columns, 
            data: data,
            
        }
    )

    return (
        <>
            <div className="mt-3">
                {/* {"Items per Page: "}
                <select onChange={handlePageSizeChange} value={pageSize}>
                    {pageSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                    ))}
                </select> */}

                <Pagination
                    className="my-3"
                    count={totalCount}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default NPCTable;
