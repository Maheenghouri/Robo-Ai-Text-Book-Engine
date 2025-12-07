import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

import Chatbot from '@site/src/components/Chatbot';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <AuthProvider>
            {children}
            <Chatbot />
        </AuthProvider>
    );
}
