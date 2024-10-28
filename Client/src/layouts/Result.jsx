import { useNavigate } from 'react-router-dom';
import { useHistory } from "../hooks/useHistory";
import DateLabel from "../sub-components/DateLabel";
import TextLabel from "../sub-components/TextLabel";

export default function Result() {
    const navigate = useNavigate();

    const id = sessionStorage.getItem("historyId");
    const { data, isLoading, error } = useHistory(id);
    const { history, composition, defect } = data || {};

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const samplingPoints = ['Front End', 'Back End', 'Other'];
    const activeSamplingPoints = history.samplingpoints
        .map((isActive, index) => isActive ? samplingPoints[index] : null)
        .filter(Boolean); // Remove null values

    const order = ["ข้าวเต็มเมล็ด", "ข้าวหักใหญ่", "ข้าวหักทั่วไป"];
    const sortedComposition = composition.slice().sort((a, b) => {
        return order.indexOf(a.name) - order.indexOf(b.name);
    });

    return (
        <div className="mt-10 flex justify-center gap-14">
            <div className="flex flex-col items-center gap-2">
                <img
                    className="w-72 h-96"
                    src={history.imageurl}
                    alt="Sample Image"
                    loading="lazy"
                />
                <div className="flex gap-6 items-center justify-between">
                    <button className="px-10 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition ease-in-out duration-300"
                        onClick={() => navigate('/inspection')}
                    >
                        Back
                    </button>

                    <button className="px-10 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-300"
                        onClick={() => navigate('/edit')}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div className="w-6/12 bg-gray-300 rounded shadow-md">
                <div className="m-2 bg-white flex rounded shadow-sm">
                    <div className="flex-1 pt-2 pl-2">
                        <DateLabel label="Created Date - Time" date={history.createddate} />
                        <TextLabel label="standard:" text={history.standard} />
                        <DateLabel label="Updated Date - Time" date={history.updateddate} />
                        <br />
                    </div>
                    <div className="flex-1 pt-2">
                        <TextLabel label="Inspection ID:" text={history.id} />
                        <TextLabel label="Total Sample:" text={history.totalsample + " grains"} />
                    </div>
                </div>
                <div className="m-2 bg-white flex rounded shadow-sm">
                    <div className="flex-1 pt-2 pl-2">
                        <TextLabel label="Note:" text={history.note} />
                        <DateLabel label="Sampling Date - Time" date={history.samplingdate} />
                        <br />
                    </div>
                    <div className="flex-1 pt-2">
                        <TextLabel label="Price" text={history.price} />
                        <TextLabel label="Sampling Point:" text={activeSamplingPoints.join(", ") || ""} />
                    </div>
                </div>
                <div className="m-2 rounded shadow-sm">
                    <table className="min-w-full bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="w-1/2 py-2 px-4 border-b text-left">Cpmposition</th>
                                <th className="w-1/4 py-2 px-4 border-b text-center">Length</th>
                                <th className="w-1/4 py-2 px-4 border-b text-center">Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedComposition.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b">{item.name}</td>
                                    <td className="py-2 px-4 border-b text-center">{item.length}</td>
                                    <td className="py-2 px-4 border-b text-center text-green-600">{item.actual + '%'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="m-2 rounded shadow-sm text-sm">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="w-3/4 py-2 px-4 border-b text-left">Defect Type</th>
                                <th className="w-1/4 py-2 px-4 border-b text-center">Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defect.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b">{item.name}</td>
                                    <td className="py-2 px-4 border-b text-center text-green-600">{item.actual + '%'}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="py-2 px-4 border-b">Total</td>
                                <td className="py-2 px-4 border-b text-center text-green-600">{defect.reduce((total, item) => total + parseFloat(item.actual), 0).toFixed(2) + '%'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}