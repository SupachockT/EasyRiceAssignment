const TextLabel = ({ label, text }) => {
    return (
        <div className="flex flex-col">
            <label className="px-2 pt-2 text-gray-500">{label}</label>
            <label className="pl-4">{text}</label>
        </div>
    );
};

export default TextLabel;