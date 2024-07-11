const express = require('express');
const app = express();
const mailing = require('./mail/mail.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("How can I help you?");
});

app.post("/contactUs", async (req, res) => {
    try {
        let result = await mailing(req.body.name, req.body.email, req.body.feedback);
        if (result) {
            res.json({ ok: true, text: "Message sent" });
        } else {
            res.json({ ok: false, text: "Error in sending message" });
        }
    } catch (error) {
        console.error("Error in /contactUs endpoint:", error);
        res.status(500).json({ ok: false, text: "Server error" });
    }
});

app.listen(5000, () => console.log("App listening on port 5000"));
