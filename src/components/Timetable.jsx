import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:timetable:v1'
const SLOTS_KEY = 'ssd:slots:v1'
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat']
const DEFAULT_SLOTS = ['08:00','10:00','12:00','14:00','16:00']

export default function Timetable(){
  const [grid, setGrid] = useState(()=>{
    try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {} }catch(e){return {}}
  })

  const [slots, setSlots] = useState(()=>{
    try{ const raw = localStorage.getItem(SLOTS_KEY); return raw ? JSON.parse(raw) : DEFAULT_SLOTS }catch(e){return DEFAULT_SLOTS}
  })

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(grid)) },[grid])
  useEffect(()=>{ localStorage.setItem(SLOTS_KEY, JSON.stringify(slots)) },[slots])

  function setCell(day, slot, value){
    setGrid({...grid, [day+'-'+slot]: value})
  }

  function updateSlot(idx, value){
    setSlots(slots.map((s,i)=> i===idx ? value : s))
  }

  function addSlot(){
    setSlots([...slots, 'New'])
  }

  function removeSlot(idx){
    if(!window.confirm('Remove this time slot? Existing entries in this row will be cleared.')) return
    const slotToRemove = slots[idx]
    const newSlots = slots.filter((_,i)=>i!==idx)
    // remove grid entries for that slot
    const newGrid = {...grid}
    Object.keys(newGrid).forEach(k=>{ if(k.endsWith('-'+slotToRemove)) delete newGrid[k] })
    setSlots(newSlots)
    setGrid(newGrid)
  }

  return (
    <div className="timetable-root">
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <button onClick={addSlot}>Add Slot</button>
      </div>
      <table className="timetable-table">
        <thead>
          <tr>
            <th></th>
            {DAYS.map(d=> <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, idx)=> (
            <tr key={slot + '-' + idx}>
              <td className="slot-label">
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <input value={slot} onChange={e=>updateSlot(idx, e.target.value)} />
                  <button onClick={()=>removeSlot(idx)}>✕</button>
                </div>
              </td>
              {DAYS.map(day=>{
                const key = day+'-'+slot
                return (
                  <td key={key}>
                    <input value={grid[key]||''} onChange={e=>setCell(day, slot, e.target.value)} placeholder="Class" />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
