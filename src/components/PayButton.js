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
    let attributes = this.props.task.attributes
    console.log('current task attributes', attributes)
    if (this.props.task.channelType === 'voice') {
      return (
        <PaymentIcon
          {...this.props}
          className={paybutton}
          onClick={(e) => {
            fetch(
              `https://${functionBase}/start-pay?conferenceSid=${attributes.conference.sid}&participantCallSid=${attributes.conference.participants.customer}&conferenceUniqueName=${this.props.task.conference.sid}&amount=10.99`,
              {
                mode: 'no-cors',
              },
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
