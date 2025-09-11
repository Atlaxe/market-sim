const db = require('../db/database-init')


// Need to fix this
// const addCandle = (time, open, high, low, close) => {
//     const statement = db.prepare(`
//         INSERT INTO candles (time, open, high, low, close)
//         VALUES (?,?,?,?,?)
//     `)
//     statement.run(time, open, high, low, close);
// }

const addCandle = async (req, res) => {
    const { open, high, low, close } = req.body;
    const time = Math.floor(Date.now() / 1000);

    try {
        const statement = db.prepare(`
            INSERT INTO candles (time, open, high, low, close)
            VALUES (?, ?, ?, ?, ?)
        `);
        statement.run(time, open, high, low, close);

        res.status(200).json({ msg: "Candle was added no biggie" });
    } catch (error) {
        console.log(`Error when adding candle via api: ${error}`);
        return res.status(400).json({ error: "There was an error adding the candle" });
    }
};






module.exports = {
    addCandle
}