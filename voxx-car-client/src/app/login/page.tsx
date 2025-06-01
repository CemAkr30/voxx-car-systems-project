"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const body = new URLSearchParams({
            client_id: "voxx-car-client",
            username,
            password,
            grant_type: "password",
        });

        try {
            const res = await fetch(
                "http://localhost:8090/realms/voxx-car-systems/protocol/openid-connect/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: body.toString(),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error_description || "Login failed");
            }

            const data = await res.json();
            // Token bilgilerini localStorage'a kaydet
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("token_type", data.token_type);
            localStorage.setItem("expires_in", data.expires_in.toString());

            alert("Giriş başarılı!");
            router.push("/"); // Anasayfaya yönlendir
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                    Giriş Yap
                </h1>

                <label className="mb-2 block font-medium text-gray-700" htmlFor="username">
                    Kullanıcı Adı
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    placeholder="Kullanıcı adınızı girin"
                />

                <label className="mb-2 block font-medium text-gray-700" htmlFor="password">
                    Şifre
                </label>

                <div className="relative mb-6">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 pr-10 focus:border-indigo-500 focus:outline-none"
                        placeholder="Şifrenizi girin"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-gray-600 hover:text-indigo-600 focus:outline-none"
                        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-9-7s4-7 9-7c1.326 0 2.6.315 3.75.875M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

                <button
                    onClick={handleLogin}
                    disabled={loading || !username || !password}
                    className="w-full rounded bg-indigo-600 py-2 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                    {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
            </div>
        </main>
    );
}
