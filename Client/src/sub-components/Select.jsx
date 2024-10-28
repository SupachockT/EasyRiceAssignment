const Select = ({ Id, options, value, onChange }) => (
    <>
        <label className="font-bold" htmlFor={Id}>Standard*</label>
        <select
            className="border py-2 mb-4 w-full"
            id={Id}
            required
            value={value} // Bind value
            onChange={onChange} // Trigger handler on change
        >
            <option value="" disabled>Please Select Standard</option>
            {options.map((standard) => (
                <option key={standard.id} value={standard.name}>{standard.name}</option>
            ))}
        </select>
    </>
);

export default Select;
