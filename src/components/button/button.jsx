import React from 'react'

export default function Button({styles,text,clickfunc}) {
  return (
    <button  className={styles} onClick={clickfunc}>
        {text}    
    </button>
  )
}
