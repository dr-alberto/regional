import { createContext, useReducer, useEffect } from 'react';

export const OrganizationContext = createContext()

export const organizationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORGANIZATION': 
            return { organization: action.payload } 
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        default:
            return state
    }
}

export const OrganizationContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(organizationReducer, {
        organization: null,
        loading: true
    })

    useEffect(() => {
        async function fetchOrganization() {
            const user = JSON.parse(localStorage.getItem('user'))

            if (user) {
                const response = await fetch('/organizations', {
                    method: 'GET',
                    headers: {"x-access-token": user.token},
                })
        
                const data = await response.json()
        
                if (data) {
                    dispatch({type: 'SET_ORGANIZATION', payload: data})
                }
            }

            dispatch({ type: 'SET_LOADING', payload: false });
        }

        fetchOrganization()
        

    }, [])

    return !state.loading && (
        <OrganizationContext.Provider value={{...state, dispatch}}>
            { children }
        </OrganizationContext.Provider>
    )
}