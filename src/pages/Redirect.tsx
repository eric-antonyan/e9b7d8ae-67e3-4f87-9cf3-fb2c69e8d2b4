import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const Redirect = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean | null>(null);
    const [isSet, setIsSet] = useState<boolean | null>(null)

    useEffect(() => {
        const token = Cookies.get('access_token');
        setIsSet(true);
        if (!token) {
            setShouldRedirect(true);
        } else {
            setShouldRedirect(false);

        }
    }, []);
    if (isSet) {
        if (shouldRedirect) {
            return <Navigate to="/login" />;
        } else {
            return <Navigate to="/account" />
        }
    } else {
        return <div></div>
}

export default Redirect
