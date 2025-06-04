"use client"

import type React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Loader2, Shield} from "lucide-react"
import {Captcha} from "@/components/captcha"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [captchaValue, setCaptchaValue] = useState("")
    const [isCaptchaValid, setIsCaptchaValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isCaptchaValid) {
            setError("Lütfen güvenlik kodunu doğru girin.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const formData = new URLSearchParams()
            formData.append("client_id", "voxx-car-client")
            formData.append("grant_type", "password")
            formData.append("username", username)
            formData.append("password", password)

            const response = await fetch("http://localhost:8090/realms/voxx-car-systems/protocol/openid-connect/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            })

            if (response.ok) {
                const data = await response.json()

                // Token'ları localStorage'a kaydet
                localStorage.setItem("access_token", data.access_token)
                if (data.refresh_token) {
                    localStorage.setItem("refresh_token", data.refresh_token)
                }

                // Dashboard'a yönlendir
                router.push("/dashboard")
            } else {
                const errorData = await response.json()
                setError(errorData.error_description || "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.")
            }
        } catch (err) {
            setError("Bağlantı hatası. Lütfen tekrar deneyin.")
            console.error("Login error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Sol Taraf - Login Form */}
            <div className="w-full lg:w-1/3 xl:w-1/4 flex bg-white">
                <Card className="w-full h-full rounded-none border-0 shadow-none">
                    <div className="flex flex-col justify-center h-full px-8 py-12">
                        <CardHeader className="space-y-1 pb-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-blue-600 p-3 rounded-full">
                                    <Shield className="h-6 w-6 text-white"/>
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center text-gray-900">Güvenli
                                Giriş</CardTitle>
                            <CardDescription className="text-center text-gray-600">
                                Hesabınıza giriş yapmak için bilgilerinizi girin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {error && (
                                <Alert variant="destructive" className="border-red-200 bg-red-50">
                                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-gray-700 font-medium">
                                        Kullanıcı Adı
                                    </Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Kullanıcı adınızı girin"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 font-medium">
                                        Şifre
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Şifrenizi girin"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Captcha onVerify={setIsCaptchaValid} value={captchaValue}
                                             onChange={setCaptchaValue}/>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                                    disabled={isLoading || !isCaptchaValid}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            Giriş yapılıyor...
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="mr-2 h-4 w-4"/>
                                            Güvenli Giriş
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </div>
                </Card>
            </div>

            {/* Sağ Taraf - Resim */}
            <div className="hidden lg:flex lg:w-2/3 xl:w-3/4 relative bg-gray-900 overflow-hidden">
                {/* Animated Background Gradient */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 animate-gradient-shift"/>

                {/* Floating Particles */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float-slow opacity-60"/>
                    <div
                        className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float-medium opacity-40"/>
                    <div
                        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-float-fast opacity-50"/>
                    <div
                        className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-300 rounded-full animate-float-slow opacity-30"/>
                    <div
                        className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float-medium opacity-40"/>
                </div>

                {/* Resim Container */}
                <div className="relative w-full h-full">
                    {/* Animated Overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/20 animate-pulse-slow"/>

                    {/* Logo ve Metin Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
                        <div className="text-center space-y-6 max-w-2xl">
                            {/* Ana Başlık - Fade in animasyonu */}
                            <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">Voxx Car Systems</h1>

                            {/* Alt Metin - Gecikmeli fade in */}
                            <p className="text-xl text-blue-100 leading-relaxed animate-fade-in-up-delay">
                                Gelişmiş araç yönetim sistemi ile filonuzu kontrol altında tutun. Gerçek zamanlı takip,
                                akıllı analiz ve
                                güvenli yönetim.
                            </p>

                            {/* İstatistikler - Staggered animasyon */}
                            <div className="flex items-center justify-center space-x-8 mt-8">
                                <div
                                    className="text-center animate-fade-in-up-delay-1 hover:scale-110 transition-transform duration-300">
                                    <div className="text-3xl font-bold text-blue-300 animate-pulse-number">24/7</div>
                                    <div className="text-sm text-blue-200">Monitoring</div>
                                </div>
                                <div
                                    className="text-center animate-fade-in-up-delay-2 hover:scale-110 transition-transform duration-300">
                                    <div className="text-3xl font-bold text-blue-300 animate-pulse-number">99.9%</div>
                                    <div className="text-sm text-blue-200">Uptime</div>
                                </div>
                                <div
                                    className="text-center animate-fade-in-up-delay-3 hover:scale-110 transition-transform duration-300">
                                    <div className="text-3xl font-bold text-blue-300 animate-pulse-number">1000+</div>
                                    <div className="text-sm text-blue-200">Vehicles</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% {
                        background: linear-gradient(135deg, #1e3a8a, #312e81, #581c87);
                    }
                    50% {
                        background: linear-gradient(135deg, #1e40af, #3730a3, #6b21a8);
                    }
                }

                @keyframes float-slow {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    66% {
                        transform: translateY(10px) translateX(-5px);
                    }
                }

                @keyframes float-medium {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(-15px) translateX(15px);
                    }
                }

                @keyframes float-fast {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    25% {
                        transform: translateY(-10px) translateX(5px);
                    }
                    75% {
                        transform: translateY(5px) translateX(-10px);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.1;
                    }
                }

                @keyframes pulse-number {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                .animate-gradient-shift {
                    animation: gradient-shift 8s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }

                .animate-float-medium {
                    animation: float-medium 4s ease-in-out infinite;
                }

                .animate-float-fast {
                    animation: float-fast 3s ease-in-out infinite;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }

                .animate-fade-in-up-delay {
                    animation: fade-in-up 1s ease-out 0.3s both;
                }

                .animate-fade-in-up-delay-1 {
                    animation: fade-in-up 1s ease-out 0.6s both;
                }

                .animate-fade-in-up-delay-2 {
                    animation: fade-in-up 1s ease-out 0.8s both;
                }

                .animate-fade-in-up-delay-3 {
                    animation: fade-in-up 1s ease-out 1s both;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-pulse-number {
                    animation: pulse-number 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
