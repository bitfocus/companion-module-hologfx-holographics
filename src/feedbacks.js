const { combineRgb } = require('@companion-module/base')

module.exports = {
	// ##########################
	// #### Define Feedbacks ####
	// ##########################
	initFeedbacks: function () {
		let self = this
		let feedbacks = {}

		const foregroundColor = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red

		feedbacks['widget_active'] = {
			type: 'boolean',
			name: 'Change background color by widget visibility',
			description: 'If the widget specified is visible on the renderer, change background color of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Widget',
					id: 'widget',
					default: 1,
					choices: self.WIDGETS,
				},
			],
			defaultSyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			callback: (feedback) => {
				let widget = this.STATE.widgets.find((widget) => widget.id === feedback.options.widget)
				if (widget && widget.props.visibility === true) return true
				return false
			},
		}

		feedbacks['entry_active'] = {
			type: 'boolean',
			name: 'Change background color by entry visibility',
			description: 'If the entry specified is visible on the renderer, change background color of the bank',
			options: [
				{
					type: 'dropdown',
					label: 'Entry',
					id: 'entry',
					default: 1,
					choices: self.ENTRIES,
				},
			],
			defaultSyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			callback: (feedback) => {
				let entry = this.STATE.entries.find((entry) => entry.id === feedback.options.entry)

				if (entry && entry.visibility === true) return true

				return false
			},
		}

		feedbacks.setBackgroundColor = {
			type: 'advanced',
			name: 'Set the background color to the specified Color Choice',
			description: 'Sets the background color of the bank based on the color set in Holographics.',
			options: [
				{
					type: 'dropdown',
					label: 'Color',
					id: 'color',
					default: self.CHOICES_COLORS[0].id,
					choices: self.CHOICES_COLORS,
				},
			],
			callback: (feedback) => {
				if (this.STATE && this.STATE.style) {
					let color = this.STATE.style[feedback.options.color]
					if (color) {
						//returns a string like rgba(255, 255, 255, 0) and we need to convert it to an array
						let colorArray = color.split(',')

						//remove the 'rgba(' and ')' from the string
						colorArray[0] = colorArray[0].replace('rgba(', '')
						colorArray[3] = colorArray[3].replace(')', '')

						//return the color as an array of integers
						colorArray = colorArray.map((color) => parseInt(color))

						//return the color as a combined RGB value
						return {
							bgcolor: combineRgb(colorArray[0], colorArray[1], colorArray[2])
						}
					}
				}
			},
		}

		this.setFeedbackDefinitions(feedbacks)
	},
}
