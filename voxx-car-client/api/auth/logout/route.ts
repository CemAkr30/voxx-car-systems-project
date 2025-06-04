import {type NextRequest, NextResponse} from "next/server"

interface LogoutRequest {
    refresh_token?: string
}

export async function POST(request: NextRequest) {
    try {
        const body: LogoutRequest = await request.json()
        const {refresh_token} = body

        if (refresh_token) {
            // Keycloak logout endpoint'ine istek gönder
            const formData = new URLSearchParams()
            formData.append("client_id", "voxx-car-client")
            formData.append("refresh_token", refresh_token)

            try {
                await fetch("http://localhost:8090/realms/voxx-car-systems/protocol/openid-connect/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: formData.toString(),
                })
            } catch (error) {
                console.error("Keycloak logout error:", error)
                // Keycloak logout hatası olsa bile client-side logout'u başarılı say
            }
        }

        return NextResponse.json({
            success: true,
            message: "Çıkış başarılı",
        })
    } catch (error) {
        console.error("Logout API error:", error)

        return NextResponse.json(
            {
                success: false,
                message: "Çıkış işlemi başarısız",
                error: "internal_server_error",
            },
            {status: 500},
        )
    }
}
