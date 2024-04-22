const { combineRgb, splitRgb } = require('@companion-module/base')

module.exports = {
	initActions: function () {
		let self = this
		let actions = {}

		actions.setColor = {
			name: 'Set color using rgba function',
			options: [
				{
					type: 'dropdown',
					label: 'Color variable',
					id: 'colorvar',
					default: self.CHOICES_COLORS[0].id,
					choices: self.CHOICES_COLORS,
				},
				{
					type: 'textinput',
					label: 'Color (i.e. rgba(255,0,0,0.5)',
					id: 'color',
					default: 'rgba(255,0,0,0.5)',
					useVariables: true,
				},
			],
			callback: async (action) => {
				let opt = action.options

				let colorvar = opt.colorvar

				let color = await self.parseVariablesInString(opt.color)

				self.setColor(colorvar, color)
			},
		}

		actions.setColorPicker = {
			name: 'Set color with color picker',
			options: [
				{
					type: 'dropdown',
					label: 'Color variable',
					id: 'colorvar',
					default: self.CHOICES_COLORS[0].id,
					choices: self.CHOICES_COLORS,
				},
				{
					type: 'colorpicker',
					label: 'Color',
					id: 'color',
					default: combineRgb(255, 0, 0),
				},
			],
			callback: async (action) => {
				let opt = action.options

				let colorvar = opt.colorvar
				let color = splitRgb(opt.color)
				let colorString = `rgba(${color.r},${color.g},${color.b},1)`

				self.setColor(colorvar, colorString)
			},
		}

		actions.setTheme = {
			name: 'Set active theme',
			options: [
				{
					type: 'dropdown',
					label: 'Theme',
					id: 'filename',
					default: self.THEMES[0].id,
					choices: self.THEMES,
				},
			],
			callback: async (action) => {
				let opt = action.options

				self.setTheme(opt.filename)
			},
		}

		actions.setWidgetVisibility = {
			name: 'Set widget visibility',
			options: [
				{
					type: 'dropdown',
					label: 'Widget',
					id: 'widget',
					default: self.WIDGETS[0].id,
					choices: self.WIDGETS,
				},
				{
					type: 'dropdown',
					label: 'Visible',
					id: 'visibility',
					default: true,
					choices: [
						{ id: true, label: 'Yes/Visible' },
						{ id: false, label: 'No/Not Visible' },
					],
				},
			],
			callback: async (action) => {
				let opt = action.options

				self.setWidgetVisibility(opt.widget, opt.visibility)
			},
		}

		actions.setWidgetStyle = {
			name: 'Set widget style',
			options: [
				{
					type: 'dropdown',
					label: 'Widget',
					id: 'widget',
					default: self.WIDGETS[0].id,
					choices: self.WIDGETS,
				},
				{
					type: 'dropdown',
					label: 'Horizontal Position',
					id: 'horizontal_position',
					default: self.CHOICES_POS_HORIZONTAL[1].id,
					choices: self.CHOICES_POS_HORIZONTAL,
				},
				{
					type: 'textinput',
					label: 'Horizontal offset (optional)',
					id: 'horizontal_offset',
					default: '',
					useVariables: true,
				},
				{
					type: 'dropdown',
					label: 'Vertical Position',
					id: 'vertical_position',
					default: self.CHOICES_POS_VERTICAL[1].id,
					choices: self.CHOICES_POS_VERTICAL,
				},
				{
					type: 'textinput',
					label: 'Vertical offset (optional)',
					id: 'vertical_offset',
					default: '',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Font Size multiplier (optional)',
					id: 'font_size',
					default: '',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Widget padding',
					id: 'widget_padding',
					default: '',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Render edge margin (optional)',
					id: 'global_padding',
					default: '',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Width (optional)',
					id: 'width',
					default: '',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Height (optional)',
					id: 'height',
					default: '',
					useVariables: true,
				},
			],
			callback: async (action) => {
				let opt = action.options

				let horizontal_offset = await self.parseVariablesInString(opt.horizontal_offset)
				let vertical_offset = await self.parseVariablesInString(opt.vertical_offset)
				let font_size = await self.parseVariablesInString(opt.font_size)
				let widget_padding = await self.parseVariablesInString(opt.widget_padding)
				let global_padding = await self.parseVariablesInString(opt.global_padding)
				let width = await self.parseVariablesInString(opt.width)
				let height = await self.parseVariablesInString(opt.height)

				self.setWidgetStyle(
					opt.widget,
					opt.horizontal_position,
					horizontal_offset,
					opt.vertical_position,
					vertical_offset,
					font_size,
					widget_padding,
					global_padding,
					width,
					height
				)
			},
		}

		actions.setEntryVisibility = {
			name: 'Set entry visibility',
			options: [
				{
					type: 'dropdown',
					label: 'Entry',
					id: 'entry',
					default: self.ENTRIES[0].id,
					choices: self.ENTRIES,
				},
				{
					type: 'dropdown',
					label: 'Visible',
					id: 'visibility',
					default: true,
					choices: [
						{ id: true, label: 'Yes/Visible' },
						{ id: false, label: 'No/Not Visible' },
					],
				},
			],
			callback: async (action) => {
				let opt = action.options

				self.setEntryVisibility(opt.entry, opt.visibility)
			},
		}

		self.setActionDefinitions(actions)
	},
}
