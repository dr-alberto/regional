import { useState } from "react"

export const TextLink = ({text, url}) => {
    const [hover, setHover] = useState(false)

    return (
        <a
            href={url}
            onMouseEnter={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            className="flex gap-x-1 items-center text-sm font-bold leading-6 text-teal-600 hover:text-blue-900"
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