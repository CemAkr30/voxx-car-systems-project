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

                // Ana sayfaya yönlendir
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
            <div
                className="w-full lg:w-1/3 xl:w-1/4 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
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
                    </Card>
                </div>
            </div>

            {/* Sağ Taraf - Resim */}
            <div className="hidden lg:flex lg:w-2/3 xl:w-3/4 relative bg-gray-900">
                {/* Resim Container */}
                <div className="relative w-full h-full">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"/>

                    {/* Logo ve Metin Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
                        <div className="text-center space-y-6 max-w-2xl">
                            <h1 className="text-5xl font-bold mb-4">Voxx Car Systems</h1>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Gelişmiş araç yönetim sistemi ile filonuzu kontrol altında tutun. Gerçek zamanlı takip,
                                akıllı analiz ve
                                güvenli yönetim.
                            </p>
                            <div className="flex items-center justify-center space-x-8 mt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-300">24/7</div>
                                    <div className="text-sm text-blue-200">Monitoring</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-300">99.9%</div>
                                    <div className="text-sm text-blue-200">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-300">1000+</div>
                                    <div className="text-sm text-blue-200">Vehicles</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
