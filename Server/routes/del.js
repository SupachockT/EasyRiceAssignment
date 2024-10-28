const { pool, delRouter } = require("./routes")

delRouter.delete('/history/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await pool.query('DELETE FROM history WHERE id = $1', [id]);

        if (result.rowCount === 0) return res.status(404).json({ message: 'History record not found' });
        
        res.status(200).json({ message: 'History record deleted successfully' });
    } catch (error) {
        console.error('Error deleting history record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { delRouter };