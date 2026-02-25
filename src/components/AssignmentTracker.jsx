import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:assignments:v1'

export default function AssignmentTracker(){
  const [items, setItems] = useState(()=>{
    try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [] }catch(e){return []}
  })
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) },[items])

  function add(){
    if(!text.trim()) return
    setItems([{id:Date.now(), text:text.trim(), priority, done:false}, ...items])
    setText('')
  }

  function toggle(id){ setItems(items.map(it=>it.id===id ? {...it, done: !it.done} : it)) }
  function remove(id){
    if(!window.confirm('Remove this assignment?')) return
    setItems(items.filter(it=>it.id!==id))
  }

  const total = items.length
  const doneCount = items.filter(i=>i.done).length
  const pct = total === 0 ? 0 : Math.round((doneCount/total)*100)

  return (
    <div className="assign-root">
      <div className="add-row">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="New assignment" />
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={add}>Add</button>
      </div>
      { total === 0 ? (
        <div className="muted">No assignments yet — time to relax or add one!</div>
      ) : (
        <>
          <div style={{margin:'8px 0'}}>
            <div style={{height:10,background:'rgba(255,255,255,0.06)',borderRadius:6,overflow:'hidden'}}>
              <div style={{width:`${pct}%`,height:'100%',background:'#6ee7b7'}} />
            </div>
            <div style={{fontSize:12,marginTop:6}}>{doneCount}/{total} Assignments Done ({pct}%)</div>
          </div>
          <ul className="assign-list">
            {items.map(it=> (
              <li key={it.id} className={`assign-item ${it.done? 'done':''} ${it.priority.toLowerCase()}`}>
                <label>
                  <input type="checkbox" checked={it.done} onChange={()=>toggle(it.id)} />
                  <span className="text">{it.text}</span>
                </label>
                <div className="right">
                  <span className="prio">{it.priority}</span>
                  <button onClick={()=>remove(it.id)}>✕</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
