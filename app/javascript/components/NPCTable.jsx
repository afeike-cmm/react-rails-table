import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';


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
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
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
    )
}

export default NPCTable;
