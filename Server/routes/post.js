const { pool, postRouter, multer } = require("./routes");
const { fetchSubStandards, insertComposition, insertDefect, processGrains, calculateTypePercentage } = require("../helper/postHistory")

const upload = multer();

function formatDate(date) {
    return date.toISOString().replace("T", " ").substring(0, 19);
}

postRouter.post("/history", upload.single("file"), async (req, res) => {
    try {
        const { body: data, file } = req;
        const grains = file?.mimetype === "application/json" ? JSON.parse(file.buffer.toString("utf-8")).grains : [];
        const imageURL = file?.mimetype === "application/json" ? JSON.parse(file.buffer.toString("utf-8")).imageURL : [];
        const totalSample = grains.length;

        if (totalSample === 0) return res.status(400).send("Received file is not a JSON file or has no grains.");

        const createdDate = formatDate(new Date());
        const note = data.note;
        const samplingDate = new Date(data.samplingDate);
        const price = parseFloat(data.price);
        const samplingPointsArray = [
            JSON.parse(data.samplingPoints).frontEnd,
            JSON.parse(data.samplingPoints).backEnd,
            JSON.parse(data.samplingPoints).other
        ];

        // Insert history record
        const historyQuery = `
            INSERT INTO history (createdDate, standard, totalSample, updatedDate, name, note, samplingDate, price, samplingPoints, imageURL)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::BOOLEAN[], $10)
            RETURNING id;
        `;
        const { rows } = await pool.query(historyQuery, [
            createdDate, data.standard, totalSample, createdDate, data.name, note, samplingDate, price, samplingPointsArray, imageURL
        ]);
        const historyId = rows[0].id;

        // Fetch sub-standard criteria
        const subStandards = await fetchSubStandards(data.standard);

        for (const subStandard of subStandards) {
            const matchingGrains = processGrains(grains, subStandard);
            const percentage = totalSample > 0 ? (matchingGrains.length / totalSample) * 100 : 0;

            let lengthRange;
            if (subStandard.maxlength === 99) lengthRange = `${subStandard.conditionmin === 'GT' ? '>' : '>='}${subStandard.minlength}`;
            else lengthRange = `${subStandard.minlength}-${subStandard.maxlength}`;

            await insertComposition(historyId, subStandard.name, lengthRange, percentage);
        }

        //insert into infect table
        const typePercentages = calculateTypePercentage(grains);
        for (const [type, percentage] of Object.entries(typePercentages)) {
            await insertDefect(historyId, `${type}`, percentage);
        }

        console.log("Inserted record ID:", historyId);
        res.status(201).json({ message: "Data inserted successfully", id: historyId });
    } catch (error) {
        console.error("Error inserting data:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = { postRouter }