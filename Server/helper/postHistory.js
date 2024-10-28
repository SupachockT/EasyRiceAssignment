const pool = require("../config/db")

async function fetchSubStandards(standardName) {
    const query = `
        SELECT name, maxlength, minlength, conditionmax, conditionmin
        FROM sub_standard
        WHERE standard_id = (SELECT id FROM standard WHERE name = $1)
    `;
    const result = await pool.query(query, [standardName]);
    return result.rows;
}

async function insertComposition(historyId, name, lengthRange, percentage) {
    const query = `
        INSERT INTO composition (history_id, name, length, actual)
        VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [historyId, name, lengthRange, percentage]);
}

async function insertDefect(historyId, name, actual) {
    const query = `
        INSERT INTO defect (history_id, name, actual)
        VALUES ($1, $2, $3)
    `;
    await pool.query(query, [historyId, name, actual]);
}

function processGrains(grains, subStandard) {
    const { minlength, maxlength, conditionmin, conditionmax } = subStandard;

    return grains.filter(grain => {
        const length = grain.length;
        const minConditionMet = (conditionmin === 'GT' && length > minlength) || (conditionmin === 'GE' && length >= minlength);
        const maxConditionMet = (conditionmax === 'LT' && length < maxlength) || (conditionmax === 'LE' && length <= maxlength);
        return minConditionMet && maxConditionMet;
    });
}

function calculateTypePercentage(grains) {
    const totalGrains = grains.length;

    const typeCounts = grains.reduce((counts, grain) => {
        if (grain.type !== "white") {
            counts[grain.type] = (counts[grain.type] || 0) + 1;
        }
        return counts;
    }, {});

    const typePercentages = {};
    for (const [type, count] of Object.entries(typeCounts)) {
        typePercentages[type] = (count / totalGrains) * 100;
    }

    return typePercentages;
}

module.exports = {
    fetchSubStandards,
    insertComposition,
    insertDefect,
    processGrains,
    calculateTypePercentage
};