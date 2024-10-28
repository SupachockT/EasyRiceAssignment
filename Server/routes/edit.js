const { pool, editRouter } = require("./routes")

editRouter.put('/editHistory/:id', async (req, res) => {
    const { id } = req.params;
    const { price, samplingPoints, samplingDate, note } = req.body;

    try {
        const result = await pool.query(
            `UPDATE history
             SET price = $1, samplingpoints = $2, samplingdate = $3, note = $4
             WHERE id = $5 RETURNING *`,
            [price, samplingPoints, samplingDate, note, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating history:", error);
        res.status(500).json({ error: "Error updating history" });
    }
});

module.exports = { editRouter };