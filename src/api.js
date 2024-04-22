const { InstanceStatus } = require('@companion-module/base')
const sdk = require('holographics-client-sdk')

module.exports = {
	initConnection: function () {
		let self = this

		try {
			// Setup config defaults
			self.config.host = self.config.host || '127.0.0.1'
			self.config.port = self.config.port || '3000'

			self.log('info', `Connecting to Holographics at ${self.config.host}:${self.config.port}`)
			self.updateStatus(InstanceStatus.Connecting)

			// Setup the socket connection to Holographics
			self.Holographics = new sdk.Socket(`http://${self.config.host}:${self.config.port}`)

			// Make sure we only have a single event listener
			self.Holographics.socket.removeAllListeners('connect')
			self.Holographics.socket.removeAllListeners('disconnect')
			self.Holographics.socket.removeAllListeners('stateChanged')

			// When the Holographics state changes, make sure we update things relevant to our actions
			self.Holographics.socket.on('stateChanged', () => {
				self.updateHoloState()
			})

			// Show ready status when connected
			self.Holographics.socket.on('connect', () => {
				self.log('info', 'Connected to Holographics.')
				self.updateStatus(InstanceStatus.Ok)

				//stop reconnect interval
				self.stopReconnect()

				// Update the state
				self.updateHoloState()

				// If we're polling, start polling
				if (self.config.polling) {
					self.startPolling()
				}
			})

			// Show disconnect message when disconnected
			self.Holographics.socket.on('disconnect', () => {
				self.log('error', 'Connection to Holographics lost.')
				self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection to Holographics lost.')

				//stop polling
				self.stopPolling()

				// If we're set to reconnect, start the reconnect process
				if (self.config.reconnect) {
					self.destroy()
					self.startReconnect()	
				}
			})

			// If we're not connected on first setup, show a different warning
			if (!self.Holographics.socket.connected) {
				self.updateStatus(InstanceStatus.ConnectionFailure)
			}
		} catch (e) {
			self.log('debug', e.toString())
			self.updateStatus(
				InstanceStatus.ConnectionFailure,
				'Connection Error. Check IP and Port. See Log for more information.'
			)
		}
	},

	startPolling: function () {
		let self = this

		self.stopPolling() //stop polling first

		self.log('info', `Starting polling every ${self.config.polling_interval}ms.`)

		self.polling = setInterval(() => {
			self.updateHoloState()
		}, self.config.polling_interval)
	},

	stopPolling: function () {
		let self = this

		if (self.polling) {
			self.log('info', 'Stopping polling.')
			clearInterval(self.polling)
			self.polling = null
		}
	},

	startReconnect: function () {
		let self = this

		self.log('info', `Attempting to reconnect to Holographics in ${self.config.reconnect_interval}ms.`)

		self.reconnect = setTimeout(() => {
			self.initConnection()
		}, self.config.reconnect_interval)
	},

	stopReconnect: function () {
		let self = this

		if (self.reconnect) {
			self.log('info', 'Reconnect process stopped.')
			clearTimeout(self.reconnect)
			self.reconnect = null
		}
	},

	updateHoloState: async function () {
		let self = this

		try {
			let state = await self.Holographics.state.get()
			let themes = await self.Holographics.themes.find()
			let entries = await self.Holographics.entries.find({ data: {} })
	
			//console.log('state', state)
			//console.log('themes', themes)
			//console.log('entries', entries)
	
			self.STATE = state
	
			self.WIDGETS = []
			if (state) {
				if (state.widgets.length > 0) {
					state.widgets.map((widget) => {
						self.WIDGETS.push({ id: widget.id, label: widget.name !== '' ? widget.name : widget.type })
					})
				}
				else {
					self.WIDGETS.push({ id: null, label: 'No Widgets Loaded' })
				}
			}
			self.THEMES = []
			if (themes) {
				if (themes.length > 0) {
					themes.map((theme) => {
						self.THEMES.push({ id: theme.filename, label: theme.variables.NAME })
					})
				}
				else {
					self.THEMES.push({ id: null, label: 'No Themes Loaded' })
				}
			}
			self.ENTRIES = []
			if (entries) {
				if (entries.length > 0) {
					entries.map((entry) => {
						self.ENTRIES.push({ id: entry.id, label: Object.values(entry.props)[0] })
					})
				}
				else {
					self.ENTRIES.push({ id: null, label: 'No Entries Loaded' })
				}
			}
	
			self.initActions()
			self.initFeedbacks()
			self.initVariables()
			self.initPresets()
	
			self.checkFeedbacks()
			self.checkVariables()
		}
		catch(error) {
			//some error getting state
		}
	},

	async setColor(colorvar, color) {
		await this.Holographics.state.patch({ data: { style: { [colorvar]: color } } })
	},
	async setTheme(filename) {
		await this.Holographics.state.patch({ data: { style: { activeTheme: filename } } })
	},
	async setWidgetVisibility(widget, visibility) {
		await this.Holographics.widgets.toggle({ id: widget, data: { visibility: visibility } })
	},
	async setWidgetStyle(
		widget,
		horizontal_position,
		horizontal_offset,
		vertical_position,
		vertical_offset,
		font_size,
		widget_padding,
		global_padding,
		width,
		height
	) {
		await this.Holographics.widgets.patch({
			id: widget,
			data: {
				style: {
					horizontal_position: horizontal_position === '' ? undefined : horizontal_position,
					vertical_position: vertical_position === '' ? undefined : vertical_position,
					horizontal_offset: horizontal_offset === '' ? undefined : Number(horizontal_offset),
					vertical_offset: vertical_offset === '' ? undefined : Number(vertical_offset),
					font_size: font_size === '' ? undefined : font_size,
					widget_padding: widget_padding === '' ? undefined : widget_padding,
					global_padding: global_padding === '' ? undefined : global_padding,
					width: width === '' ? undefined : width,
					height: height === '' ? undefined : height,
				},
			},
		})
	},
	async setEntryVisibility(entry, visibility) {
		await this.Holographics.entries.patch({ id: entry, data: { visibility: JSON.parse(visibility) } })
	},
}
