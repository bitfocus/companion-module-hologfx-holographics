const CHOICES_COLORS = [
  { id: 'primary_color', label: 'Primary Color' },
  { id: 'secondary_color', label: 'Secondary Color' },
  { id: 'background_a', label: 'Background A Color' },
  { id: 'background_b', label: 'Background B Color' },
  { id: 'text_a', label: 'Text A Color' },
  { id: 'canvas_bg', label: 'Render Background' },
]

const CHOICES_POS_HORIZONTAL = [
  { id: 'left', label: "Left" },
  { id: 'center', label: "Center" },
  { id: 'right', label: "Right" }
]

const CHOICES_POS_VERTICAL = [
  { id: 'top', label: "Top" },
  { id: 'center', label: "Center" },
  { id: 'bottom', label: "Bottom" }
]

module.exports = {
  getActions({ state, themes, entries } = {}) {
    this.WIDGETS = []
    if (state) {
      state.widgets.map((widget) => {
        this.WIDGETS.push({ id: widget.id, label: widget.name !== '' ? widget.name : widget.type })
      })
    }
    this.THEMES = []
    if (themes) {
      themes.map((theme) => {
        this.THEMES.push({ id: theme.filename, label: theme.filename })
      })
    }
    this.ENTRIES = []
    if (entries) {
      entries.map((entry) => {
        this.ENTRIES.push({ id: entry.id, label: Object.values(entry.props)[0] })
      })
    }

    return {
      'setColor': {
        label: 'Set color',
        options: [
          {
            type: 'dropdown',
            label: 'Color variable',
            id: 'colorvar',
            default: 1,
            choices: CHOICES_COLORS
          },
          {
            type: 'textinput',
            label: 'Color (i.e. rgba(255,0,0,0.5)',
            id: 'color'
          }
        ]
      },
      'setTheme': {
        label: 'Set active theme',
        options: [
          {
            type: 'dropdown',
            label: 'Theme',
            id: 'filename',
            default: 1,
            choices: this.THEMES
          }
        ]
      },
      'setWidgetVisibility': {
        label: 'Set widget visibility',
        options: [
          {
            type: 'dropdown',
            label: 'Visible',
            id: 'visibility',
            default: 1,
            choices: this.CHOICES_YESNO_BOOLEAN
          },
          {
            type: 'dropdown',
            label: 'Widget',
            id: 'widget',
            default: 1,
            choices: this.WIDGETS
          }
        ]
      },
      'setWidgetStyle': {
        label: 'Set widget style',
        options: [
          {
            type: 'dropdown',
            label: 'Widget',
            id: 'widget',
            default: 1,
            choices: this.WIDGETS
          },
          {
            type: 'dropdown',
            label: 'Horizontal Position',
            id: 'horizontal_position',
            default: 1,
            choices: CHOICES_POS_HORIZONTAL
          },
          {
            type: 'textinput',
            label: 'Horizontal offset (optional)',
            id: 'horizontal_offset'
          },
          {
            type: 'dropdown',
            label: 'Vertical Position',
            id: 'vertical_position',
            default: 1,
            choices: CHOICES_POS_VERTICAL
          },
          {
            type: 'textinput',
            label: 'Vertical offset (optional)',
            id: 'vertical_offset'
          },
          {
            type: 'textinput',
            label: 'Font Size multiplier (optional)',
            id: 'font_size'
          },
          {
            type: 'textinput',
            label: 'Render edge margin (optional)',
            id: 'global_padding'
          },
          {
            type: 'textinput',
            label: 'Width (optional)',
            id: 'width'
          },
          {
            type: 'textinput',
            label: 'Height (optional)',
            id: 'height'
          }
        ]
      },
      'setEntryVisibility': {
        label: 'Set entry visibility',
        options: [
          {
            type: 'dropdown',
            label: 'Visible',
            id: 'visibility',
            default: 1,
            choices: this.CHOICES_YESNO_BOOLEAN
          },
          {
            type: 'dropdown',
            label: 'Entry',
            id: 'entry',
            default: 1,
            choices: this.ENTRIES
          }
        ]
      }
    }
  },
}
