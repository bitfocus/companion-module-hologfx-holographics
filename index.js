// techministry-wirecastcontroller

const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const api = require('./src/api')
const constants = require('./src/constants')

class holoGfxInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...api,
			...constants,
		})

		this.Holographics = null

		this.THEMES = [
			{ id: null, label: 'No Themes Loaded' },
		]

		this.WIDGETS = [
			{ id: null, label: 'No Widgets Loaded' },
		]

		this.ENTRIES = [
			{ id: null, label: 'No Entries Loaded' },
		]

		this.STATE = {
			widgets: [],
			entries: [],
		}
	}

	async destroy() {
		// Prevent error messages on destroy
		this.Holographics.socket.removeAllListeners('connect')
		this.Holographics.socket.removeAllListeners('disconnect')
		this.Holographics.socket.removeAllListeners('stateChanged')

		// Close the socket
		this.Holographics.socket.close()
		delete this.Holographics
	}

	async init(config) {
		this.updateStatus(InstanceStatus.Connecting)
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.config = config

		if (this.config.verbose) {
			this.log('info', 'Verbose mode enabled. Log entries will contain detailed information.')
		}

		this.updateStatus(InstanceStatus.Connecting)

		this.initConnection()

		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.checkFeedbacks()
		this.checkVariables()
	}
}

runEntrypoint(holoGfxInstance, UpgradeScripts)
