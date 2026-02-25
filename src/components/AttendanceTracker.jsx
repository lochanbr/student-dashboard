import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:attendance:v1'
const DEFAULT_THRESHOLD = 0.75

function percent(attended, total){
  if(total === 0) return 0
  return (attended / total) * 100
}

// returns integer number of classes user can still miss while staying >= threshold
function allowedMisses(attended, total, threshold){
  if(total === 0) return Infinity
  const allowed = Math.floor(attended / threshold - total)
  return allowed >= 0 ? allowed : 0
}

// if below threshold, returns minimum classes to attend consecutively to reach threshold
function neededToReach(attended, total, threshold){
  if((attended/total) >= threshold) return 0
  // solve for y: (attended + y)/(total + y) >= threshold
  const num = threshold*total - attended
  const denom = 1 - threshold
  if(denom <= 0) return Infinity
  return Math.ceil(num / denom)
}

export default function AttendanceTracker(){
  const [items, setItems] = useState(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : [
        {id:1, name:'Maths', attended:12, total:15},
        {id:2, name:'Physics', attended:10, total:14}
      ]
    }catch(e){
      return []
    }
  })
  const [threshold, setThreshold] = useState(()=>{
    try{ return parseFloat(localStorage.getItem('ssd:threshold')||DEFAULT_THRESHOLD) }catch(e){return DEFAULT_THRESHOLD}
  })

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },[items])

  useEffect(()=>{
    localStorage.setItem('ssd:threshold', String(threshold))
  },[threshold])

  function updateItem(id, patch){
    setItems(items.map(it => it.id===id ? {...it, ...patch} : it))
  }

  function addSubject(){
    const id = Date.now()
    setItems([...items, {id, name:'New Subject', attended:0, total:0}])
  }

  function removeSubject(id){
    setItems(items.filter(it=>it.id!==id))
  }

  return (
    <div className="attendance-root">
      <div className="threshold-row">
        <label>Threshold: <input type="number" step="0.01" min="0.01" max="0.99" value={threshold} onChange={e=>setThreshold(parseFloat(e.target.value)||0)} /></label>
        <button onClick={addSubject}>Add Subject</button>
      </div>

      <div className="attendance-list">
        {items.map(it=>{
          const pct = percent(it.attended, it.total)
          const allowed = allowedMisses(it.attended, it.total, threshold)
          const needed = (it.total===0) ? 0 : neededToReach(it.attended, it.total, threshold)
          return (
            <div className="attendance-item" key={it.id}>
              <input className="subj-name" value={it.name} onChange={e=>updateItem(it.id, {name:e.target.value})} />
              <div className="counts">
                <label>A: <input type="number" min="0" value={it.attended} onChange={e=>updateItem(it.id, {attended: Math.max(0, parseInt(e.target.value)||0)})} /></label>
                <label>T: <input type="number" min="0" value={it.total} onChange={e=>updateItem(it.id, {total: Math.max(0, parseInt(e.target.value)||0)})} /></label>
              </div>
              <div className="meta">
                <div>Attendance: {pct.toFixed(1)}%</div>
                { (it.total===0) ? <div className="muted">No classes yet</div> : (
                  allowed > 0 ? <div className="ok">You can miss {allowed} more class(es)</div>
                  : (pct >= threshold*100 ? <div className="ok">On track</div> : <div className="warn">Attend next {needed} class(es) to reach {Math.round(threshold*100)}%</div>)
                )}
              </div>
              <button className="remove" onClick={()=>removeSubject(it.id)}>Remove</button>
            </div>
          )
        })}
      </div>

    </div>
  )
}
