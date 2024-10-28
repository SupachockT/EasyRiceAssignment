import DatePicker from 'react-datepicker';
import SearchIcon from '../assets/search.png';

export default function SearchFilter({ input, setInput, fromDate, setFromDate, toDate, setToDate }) {
    const clearFilter = () => {
        setFromDate(null);
        setToDate(null);
    }

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {/* Search Bar */}
            <div className="relative w-[500px] drop-shadow-lg">
                <input
                    className="rounded-full h-10 w-full pl-10 pr-4 focus:outline-none focus:ring-0"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder=" Search with id"
                />
                <img
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    src={SearchIcon}
                    alt="Search"
                />
            </div>
            {/* Buttons */}
            <div className="mt-6 flex items-center gap-10">
                <button
                    className=" h-10 w-24 flex items-center justify-center bg-slate-600 text-white rounded border-red-300 hover:border-2"
                    onClick={clearFilter}
                >
                    <span className="text-sm">Clear filter</span>
                </button>
            </div>
            {/* Filter fields */}
            <div className="mt-6 flex gap-4">
                <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    dateFormat="yyyy/MM/dd HH:mm:ss"
                    className="h-10 w-full rounded border p-2 pr-10"
                    placeholderText="From date"
                />
                <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    dateFormat="yyyy/MM/dd HH:mm:ss"
                    className="h-10 w-full rounded border p-2 pr-10"
                    placeholderText="To date"
                />
            </div>
        </div>
    );
}
