import {type NextRequest, NextResponse} from "next/server"

interface RefreshRequest {
    refresh_token: string
}

interface KeycloakTokenResponse {
    access_token: string
    refresh_token?: string
    token_type: string
    expires_in: number
    refresh_expires_in?: number
}

export async function POST(request: NextRequest) {
    try {
        const body: RefreshRequest = await request.json()
        const {refresh_token} = body

        if (!refresh_token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Refresh token gereklidir.",
                },
                {status: 400},
            )
        }

        // Keycloak token refresh endpoint'ine istek gönder
        const formData = new URLSearchParams()
        formData.append("client_id", "voxx-car-client")
        formData.append("grant_type", "refresh_token")
        formData.append("refresh_token", refresh_token)

        const keycloakResponse = await fetch(
            "http://localhost:8090/realms/voxx-car-systems/protocol/openid-connect/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        )

        if (keycloakResponse.ok) {
            const tokenData: KeycloakTokenResponse = await keycloakResponse.json()

            return NextResponse.json({
                success: true,
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                token_type: tokenData.token_type,
                expires_in: tokenData.expires_in,
                message: "Token yenilendi",
            })
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token yenilenemedi. Lütfen tekrar giriş yapın.",
                    error: "invalid_refresh_token",
                },
                {status: 401},
            )
        }
    } catch (error) {
        console.error("Token refresh error:", error)

        return NextResponse.json(
            {
                success: false,
                message: "Sunucu hatası. Lütfen tekrar deneyin.",
                error: "internal_server_error",
            },
            {status: 500},
        )
    }
}
