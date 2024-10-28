const OptionInput = ({ LabelName, Options, SamplingPoints, OnChange }) => (
    <>
        <label className="font-bold">{LabelName}</label>
        <div className="flex gap-8 mb-4">
            {Options.map((option) => (
                <label key={option.key} className="flex items-center p-2">
                    <input
                        type="checkbox"
                        name={option.key}
                        checked={SamplingPoints[option.key]}
                        onChange={OnChange}
                    />
                    <span className="ml-2">{option.label}</span>
                </label>
            ))}
        </div>
    </>
);

export default OptionInput