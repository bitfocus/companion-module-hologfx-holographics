const { Regex, combineRgb } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				label: 'Information',
				width: 12,
				value: '',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 3,
				default: '127.0.0.1',
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 3,
				default: 3000,
				regex: Regex.Port,
			},
			{
				type: 'static-text',
				id: 'hr1',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			{
				type: 'checkbox',
				id: 'polling',
				label: 'Enable Polling',
				width: 3,
				default: true,
			},
			{
				type: 'textinput',
				id: 'polling_interval',
				label: 'Polling Interval (ms)',
				width: 3,
				default: 1000,
				regex: Regex.Integer,
				visible: (config) => config.polling,
			},
			{
				type: 'static-text',
				id: 'info2',
				label: 'Polling Interval',
				width: 6,
				value:
					'Polling interval in milliseconds. The default is 1000ms (1 second).',
				visible: (config) => config.polling,
			},
			{
				type: 'checkbox',
				id: 'reconnect',
				label: 'Auto Reconnect if Connection is Lost',
				width: 3,
				default: true,
			},
			{
				type: 'textinput',
				id: 'reconnect_interval',
				label: 'Reconnect Interval (ms)',
				width: 3,
				default: 5000,
				regex: Regex.Integer,
				visible: (config) => config.reconnect,
			},
			{
				type: 'static-text',
				id: 'info3',
				label: 'Reconnect Interval',
				width: 6,
				value:
					'Reconnect interval in milliseconds. The default is 5000ms (5 seconds).',
				visible: (config) => config.reconnect,
			},
			{
				type: 'static-text',
				id: 'hr2',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			{
				type: 'colorpicker',
				id: 'color',
				label: 'Preset Button Text/Foreground Color (Active)',
				width: 3,
				default: combineRgb(255, 255, 255),
			},
			{
				type: 'static-text',
				id: 'color-info',
				label: 'Preset Button Text/Foreground Color (Active)',
				width: 9,
				value:
					'This color will be used for the text on the preset buttons when the feedback is active.',
			},
			{
				type: 'colorpicker',
				id: 'bgcolor',
				label: 'Preset Button Background Color (Active)',
				width: 3,
				default: combineRgb(255, 0, 0),
			},
			{
				type: 'static-text',
				id: 'bgcolor-info',
				label: 'Preset Button Background Color (Active)',
				width: 9,
				value:
					'This color will be used for the background of the preset buttons when the feedback is active.',
			},
			{
				type: 'colorpicker',
				id: 'color_inactive',
				label: 'Preset Button Text/Foreground Color (Inactive)',
				width: 3,
				default: combineRgb(255, 255, 255),
			},
			{
				type: 'static-text',
				id: 'color-inactive-info',
				label: 'Preset Button Text/Foreground Color (Inactive)',
				width: 9,
				value:
					'This color will be used for the text on the preset buttons when the feedback is inactive.',
			},
			{
				type: 'colorpicker',
				id: 'bgcolor_inactive',
				label: 'Preset Button Background Color (Inactive)',
				width: 3,
				default: combineRgb(0, 0, 0),
			},
			{
				type: 'static-text',
				id: 'bgcolor-inactive-info',
				label: 'Preset Button Background Color (Inactive)',
				width: 9,
				value:
					'This color will be used for the background of the preset buttons when the feedback is inactive.',
			},
			{
				type: 'static-text',
				id: 'hr3',
				width: 12,
				label: ' ',
				value: '<hr />',
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false,
				width: 3,
			},
			{
				type: 'static-text',
				id: 'info3',
				label: 'Verbose Logging',
				width: 9,
				value:
					'Enabling this option will put more detail in the log, which can be useful for troubleshooting purposes.',
			},
		]
	},
}
