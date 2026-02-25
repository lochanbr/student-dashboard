import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:timetable:v1'
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat']
const SLOTS = ['08:00','10:00','12:00','14:00','16:00']

export default function Timetable(){
  const [grid, setGrid] = useState(()=>{
    try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {} }catch(e){return {}}
  })

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(grid)) },[grid])

  function setCell(day, slot, value){
    setGrid({...grid, [day+'-'+slot]: value})
  }

  return (
    <div className="timetable-root">
      <table className="timetable-table">
        <thead>
          <tr>
            <th></th>
            {DAYS.map(d=> <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map(slot=> (
            <tr key={slot}>
              <td className="slot-label">{slot}</td>
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
