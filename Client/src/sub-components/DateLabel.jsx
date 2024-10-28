const DateLabel = ({ label, date }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yyyy}/${mm}/${dd} - ${hh}:${min}:${ss}`;
    };

    return (
        <div className="flex flex-col">
            <label className="px-2 pt-2 text-gray-500">{label}</label>
            <label className="pl-4">{formatDate(date)}</label>
        </div>
    );
};

export default DateLabel;