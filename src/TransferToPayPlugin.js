import React from 'react'
import { VERSION } from '@twilio/flex-ui'
import { FlexPlugin } from 'flex-plugin'
import PayButton from './components/PayButton'

const PLUGIN_NAME = 'TransferToPayPlugin'

export default class TransferToPayPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME)
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.TaskCanvasHeader.Content.add(<PayButton key='paybutton' />)
  }
}
