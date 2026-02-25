import React, {useEffect, useState} from 'react'

export default function ThemeToggle(){
  const [dark, setDark] = useState(() => {
    try{
      return localStorage.getItem('ssd:dark') === '1'
    }catch(e){return false}
  })

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('ssd:dark', dark ? '1' : '0')
  },[dark])

  return (
    <div className="theme-toggle">
      <label>
        <input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} />
        <span>{dark ? 'Dark' : 'Light'}</span>
      </label>
    </div>
  )
}
