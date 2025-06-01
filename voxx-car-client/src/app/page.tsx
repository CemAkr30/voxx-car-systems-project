"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
        }
    }, [router]);

    if (!token) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-100">
                <p>Yönlendiriliyorsunuz...</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Hoşgeldiniz!</h1>
            <p className="text-gray-700">Giriş yaptınız ve token alındı.</p>
        </main>
    );
}
