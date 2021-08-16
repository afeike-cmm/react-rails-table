import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import BTable from 'react-bootstrap/Table';
import PropTypes from 'prop-types'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

const Table = ({columns, data}) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data
    })

    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
            <thead>
                {headerGroups.map((group) => (
                <tr {...group.getHeaderGroupProps()}>
                    {group.headers.map((col) => (
                    <th {...col.getHeaderProps()}>{col.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody>
                {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} >
                    {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                )
                })}
            </tbody>
        </BTable>
    )
}

Table.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
}

const NPCTable = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [filters, setFilters] = useState({})

    const pageSizes = [10, 25, 50]

    useEffect(() => {
        (async () => {
            const results = await axios("non_playable_character_api/index", {
                params: {
                    page_size: pageSize,
                    page_index: page,
                    ...filters
                }

            });
            setData(results.data.data)
            setTotalCount(results.data.total)
            const pageCount = results.data.total / pageSize
            setTotalCount(Math.ceil(pageCount))
        })();
    }, [page, pageSize, filters]);

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handleFilterChange = (e, filterKey) => {
        const value = e.target.value || "";
        let newFilters = {...filters, ...{[filterKey]: value}}
        setFilters(newFilters);
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

    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     prepareRow,
    //     rows,  
    // } = useTable(
    //     { 
    //         columns, 
    //         data: data,
    //     }
    // )

    return (
        <>
            <div>
                <input 
                    value={filters.firstName}
                    onChange={(e) => handleFilterChange(e, "firstName")}
                    placeholder={"Search first name"}
                />
                <input 
                    value={filters.lastName}
                    onChange={(e) => handleFilterChange(e, "lastName")}
                    placeholder={"Search last name"}
                />
            </div>
            {/* <table {...getTableProps()}>
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
            </table> */}
            <div className="table-responsive">
                <Table columns={columns} data={data} />
            </div>
            <div className="mt-3">
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
        </>
    )
}

export default NPCTable;
