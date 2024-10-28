import { useState } from 'react';
import SearchFilter from "../components/SearchFilter"
import Table from '../components/Table';

export default function History() {
    const [input, setInput] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    return (
        <>
            <SearchFilter input={input} setInput={setInput} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
            <Table id={input} fromDate={fromDate} toDate={toDate} />
        </>
    )
}