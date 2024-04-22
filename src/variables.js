module.exports = {
	initVariables: function () {
		let variables = []

		try {
			variables.push({ variableId: 'activeTheme', name: 'Active Theme' })
			variables.push({ variableId: 'primary_color', name: 'Primary Color' })
			variables.push({ variableId: 'secondary_color', name: 'Secondary Color' })
			variables.push({ variableId: 'background_a', name: 'Background A Color' })
			variables.push({ variableId: 'background_b', name: 'Background B Color' })
			variables.push({ variableId: 'text_a', name: 'Text A Color' })
			variables.push({ variableId: 'text_b', name: 'Text B Color' })
			variables.push({ variableId: 'global_padding', name: 'Global Padding' })
			variables.push({ variableId: 'widget_padding', name: 'Widget Padding' })
			variables.push({ variableId: 'widget_offset', name: 'Widget Offset' })
			variables.push({ variableId: 'widget_repositioning', name: 'Widget Repositioning' })
			variables.push({ variableId: 'font_size', name: 'Font Size' })
			variables.push({ variableId: 'canvas_bg', name: 'Render Background' })
			variables.push({ variableId: 'enter_animation', name: 'Enter Animation' })
			variables.push({ variableId: 'enter_ease', name: 'Enter Ease' })
			variables.push({ variableId: 'enter_duration', name: 'Enter Duration' })
			variables.push({ variableId: 'leave_animation', name: 'Leave Animation' })
			variables.push({ variableId: 'leave_ease', name: 'Leave Ease' })
			variables.push({ variableId: 'leave_duration', name: 'Leave Duration' })
			variables.push({ variableId: 'reposition_ease', name: 'Reposition Ease' })
			variables.push({ variableId: 'reposition_duration', name: 'Reposition Duration' })
	
			if (this.STATE.widgets && this.STATE.widgets.length > 0) {
				for (let i = 0; i < this.STATE.widgets.length; i++) {
					variables.push({ variableId: `widget_${(i+1)}_id`, name: `Widget ${(i+1)} ID`})
					variables.push({ variableId: `widget_${(i+1)}_name`, name: `Widget ${(i+1)} Name`})
					variables.push({ variableId: `widget_${(i+1)}_type`, name: `Widget ${(i+1)} Type`})
				}
			}

			if (this.THEMES && this.THEMES.length > 0) {
				for (let i = 0; i < this.THEMES.length; i++) {
					variables.push({ variableId: `theme_${(i+1)}_name`, name: `Theme ${(i+1)} Name`})
				}
			}

			if (this.ENTRIES && this.ENTRIES.length > 0) {
				for (let i = 0; i < this.ENTRIES.length; i++) {
					variables.push({ variableId: `entry_${(i+1)}_id`, name: `Entry ${(i+1)} ID`})
					variables.push({ variableId: `entry_${(i+1)}_visible`, name: `Entry ${(i+1)} Visible`})
					variables.push({ variableId: `entry_${(i+1)}_prop_message`, name: `Entry ${(i+1)} Prop Message`})
				}
			}
	
			this.setVariableDefinitions(variables)
		}
		catch(error) {
			this.log('error', 'Error setting Variables: ' + String(error))
		}
	},

	checkVariables: function () {
		//let self = this

		try {
			let variableObj = {}

			variableObj['activeTheme'] = this.STATE && this.STATE.style && this.STATE.style.activeTheme ? this.STATE.style.activeTheme : ''
			variableObj['primary_color'] = this.STATE && this.STATE.style && this.STATE.style.primary_color ? this.STATE.style.primary_color : ''
			variableObj['secondary_color'] = this.STATE && this.STATE.style && this.STATE.style.secondary_color ? this.STATE.style.secondary_color : ''
			variableObj['background_a'] = this.STATE && this.STATE.style && this.STATE.style.background_a ? this.STATE.style.background_a : ''
			variableObj['background_b'] = this.STATE && this.STATE.style && this.STATE.style.background_b ? this.STATE.style.background_b : ''
			variableObj['text_a'] = this.STATE && this.STATE.style && this.STATE.style.text_a ? this.STATE.style.text_a : ''
			variableObj['text_b'] = this.STATE && this.STATE.style && this.STATE.style.text_b ? this.STATE.style.text_b : ''
			variableObj['global_padding'] = this.STATE && this.STATE.style && this.STATE.style.global_padding ? this.STATE.style.global_padding : ''
			variableObj['widget_padding'] = this.STATE && this.STATE.style && this.STATE.style.widget_padding ? this.STATE.style.widget_padding : ''
			variableObj['widget_offset'] = this.STATE && this.STATE.style && this.STATE.style.widget_offset ? this.STATE.style.widget_offset : ''
			variableObj['widget_repositioning'] = this.STATE && this.STATE.style && this.STATE.style.widget_repositioning ? this.STATE.style.widget_repositioning : ''
			variableObj['font_size'] = this.STATE && this.STATE.style && this.STATE.style.font_size ? this.STATE.style.font_size : ''
			variableObj['canvas_bg'] = this.STATE && this.STATE.style && this.STATE.style.canvas_bg ? this.STATE.style.canvas_bg : ''
			variableObj['enter_animation'] = this.STATE && this.STATE.style && this.STATE.style.enter_animation ? this.STATE.style.enter_animation : ''
			variableObj['enter_ease'] = this.STATE && this.STATE.style && this.STATE.style.enter_ease ? this.STATE.style.enter_ease : ''
			variableObj['enter_duration'] = this.STATE && this.STATE.style && this.STATE.style.enter_duration ? this.STATE.style.enter_duration : ''
			variableObj['leave_animation'] = this.STATE && this.STATE.style && this.STATE.style.leave_animation ? this.STATE.style.leave_animation : ''
			variableObj['leave_ease'] = this.STATE && this.STATE.style && this.STATE.style.leave_ease ? this.STATE.style.leave_ease : ''
			variableObj['leave_duration'] = this.STATE && this.STATE.style && this.STATE.style.leave_duration ? this.STATE.style.leave_duration : ''
			variableObj['reposition_ease'] = this.STATE && this.STATE.style && this.STATE.style.reposition_ease ? this.STATE.style.reposition_ease : ''
			variableObj['reposition_duration'] = this.STATE && this.STATE.style && this.STATE.style.reposition_duration ? this.STATE.style.reposition_duration : ''

			if (this.STATE.widgets && this.STATE.widgets.length > 0) {
				for (let i = 0; i < this.STATE.widgets.length; i++) {
					let widget = this.STATE.widgets[i]
					variableObj[`widget_${(i+1)}_id`] = widget.id
					variableObj[`widget_${(i+1)}_name`] = widget.name !== '' ? widget.name : widget.type
					variableObj[`widget_${(i+1)}_type`] = widget.type
				}
			}

			if (this.THEMES && this.THEMES.length > 0) {
				for (let i = 0; i < this.THEMES.length; i++) {
					let theme = this.THEMES[i]
					variableObj[`theme_${(i+1)}_name`] = theme.label
				}
			}

			if (this.STATE.entries && this.STATE.entries.length > 0) {
				for (let i = 0; i < this.STATE.entries.length; i++) {
					let entry = this.STATE.entries[i]
					variableObj[`entry_${i + 1}_id`] = entry.id
					variableObj[`entry_${i + 1}_visible`] = entry.visibility ? 'Visible' : 'Hidden'
					variableObj[`entry_${i + 1}_prop_message`] = entry.props && entry.props.message ? entry.props.message : ''
				}
			}

			this.setVariableValues(variableObj)
		} catch (error) {
			this.log('error', 'Error setting Variables: ' + String(error))
		}
	},
}
