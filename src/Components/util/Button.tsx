import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<any>{
    title:      string
    className:  string
} 

export  function Button({title,className,...rest} : Props) {
  return (
    <button {...rest} className={className}>
        <p>
            {title}
        </p>
    </button>
  )
}
