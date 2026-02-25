import React, {useEffect, useState} from 'react'

const STORAGE_KEY = 'ssd:notes:v1'

function simpleMarkdown(md){
  if(!md) return ''
  let html = md
  // headings
  html = html.replace(/^(#{1,6})\s*(.*)$/gm, (m, hashes, text)=>`<h${hashes.length}>${text}</h${hashes.length}>`)
  // bold / italic / code
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // lines starting with '- ' become list items
  html = html.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>')

  // Group consecutive <li>...</li> blocks into a single <ul>...</ul>
  html = html.replace(/(?:\s*<li>[\s\S]*?<\/li>\s*)+/g, match => {
    const inner = match.trim()
    return `<ul>${inner}</ul>`
  })

  // preserve blank lines as paragraph breaks
  html = html.replace(/(?:\r\n|\r|\n){2,}/g, '<br/><br/>')
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
