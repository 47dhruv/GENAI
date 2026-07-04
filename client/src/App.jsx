import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import RequireAuth from '../src/components/auth/RequiredAuth.jsx';

const App = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="min-h-screen bg-(--background) text-(--text)">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
            </Routes>
        </div>
    </GoogleOAuthProvider>
);

export default App;