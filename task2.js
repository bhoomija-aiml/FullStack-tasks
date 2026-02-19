const express = require('express')
const fs = require('fs')

const app = express()
const file = 'notes.txt'

app.get('/add', (req, res) => {
    const note = req.query.note

    if (!note) {
        return res.status(400).send('Bad Request')
    }

    fs.appendFile(file, note + '\n', (err) => {
        if (err) return res.status(500).send('Error')
        res.send('Note Added Successfully')
    })
})

app.get('/notes', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err || !data.trim()) {
            return res.send('No Notes Found')
        }
        res.send(data)
    })
})

app.get('/clear', (req, res) => {
    fs.writeFile(file, '', (err) => {
        if (err) return res.status(500).send('Error')
        res.send('All Notes Deleted')
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
