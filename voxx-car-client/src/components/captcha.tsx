"use client"

import {useEffect, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RefreshCw} from "lucide-react"

interface CaptchaProps {
    onVerify: (isValid: boolean) => void
    value: string
    onChange: (value: string) => void
}

export function Captcha({onVerify, value, onChange}: CaptchaProps) {
    const [captchaCode, setCaptchaCode] = useState("")
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const generateCaptcha = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"
        let result = ""
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setCaptchaCode(result)
        return result
    }

    const drawCaptcha = (code: string) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Canvas boyutları
        canvas.width = 200
        canvas.height = 80

        // Arka plan
        const gradient = ctx.createLinearGradient(0, 0, 200, 80)
        gradient.addColorStop(0, "#f8fafc")
        gradient.addColorStop(0.5, "#e2e8f0")
        gradient.addColorStop(1, "#cbd5e1")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 200, 80)

        // Gürültü çizgileri
        ctx.strokeStyle = "#64748b"
        ctx.lineWidth = 1
        for (let i = 0; i < 8; i++) {
            ctx.beginPath()
            ctx.moveTo(Math.random() * 200, Math.random() * 80)
            ctx.lineTo(Math.random() * 200, Math.random() * 80)
            ctx.stroke()
        }

        // Gürültü noktaları
        ctx.fillStyle = "#475569"
        for (let i = 0; i < 50; i++) {
            ctx.fillRect(Math.random() * 200, Math.random() * 80, 2, 2)
        }

        // CAPTCHA metni
        ctx.font = "bold 24px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        const colors = ["#1e40af", "#dc2626", "#059669", "#7c2d12", "#4c1d95"]

        for (let i = 0; i < code.length; i++) {
            ctx.fillStyle = colors[i % colors.length]
            ctx.save()

            // Her harfi farklı açıda döndür
            const x = 35 + i * 25
            const y = 40 + (Math.random() - 0.5) * 10
            const angle = (Math.random() - 0.5) * 0.4

            ctx.translate(x, y)
            ctx.rotate(angle)
            ctx.fillText(code[i], 0, 0)
            ctx.restore()
        }

        // Çerçeve
        ctx.strokeStyle = "#334155"
        ctx.lineWidth = 2
        ctx.strokeRect(0, 0, 200, 80)
    }

    useEffect(() => {
        const code = generateCaptcha()
        drawCaptcha(code)
    }, [])

    useEffect(() => {
        const isValid = value.toLowerCase() === captchaCode.toLowerCase() && value.length > 0
        onVerify(isValid)
    }, [value, captchaCode, onVerify])

    const refreshCaptcha = () => {
        const newCode = generateCaptcha()
        drawCaptcha(newCode)
        onChange("")
    }

    return (
        <div className="space-y-3">
            <Label htmlFor="captcha">Güvenlik Kodu</Label>
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        className="border-2 border-gray-300 rounded-lg shadow-sm"
                        style={{imageRendering: "pixelated"}}
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"/>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={refreshCaptcha}
                    className="shrink-0"
                    title="Yeni kod oluştur"
                >
                    <RefreshCw className="h-4 w-4"/>
                </Button>
            </div>
            <Input
                id="captcha"
                type="text"
                placeholder="Yukarıdaki kodu girin"
                value={value}
                onChange={(e) => onChange(e.target.value.slice(0, 6))}
                className="uppercase tracking-wider"
                maxLength={6}
            />
            <p className="text-xs text-muted-foreground">Güvenlik kodu büyük/küçük harf duyarlı değildir</p>
        </div>
    )
}
