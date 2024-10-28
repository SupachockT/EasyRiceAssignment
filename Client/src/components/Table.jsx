import React, { useState, useMemo, useRef } from 'react';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import useApi from "../api/apiContext";
import formatDate from '../helper/formatDate';
import useDelHistory from '../hooks/useDelHistory';

export default function Table({ id, fromDate, toDate }) {
    const navigate = useNavigate();
    const { history } = useApi();

    const formattedFromDate = fromDate !== null
        ? new Date(fromDate).getTime()
        : null;

    const formattedToDate = toDate !== null
        ? new Date(toDate).getTime()
        : null;

    const [selectedRows, setSelectedRows] = useState(new Set());
    const selectedRowsRef = useRef(selectedRows);

    const { loading: deleting, error: deleteError, deleteHistoryRecord } = useDelHistory();

    const columns = useMemo(
        () => [
            {
                Header: 'Select',
                accessor: 'select',
                Cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={selectedRows.has(row.original.id)}
                        onChange={(event) => {
                            event.stopPropagation(); // Prevent row click event
                            handleSelectRow(row.original.id);
                        }}
                    />
                ),
            },
            {
                Header: 'Created Date-Time',
                accessor: 'createddate',
                Cell: ({ value }) => formatDate(value),
            },
            {
                Header: 'Inspection ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Standard',
                accessor: 'standard',
            },
            {
                Header: 'Note',
                accessor: 'note',
            },
        ],
        [selectedRows]
    );

    const data = useMemo(() => {
        let filteredData = history.data ? history.data.flat() : [];

        if (id) filteredData = filteredData.filter(item => item.id == id);

        if (formattedFromDate !== null || formattedToDate !== null) {
            filteredData = filteredData.filter(item => {
                const itemDate = new Date(item.createddate).getTime();
                const isAfterFromDate = formattedFromDate ? itemDate >= formattedFromDate : true;
                const isBeforeToDate = formattedToDate ? itemDate <= formattedToDate : true;
                return isAfterFromDate && isBeforeToDate;
            });
        }

        return filteredData;
    }, [history.data, id, formattedFromDate, formattedToDate]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const handleRowClick = (id, event) => {
        if (event.target.type !== 'checkbox') {
            if (!selectedRows.has(id)) {
                sessionStorage.setItem("historyId", id);
                navigate('/result');
            }
        }
    };

    const handleSelectRow = (id) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(id)) {
            newSelectedRows.delete(id);
        } else {
            newSelectedRows.add(id);
        }
        setSelectedRows(newSelectedRows);
        selectedRowsRef.current = newSelectedRows; // Update the ref
    };

    const handleDelete = async () => {
        const idsToDelete = Array.from(selectedRows);
        console.log('Deleting rows with IDs:', idsToDelete);

        // Iterate through selected IDs and delete them
        for (const id of idsToDelete) {
            await deleteHistoryRecord(id);
        }

        // Clear selections after deletion
        setSelectedRows(new Set());
        selectedRowsRef.current.clear(); // Clear the ref as well
    };

    return (
        <div className="mt-20 mx-16">
            <button onClick={handleDelete} className="mb-4 p-2 bg-red-500 text-white rounded shadow" disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete Selected'}
            </button>
            {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
            <table {...getTableProps()} className="min-w-full bg-white">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="text-white bg-slate-700" key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="py-2 px-4 border-b text-left" key={column.id}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                onClick={(event) => handleRowClick(row.original.id, event)} // Pass the event
                                className="cursor-pointer hover:bg-green-100"
                                key={row.id}
                            >
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="py-2 px-4 border-b" key={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
