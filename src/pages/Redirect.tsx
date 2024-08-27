import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const Redirect = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean | null>(null);

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (!token) {
            setShouldRedirect(true);
        } else {
            setShouldRedirect(false);

        }
    }, []);
    if (shouldRedirect) {
        return <Navigate to="/login" />;
    }
    return (
        <div>Redirecting...</div>
    )
}

export default Redirect