import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useHistory } from "../hooks/useHistory";
import useUpdateHistory from "../hooks/useUpdateHistory";

import Input from "../sub-components/Input";
import OptionInput from "../sub-components/OptionsInput";
import DateTimeInput from "../sub-components/DateTimeInput";
import TextBox from "../sub-components/TextBox";

export default function Edit() {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("historyId");
    const { data, isLoading: isHistoryLoading, error: historyError } = useHistory(id);
    const { history } = data || {};

    const { updateHistory, isLoading: isUpdating, error: updateError } = useUpdateHistory();

    const mapArrayToObject = (array) => ({
        frontEnd: array[0] || false,
        backEnd: array[1] || false,
        other: array[2] || false,
    });

    const [formData, setFormData] = useState({
        price: "",
        samplingPoints: {},
        samplingDate: null,
        note: "",
    });

    useEffect(() => {
        if (history) {
            setFormData({
                price: history.price || "",
                samplingPoints: mapArrayToObject(history.samplingpoints || []),
                samplingDate: history.samplingdate ? new Date(history.samplingdate) : null,
                note: history.note || "",
            });
        }
    }, [history]);

    const handleChange = (e) => {
        const { name, checked, value } = e.target;

        if (formData.samplingPoints.hasOwnProperty(name)) {
            setFormData((prev) => ({
                ...prev,
                samplingPoints: {
                    ...prev.samplingPoints,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d{0,2}$/;

        if (regex.test(value) && (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100000))) {
            setFormData((prev) => ({ ...prev, price: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            samplingPoints: [
                formData.samplingPoints.frontEnd,
                formData.samplingPoints.backEnd,
                formData.samplingPoints.other
            ],
            samplingDate: formData.samplingDate ? formData.samplingDate.toISOString() : null,
        };

        await updateHistory({ id, data: submissionData });
        if (!updateError) {
            navigate('/result');
        }
    };

    if (isHistoryLoading) return <p>Loading...</p>;
    if (historyError) return <p>Error loading history: {historyError.message}</p>;

    return (
        <div className="mt-12 flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col p-4 border rounded-md shadow-lg w-3/12 bg-white">
                <Input
                    LabelName={"Price"}
                    Id="price"
                    Placeholder="0.00"
                    Value={formData.price}
                    isRequired={true}
                    OnChange={handlePriceChange}
                    name="price"
                />
                <OptionInput
                    LabelName="Sampling Point"
                    Options={[
                        { label: "Front End", key: "frontEnd" },
                        { label: "Back End", key: "backEnd" },
                        { label: "Other", key: "other" },
                    ]}
                    SamplingPoints={formData.samplingPoints}
                    OnChange={handleChange}
                />
                <DateTimeInput
                    LabelName={"Date/Time of sampling"}
                    Selected={formData.samplingDate}
                    OnChange={(samplingDate) => setFormData({ ...formData, samplingDate })}
                />
                <TextBox
                    Id={"note"}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    name="note"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
                    disabled={isUpdating}
                >
                    {isUpdating ? "Updating..." : "Submit"}
                </button>
                <button
                    type="button"
                    className="mt-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
                    onClick={() => navigate('/result')}
                >
                    Back
                </button>
                {updateError && <p style={{ color: 'red' }}>Error: {updateError.message}</p>}
            </form>
        </div>
    );
}