import { useEffect } from "react";


export default function PaymentSuccess() {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const session_id = searchParams.get("session_id")
    useEffect(() => {
        window.location.href = "/billing"
    }, [])

    return (
        <>
        Payment success: 
        <a href="/billing">
            Continue
        </a>
        </>
        
    )
}
