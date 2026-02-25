import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:exams:v1'

function timeLeft(deadline){
  const now = new Date()
  const d = new Date(deadline) - now
  if(d<=0) return {days:0,hours:0,minutes:0,passed:true}
  const days = Math.floor(d / (1000*60*60*24))
  const hours = Math.floor((d % (1000*60*60*24)) / (1000*60*60))
  const minutes = Math.floor((d % (1000*60*60)) / (1000*60))
  const seconds = Math.floor((d % (1000*60)) / 1000)
  return {days,hours,minutes,seconds,passed:false}
}

export default function ExamCountdown(){
  const [items, setItems] = useState(()=>{
    try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [] }catch(e){return []}
  })
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) },[items])
  // update every second to show seconds ticking down
  useEffect(()=>{ const t = setInterval(()=>setItems(i=>[...i]), 1000); return ()=>clearInterval(t) },[])

  function add(){ if(!title||!date) return; setItems([{id:Date.now(), title, date}, ...items]); setTitle(''); setDate('') }
  function remove(id){ if(!window.confirm('Remove this exam?')) return; setItems(items.filter(i=>i.id!==id)) }

  return (
    <div className="exams-root">
      <div className="add-row">
        <input placeholder="Exam name" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>
      {items.length === 0 ? (
        <div className="muted">No upcoming exams! Relax.</div>
      ) : (
        <ul className="exam-list">
          {items.map(it=>{
            const t = timeLeft(it.date)
            return (
              <li key={it.id} className="exam-item">
                <div className="left">
                  <div className="title">{it.title}</div>
                  <div className="when">{it.date}</div>
                </div>
                <div className="countdown">
                  {t.passed ? <span className="passed">Passed</span> : <span>{t.days}d {t.hours}h {t.minutes}m {t.seconds}s</span>}
                </div>
                <button onClick={()=>remove(it.id)}>✕</button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
