import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Landing from './pages/Landing.jsx';
import RequireAuth from '../src/components/auth/RequiredAuth.jsx';

const App = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="min-h-screen bg-(--background) text-(--text)">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/:personaId" element={<Login />} />
                <Route
                    path="/chat"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/chat/:personaId"
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