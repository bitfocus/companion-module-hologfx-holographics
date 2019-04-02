const instance_skel = require('../../instance_skel')

const actionUI = require('./actionUI')
const actionMethods = require('./actionMethods')

const sdk = require('holographics-client-sdk')

class instance extends instance_skel {
  constructor (system, id, config) {
    super(system, id, config);
    Object.assign(this, {
      ...actionUI,
      ...actionMethods
    })

    this.system.emit('instance_actions', this.id, this.getActions())

    return this
  }

  init () {
    this.updateConfig()
  }

  updateConfig (config) {
    if (config) this.config = config
    try {
      this.Holographics = new sdk.Socket(`http://${this.config.host}:${this.config.port}`)
      this.Holographics.socket.on('stateChanged', (state) => {
        this.updateHoloState()
      })
      this.updateHoloState()
      this.status(this.STATUS_OK, 'Ready')
    } catch(e) {
      this.debug(e.message)
      this.status(this.STATUS_WARNING, 'Invalid URL')
    }
    this.Holographics.state.get().catch((e) => { this.handleError(e) })
  }

  async updateHoloState () {
    let state = await this.Holographics.state.get()
    let themes = await this.Holographics.themes.find()
    let entries = await this.Holographics.entries.find({ data: {} })
    
    this.system.emit('instance_actions', this.id, this.getActions({ state, themes, entries }))
  }

  destroy () {
    this.debug("destroy", this.id);;
  }

  config_fields () {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'Target IP',
        width: 6,
        regex: this.REGEX_IP
      },
      {
        type: 'textinput',
        id: 'port',
        label: 'Port (default 3000)',
        width: 6,
        regex: this.REGEX_PORT
      },
    ]
  }

  handleConnectionError() {
    this.log('error', "Can not connect to Holographics")
    this.status(this.STATUS_ERROR, 'Connection error')
  }

  handleError(error) {
    if (error.code === 'ECONNREFUSED') {
      return this.handleConnectionError()
    } else {
      this.log('error', e.message)
      this.debug(error)
    }
  }

  action({ action, options }) {
    this[action](options)
      .then((res) => { this.status(this.STATUS_OK, 'Ready') })
      .catch((e) => { this.handleError(e) })
  }
}

exports = module.exports = instance