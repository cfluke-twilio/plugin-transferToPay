import * as React from 'react'
import { withTaskContext } from '@twilio/flex-ui'
import { css } from 'emotion'

import PaymentIcon from '@material-ui/icons/Payment'

const functionBase = ''

const paybutton = css`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2px;
  margin: 0px 15px;
  border-radius: 50%;
  align-self: center;
`

export class PayButton extends React.Component {
  render() {
    console.log('current task', this.props.task)
    if (this.props.task === undefined) {
      return <div />
    }
    if (this.props.task.channelType === 'voice') {
      let conference = this.props.task.conference
      console.log('current task conference', conference)
      return (
        <PaymentIcon
          {...this.props}
          className={paybutton}
          onClick={(e) => {
            let conferenceUniqueName = conference.sid
            let conferenceSid = conference.conferenceSid
            let participantCallSid = conference.participants[1].callSid
            fetch(
              `https://functions-4041-dev.twil.io/start-pay?conferenceSid=${conferenceSid}&participantCallSid=${participantCallSid}&conferenceUniqueName=${conferenceUniqueName}&amount=10.99`,
            ).then((data) => {
              console.log('sent start pay', data)
            })
          }}
        />
      )
    } else {
      //Only render if voice, could support starting a voice call for pay portion in future, maybe?
      return <div />
    }
  }
}

export default withTaskContext(PayButton)
