import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';


const NPCTable = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        // setData([
        //     {
        //         first_name: "Niruin",
        //         last_name: "Maccius",
        //         city: "Dawnstar",
        //         race: "Khajiit",
        //         weapon: "Aegisbane"
        //     }
        // ])
        (async () => {
            const results = await axios("non_playable_character_api/index", {
                params: {
                    
                }
            });
            setData(results.data)
        })();
    }, []);

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
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        { 
            columns, 
            data,
            initialState: { pageIndex: 2 },
        },
        usePagination
    )

    return (
        <>
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
                    {page.map((row, i) => {
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
            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default NPCTable;
