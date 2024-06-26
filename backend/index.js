const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = 5005


app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootuser123!',
    database: 'Country'

})
connection.connect(err => {
    if (err) {
        console.error('not connect to sql:', err);
        return;
    }
    console.log('connect to sql');
})

app.get('/countries', (req, res) => {
    const sql = 'SELECT * FROM country';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            res.status(500).json({ error: 'Error querying database' });
            return;
        }
        res.json(results);
    });
});
app.get('/states/:countryId', (req, res) => {
    const sql = 'SELECT * FROM state WHERE country_id = ?';

    connection.query(sql,[req.params.countryId], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Error querying database' });
            return;
        }
        res.json(results);
    });
});
app.get('/cities/:stateId', (req, res) => {
    const sql = 'SELECT * FROM city WHERE state_id = ?';

    connection.query(sql, [req.params.stateId], (err, results) => {
        if (err) {
            console.error('Error database:', err);
            res.status(500).json({ error: 'Error database' });
            return;
        }
        res.json(results); 
    });
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
