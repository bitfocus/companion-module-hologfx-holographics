const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets: function () {
		let presets = []

		const foregroundColor = combineRgb(255, 255, 255) // White
		//const backgroundColorRed = combineRgb(255, 0, 0) // Red
		const backgroundColorBlack = combineRgb(0, 0, 0) // Black

		if (this.STATE && this.STATE.widgets) {
			this.STATE.widgets.forEach((widget) => {
				presets.push({
					type: 'button',
					category: 'Widgets',
					name: 'Toggle Widget',
					style: {
						text: widget.name === '' ? widget.type : widget.name,
						size: '18',
						color: foregroundColor,
						bgcolor: backgroundColorBlack,
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
						color: foregroundColor,
						bgcolor: backgroundColorBlack,
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
						},
					],
				})
			})
		}

		this.setPresetDefinitions(presets)
	},
}
