const axios = require('axios')
const FormData = require('form-data')

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()
  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response()
  response.appendHeader('Access-Control-Allow-Origin', '*')
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type')

  console.log(event)
  const {
    conferenceSid,
    participantCallSid,
    conferenceUniqueName,
    amount,
  } = event

  console.log('conference info', conferenceSid)
  console.log('customer call sid', participantCallSid)
  console.log('conferenceUniqueName', conferenceUniqueName)
  let updatedCustomerParticipant = await client
    .conferences(conferenceSid)
    .participants(participantCallSid)
    .update({ endConferenceOnExit: false })

  console.log('customer end conference set', updatedCustomerParticipant)
  const actionUrl = `https://${context.DOMAIN_NAME}/finish-pay?conferenceUniqueName=${conferenceUniqueName}&amp;policyNumber=12345678`
  console.log('action url', actionUrl)
  const twiml = `<Response><Say>Your amount due is ${amount}. Payment processing will begin now.</Say><Pay chargeAmount="${amount}" paymentConnector="Stripe_Connector" action="${actionUrl}" /></Response>`
  console.log('new twiml', twiml)

  const data = new FormData()
  data.append('Twiml', twiml)

  axios({
    method: 'post',
    url: `https://api.twilio.com/2010-04-01/Accounts/${context.ACCOUNT_SID}/Calls/${participantCallSid}.json`,
    data,
    headers: { ...data.getHeaders() },
    auth: {
      username: context.ACCOUNT_SID,
      password: context.AUTH_TOKEN,
    },
  })
    .then(function (response) {
      //handle success
      console.log(response)
      console.log('updated call to pay')
      response.setStatusCode(200)
      callback(null, response)
    })
    .catch(function (response) {
      //handle error
      console.log(response)
    })

  /*
  // why the  does axios work
  let updatedCall = await client
    .calls(participantCallSid)
    .update({ method: 'POST', twiml })

  console.log(updatedCall)
  response.setStatusCode(200)
  callback(null, response)
  */
}
