import React, {useEffect, useState} from 'react'

const palettes = ['default', 'ocean', 'sunset', 'forest']

export default function ThemeToggle(){
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('ssd:dark') === '1'
    } catch (e) {
      return false
    }
  })

  const [palette, setPalette] = useState(() => {
    try {
      return localStorage.getItem('ssd:palette') || 'default'
    } catch (e) {
      return 'default'
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.dataset.palette = palette
    localStorage.setItem('ssd:dark', dark ? '1' : '0')
    localStorage.setItem('ssd:palette', palette)
  }, [dark, palette])

  function cyclePalette() {
    const next = palettes[(palettes.indexOf(palette) + 1) % palettes.length]
    setPalette(next)
  }

  return (
    <div className="theme-toggle">
      <label className="theme-toggle-label">
        <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
        <span>{dark ? 'Dark Mode' : 'Light Mode'}</span>
      </label>

      <button type="button" className="palette-button" onClick={cyclePalette}>
        Palette: {palette.charAt(0).toUpperCase() + palette.slice(1)}
      </button>
    </div>
  )
}
