const admin = require("firebase-admin");
const serviceAccount = require("./server-keys.json");
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function sendNotification(registrationToken, day = "yesterday") {
    try {
        const message = {
            data: {
                title: "FCM Push Notification",
                subtitle: "Check out action buttons",
                day
            },
            token: registrationToken,
            android: {
                priority: "high",
            },
        }

        const res = await admin.messaging().send(message)
        return res;
    } catch (err) {
        console.log(err.errorInfo)
        throw new Error(JSON.stringify(err.errorInfo))
    }
}

app.post('/', cors(), async (req, res) => {
    try {
        const {
            token,
            day
        } = req.body;
        const data = await sendNotification(token, day)
        res.json({
            success: true,
            data
        });
    } catch (err) {
        console.error(err)
        res.json({
            success: false,
            err
        })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});