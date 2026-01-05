import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

import Chatbot from '@site/src/components/Chatbot';

import CustomCursor from '@site/src/components/CustomCursor';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <AuthProvider>
            <CustomCursor />
            {children}
            <Chatbot />
        </AuthProvider>
    );
}
