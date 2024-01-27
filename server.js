const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const twilio = require("twilio")
const cors = require("cors")
const corsOptions = require("./corsOptions")
const helmet = require("helmet")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(helmet())

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = new twilio.Twilio(accountSid, authToken)

app.post("/send-sms-channel-partner", async (req, res) => {
  const { to, body } = req.body

  try {
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    })
    console.log("SMS sent:", message.sid)
    res.json({
      success: true,
      message: "SMS sent to channel partner successfully!",
    })
  } catch (error) {
    console.error("Error sending SMS", error.message)
    res.status(500).json({ success: false, message: "Failed to send SMS." })
  }
})
app.post("/send-sms-sales-person", async (req, res) => {
  const { to, body } = req.body

  try {
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    })
    console.log("SMS sent:", message.sid)
    res.json({
      success: true,
      message: "SMS sent to sales person successfully!",
    })
  } catch (error) {
    console.error("Error sending SMS", error.message)
    res.status(500).json({ success: false, message: "Failed to send SMS." })
  }
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})
