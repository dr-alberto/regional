import { useState } from "react"

export const Button = ({text, url, target, onClick}) => {
    const [hover, setHover] = useState(false)

    return (
        <a
            href={url}
            onMouseEnter={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            target={target}
            onClick={onClick}
            className="flex gap-x-1 items-center w-fit rounded-full bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 cursor-pointer"
        >
            {text}
            {hover && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            )}
            {!hover && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            )}
        </a>
    )
}