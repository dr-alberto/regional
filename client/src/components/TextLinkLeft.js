import { useState } from "react"

export const TextLinkLeft = ({text, url}) => {
    const [hover, setHover] = useState(false)

    return (
        <a
            href={url}
            onMouseEnter={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            className="flex gap-x-1 items-center text-sm font-bold leading-6 text-teal-600 hover:text-blue-900 w-fit"
        >
            {hover && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            )}
            {!hover && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            )}
            {text}
        </a>
    )
}