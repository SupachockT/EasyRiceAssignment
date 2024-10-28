const TextArea = ({ Id, value, onChange, name }) => (
    <>
        <label className="font-bold" htmlFor={Id}>Note</label>
        <textarea
            className="border p-2 mb-4"
            id={Id}
            name={name} // Add this line
            rows="2"
            value={value} // Bind the value
            onChange={onChange} // Bind the onChange
        />
    </>
);

export default TextArea;
