const FileInput = ({ FileName, Ref, OnChange, OnClick }) => (
    <>
        <label className="font-bold" htmlFor="json-upload">Inspection file*</label>
        <input
            className="hidden"
            id="json-upload"
            type="file"
            accept=".json"
            ref={Ref}
            onChange={OnChange}
            required
        />

        <label
            className="border p-2 mb-4 text-gray-400 cursor-pointer"
            onClick={OnClick}
        >
            {FileName ? FileName : "upload json file"}
        </label>
    </>
);

export default FileInput;