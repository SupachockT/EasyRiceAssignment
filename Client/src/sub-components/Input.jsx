const Input = ({ LabelName, Id, Placeholder, Value, isRequired, OnChange, name }) => (
    <>
        <label className="font-bold" htmlFor={Id}>{LabelName}</label>
        <input
            className="border p-2 mb-4 outline-blue-500 ring-blue-500"
            type="text"
            id={Id}
            name={name} 
            value={Value}
            placeholder={Placeholder}
            autoComplete="off"
            required={isRequired}
            onChange={OnChange}
        />
    </>
);

export default Input;
