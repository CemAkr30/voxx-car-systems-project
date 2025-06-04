import {type NextRequest, NextResponse} from "next/server"

interface LoginRequest {
    username: string
    password: string
}

interface KeycloakTokenResponse {
    access_token: string
    refresh_token?: string
    token_type: string
    expires_in: number
    refresh_expires_in?: number
    scope?: string
}

interface KeycloakErrorResponse {
    error: string
    error_description: string
}

export async function POST(request: NextRequest) {
    try {
        const body: LoginRequest = await request.json()
        const {username, password} = body

        // Input validation
        if (!username || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kullanıcı adı ve şifre gereklidir.",
                },
                {status: 400},
            )
        }

        // Keycloak token endpoint'ine istek gönder
        const formData = new URLSearchParams()
        formData.append("client_id", "voxx-car-client")
        formData.append("grant_type", "password")
        formData.append("username", username)
        formData.append("password", password)

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

            // Başarılı response
            return NextResponse.json({
                success: true,
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                token_type: tokenData.token_type,
                expires_in: tokenData.expires_in,
                message: "Giriş başarılı",
            })
        } else {
            const errorData: KeycloakErrorResponse = await keycloakResponse.json()

            // Keycloak hata mesajlarını Türkçe'ye çevir
            let errorMessage = "Giriş başarısız. Lütfen bilgilerinizi kontrol edin."

            switch (errorData.error) {
                case "invalid_grant":
                    errorMessage = "Kullanıcı adı veya şifre hatalı."
                    break
                case "invalid_client":
                    errorMessage = "Geçersiz istemci."
                    break
                case "unauthorized_client":
                    errorMessage = "Yetkisiz istemci."
                    break
                case "unsupported_grant_type":
                    errorMessage = "Desteklenmeyen yetkilendirme türü."
                    break
                case "invalid_scope":
                    errorMessage = "Geçersiz kapsam."
                    break
                default:
                    if (errorData.error_description) {
                        errorMessage = errorData.error_description
                    }
            }

            return NextResponse.json(
                {
                    success: false,
                    message: errorMessage,
                    error: errorData.error,
                },
                {status: 401},
            )
        }
    } catch (error) {
        console.error("Login API error:", error)

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

// OPTIONS method for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    })
}
