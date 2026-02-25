import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:notes:v1'

function simpleMarkdown(md){
  if(!md) return ''
  let html = md
  html = html.replace(/^(#{1,6})\s*(.*)$/gm, (m, hashes, text)=>`<h${hashes.length}>${text}</h${hashes.length}>`)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/^-\s+(.*)$/gm, '<li>$1</li>')
  html = html.replace(/(?:\r\n|\r|\n){2,}/g, '<br/><br/>')
  // wrap list items
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
  return html
}

export default function Notes(){
  const [text, setText] = useState(()=>{
    try{ return localStorage.getItem(STORAGE_KEY) || '' }catch(e){return ''}
  })

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY, text) },[text])

  return (
    <div className="notes-root">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write markdown notes..."></textarea>
      <div className="preview" dangerouslySetInnerHTML={{__html: simpleMarkdown(text)}} />
    </div>
  )
}
