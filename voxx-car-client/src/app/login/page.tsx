"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Loader2} from "lucide-react"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Giriş Yap</CardTitle>
                    <CardDescription className="text-center">Hesabınıza giriş yapmak için bilgilerinizi
                        girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Kullanıcı Adı</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Kullanıcı adınızı girin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Şifre</Label>
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    Şifremi unuttum
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Şifrenizi girin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                "Giriş Yap"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
