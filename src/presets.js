const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets: function () {
		let self = this

		let presets = []

		let foregroundColor_active = combineRgb(255, 255, 255) // White
		let backgroundColor_active = combineRgb(255, 0, 0) // Red

		let foregroundColor_inactive = combineRgb(255, 255, 255) // White
		let backgroundColor_inactive = combineRgb(0, 0, 0) // Black

		if (self.config.color) {
			foregroundColor_active = self.config.color
		}

		if (self.config.bgcolor) {
			backgroundColor_active = self.config.bgcolor
		}

		if (self.config.color_inactive) {
			foregroundColor_inactive = self.config.color_inactive
		}

		if (self.config.bgcolor_inactive) {
			backgroundColor_inactive = self.config.bgcolor_inactive
		}

		if (this.STATE && this.STATE.widgets) {
			this.STATE.widgets.forEach((widget) => {
				presets.push({
					type: 'button',
					category: 'Widgets',
					name: 'Toggle Widget',
					style: {
						text: widget.name === '' ? widget.type : widget.name,
						size: '18',
						color: foregroundColor_inactive,
						bgcolor: backgroundColor_inactive,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setWidgetVisibility',
									options: {
										visibility: true,
										widget: widget.id,
									},
								},
							],
							up: [],
						},
						{
							down: [
								{
									actionId: 'setWidgetVisibility',
									options: {
										visibility: false,
										widget: widget.id,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'widget_active',
							options: {
								widget: widget.id,
							},
							style: {
								color: foregroundColor_active,
								bgcolor: backgroundColor_active,
							},
						},
					],
				})
			})
		}

		if (this.STATE && this.STATE.entries) {
			this.STATE.entries.forEach((entry) => {
				let name = entry.props[Object.keys(entry.props)[0]]
	
				presets.push({
					type: 'button',
					category: 'Entries',
					name: 'Toggle Entry',
					style: {
						text: name,
						size: '18',
						color: foregroundColor_inactive,
						bgcolor: backgroundColor_inactive,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setEntryVisibility',
									options: {
										visibility: true,
										entry: entry.id,
									},
								},
							],
							up: [],
						},
						{
							down: [
								{
									actionId: 'setEntryVisibility',
									options: {
										visibility: false,
										entry: entry.id,
									},
								},
							],
							up: []
						},
					],
					feedbacks: [
						{
							feedbackId: 'entry_active',
							options: {
								entry: entry.id,
							},
							style: {
								color: foregroundColor_active,
								bgcolor: backgroundColor_active,
							},
						},
					],
				})
			})
		}

		this.setPresetDefinitions(presets)
	},
}
