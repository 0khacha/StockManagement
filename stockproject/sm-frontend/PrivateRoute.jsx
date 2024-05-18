import React, { useContext } from 'react';

import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './src/AuthProvider.jsx';

const PrivateRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            element={isLoggedIn ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
