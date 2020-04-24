exports.handler = function (context, event, callback) {
  const client = context.getTwilioClient()

  console.log('in Pay')
  console.log(event)
  console.log(event.Result)
  console.log(event.conferenceUniqueName)

  let twiml = new Twilio.twiml.VoiceResponse()

  switch (event.Result) {
    case 'success':
      text = 'Thank you for your payment'
      break
    case 'payment-connector-error':
      text = 'The Payment Gateway is reporting an error'
      console.log(decodeURIComponent(event.PaymentError))
      break

    default:
      text = 'The payment was not completed successfully'
  }

  console.log('policy number', event.policyNumber)

  twiml.say(text)
  const dial = twiml.dial()
  dial.conference(
    {
      beep: true,
      endConferenceOnExit: true,
    },
    event.conferenceUniqueName,
  )
  callback(null, twiml)
}
