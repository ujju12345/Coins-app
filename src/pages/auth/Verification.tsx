import React, { useState, useRef, KeyboardEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import leafLogo from '../../assets/leaf.png';

const Verification: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { verifyOTP, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const code = verificationCode.join('');
        if (code.length === 4) {
            try {
                await verifyOTP(code);
                navigate('/dashboard');
            } catch (error) {
                console.error('Verification error:', error);
            }
        }
    };

    const handleBack = () => {
        navigate('/login');
        setVerificationCode(['', '', '', '']);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="flex mb-6">
                    <div className="w-16 h-16 rounded-lg flex justify-center">
                        <img src={leafLogo} alt="Logo" className="w-16 h-16 object-contain" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Code</h1>
                <p className="text-gray-500 mb-8">We have sent the verification code to your email address</p>

                <div className="flex gap-4 mb-8 justify-center">
                    {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={`w-16 h-16 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 ${digit ? 'border-green-800' : 'border-gray-300'
                                }`}
                        />
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleBack}
                        disabled={isLoading}
                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={verificationCode.some(digit => !digit) || isLoading}
                        className="flex-1 py-3 px-4 bg-green-800 text-white font-medium rounded-lg hover:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Verifying...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verification;
