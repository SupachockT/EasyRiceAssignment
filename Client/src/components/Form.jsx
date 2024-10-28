import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import useApi from "../api/apiContext";
import useSubmitData from "../hooks/useSubmitData";

import Input from "../sub-components/Input";
import Select from "../sub-components/Select";
import FileInput from "../sub-components/FileInput";
import OptionInput from "../sub-components/OptionsInput";
import DateTimeInput from "../sub-components/DateTimeInput";
import TextArea from "../sub-components/TextArea";

export default function Form() {
    const { standards } = useApi();
    const standardOptions = standards.data || [];
    const navigate = useNavigate();

    const mutation = useSubmitData();

    const initialFormData = {
        name: "",
        selectedStandard: "",
        file: null, // Store actual file here
        price: "",
        samplingPoints: {
            frontEnd: false,
            backEnd: false,
            other: false,
        },
        samplingDate: null,
        note: "",
    };
    const [formData, setFormData] = useState(initialFormData);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                samplingPoints: { ...prev.samplingPoints, [name]: checked },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) setFormData((prev) => ({ ...prev, file: file })); // Store file here
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d{0,2}$/;

        if (regex.test(value) && (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100000))) {
            setFormData((prev) => ({ ...prev, price: value }));
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("standard", formData.selectedStandard);
        data.append("file", formData.file);
        data.append("price", formData.price);
        data.append("samplingPoints", JSON.stringify(formData.samplingPoints));
        data.append("samplingDate", formData.samplingDate);
        data.append("note", formData.note);

        mutation.mutate(data, {
            onSuccess: (res) => {
                console.log("Data submitted successfully");

                const historyId = res.data.id;
                sessionStorage.setItem("historyId", historyId);

                handleReset();
                navigate('/result');
            },
            onError: (error) => {
                console.error("Error submitting data:", error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 border rounded-md shadow-lg w-3/12 bg-white">
            <Input
                LabelName={"Name*"}
                Id="name"
                Placeholder=""
                Value={formData.name}
                isRequired={true}
                OnChange={handleChange}
                name="name"
            />
            <Select
                Id={"standard"}
                options={standardOptions}
                value={formData.selectedStandard}
                onChange={(e) => setFormData({ ...formData, selectedStandard: e.target.value })}
            />
            <FileInput
                FileName={formData.file ? formData.file.name : ""}
                Ref={fileInputRef}
                OnChange={handleFileChange}
                OnClick={() => fileInputRef.current.click()}
            />
            <hr className="my-4 border-gray-300" />
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
            <TextArea
                Id={"note"}
                value={formData.note}
                onChange={handleChange}
                name="note"
            />
            <div className="flex justify-end gap-3 basis-10">
                <button type="submit" className="bg-green-500 text-white rounded hover:bg-green-700 px-6">
                    Submit
                </button>
                <button type="button" className="bg-red-500 text-white rounded hover:bg-red-700 px-6" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </form>
    );
}