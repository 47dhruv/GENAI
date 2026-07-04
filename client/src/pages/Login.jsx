import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const response = await api.post('/auth/google', {
                credential: credentialResponse.credential,
            });

            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/');
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-(--background) text-(--text)">
            <div className="w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8 text-center">
                <h1 className="text-2xl font-semibold text-white">AI Persona Chat</h1>
                <p className="mt-2 text-sm text-[var(--muted)]">Sign in to start chatting with your personas.</p>

                <div className="mt-8 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.error('Google login failed')}
                    />
                </div>
            </div>
        </main>
    );
};

export default Login;