const { pool, getRouter } = require("./routes")

getRouter.get("/standard", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT  
                s.id AS standard_id,
                s.name AS standard_name
            FROM 
                standard s;
        `);

        // Directly map the result to an array of objects with only id and name
        const standards = result.rows.map(row => ({
            id: row.standard_id,
            name: row.standard_name
        }));

        res.json(standards);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

getRouter.get("/history", async (req, res) => {
    try {
        const historyResult = await pool.query(`
            SELECT 
                createddate, 
                id, 
                name, 
                standard, 
                note 
            FROM 
                history;
        `);

        // Map the history result to only include the selected fields
        const histories = historyResult.rows.map(row => ({
            createddate: row.createddate,
            id: row.id,
            name: row.name,
            standard: row.standard,
            note: row.note
        }));

        res.json(histories);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

getRouter.get("/history/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const historyResult = await pool.query(`
            SELECT * FROM history WHERE id = $1;
        `, [id]);
        if (historyResult.rows.length === 0) return res.status(404).json({ message: "History record not found" });


        const history = historyResult.rows[0];

        const compositionResult = await pool.query(`
            SELECT * FROM composition WHERE history_id = $1;
        `, [id]);

        const defectResult = await pool.query(`
            SELECT * FROM defect WHERE history_id = $1;
        `, [id]);

        const responseData = {
            history,
            composition: compositionResult.rows,
            defect: defectResult.rows
        };

        res.json(responseData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = { getRouter };