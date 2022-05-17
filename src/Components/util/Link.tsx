import Image from "next/image";

interface IconProps{
    alt: string
    img: string
    url: string
}

export  function Link(props: IconProps) {
    return (
        <a href={props.url} target="_blank" rel="noreferrer">
            <Image src={props.img} alt={props.alt} width={40} height={40}/>
        </a>
    )
  }