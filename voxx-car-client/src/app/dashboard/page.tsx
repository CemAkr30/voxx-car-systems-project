"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {Separator} from "@/components/ui/separator"
import {
    AlertTriangle,
    Battery,
    Bell,
    Car,
    CheckCircle,
    Clock,
    Gauge,
    LogOut,
    MapPin,
    Settings,
    Thermometer,
    TrendingUp,
    User,
} from "lucide-react"

export default function Dashboard() {
    const [user, setUser] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        // Token kontrolü
        const token = localStorage.getItem("access_token")
        if (!token) {
            router.push("/login")
            return
        }

        // Token'dan kullanıcı bilgisi çıkar (basit örnek)
        setUser("Admin User")
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        router.push("/login")
    }

    const vehicleData = [
        {id: "VX001", model: "Tesla Model S", status: "active", battery: 85, location: "İstanbul"},
        {id: "VX002", model: "BMW i8", status: "maintenance", battery: 45, location: "Ankara"},
        {id: "VX003", model: "Audi e-tron", status: "active", battery: 92, location: "İzmir"},
        {id: "VX004", model: "Mercedes EQS", status: "charging", battery: 67, location: "Bursa"},
    ]

    const systemAlerts = [
        {type: "warning", message: "VX002 bakım gerekiyor", time: "2 saat önce"},
        {type: "info", message: "Sistem güncellemesi tamamlandı", time: "5 saat önce"},
        {type: "success", message: "Yeni araç VX005 sisteme eklendi", time: "1 gün önce"},
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Car className="h-8 w-8 text-blue-600 mr-3"/>
                            <h1 className="text-xl font-bold text-gray-900">Voxx Car Systems</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="h-4 w-4"/>
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4"/>
                            </Button>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4"/>
                                <span className="text-sm font-medium">{user}</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2"/>
                                Çıkış
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Araç</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">+2 bu ay</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aktif Araçlar</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18</div>
                            <p className="text-xs text-muted-foreground">%75 aktif oran</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ortalama Batarya</CardTitle>
                            <Battery className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">72%</div>
                            <p className="text-xs text-muted-foreground">+5% bu hafta</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sistem Durumu</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.8%</div>
                            <p className="text-xs text-muted-foreground">Uptime</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Vehicle List */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Araç Listesi</CardTitle>
                                <CardDescription>Sistemdeki tüm araçların durumu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {vehicleData.map((vehicle) => (
                                        <div key={vehicle.id}
                                             className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <Car className="h-8 w-8 text-blue-600"/>
                                                <div>
                                                    <p className="font-medium">{vehicle.model}</p>
                                                    <p className="text-sm text-muted-foreground">ID: {vehicle.id}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <div className="flex items-center space-x-2">
                                                        <Battery className="h-4 w-4"/>
                                                        <span className="text-sm font-medium">{vehicle.battery}%</span>
                                                    </div>
                                                    <Progress value={vehicle.battery} className="w-20 mt-1"/>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="h-3 w-3"/>
                                                        <span className="text-xs">{vehicle.location}</span>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            vehicle.status === "active"
                                                                ? "default"
                                                                : vehicle.status === "charging"
                                                                    ? "secondary"
                                                                    : "destructive"
                                                        }
                                                        className="mt-1"
                                                    >
                                                        {vehicle.status === "active" ? "Aktif" : vehicle.status === "charging" ? "Şarjda" : "Bakım"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Alerts & System Status */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sistem Uyarıları</CardTitle>
                                <CardDescription>Son sistem bildirimleri</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {systemAlerts.map((alert, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            {alert.type === "warning" &&
                                                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5"/>}
                                            {alert.type === "info" && <Bell className="h-4 w-4 text-blue-500 mt-0.5"/>}
                                            {alert.type === "success" &&
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5"/>}
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{alert.message}</p>
                                                <p className="text-xs text-muted-foreground flex items-center mt-1">
                                                    <Clock className="h-3 w-3 mr-1"/>
                                                    {alert.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sistem Performansı</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>CPU Kullanımı</span>
                                        <span>45%</span>
                                    </div>
                                    <Progress value={45}/>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Bellek Kullanımı</span>
                                        <span>62%</span>
                                    </div>
                                    <Progress value={62}/>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Disk Kullanımı</span>
                                        <span>38%</span>
                                    </div>
                                    <Progress value={38}/>
                                </div>
                                <Separator/>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Sistem Sıcaklığı</span>
                                    <div className="flex items-center space-x-1">
                                        <Thermometer className="h-4 w-4 text-orange-500"/>
                                        <span className="text-sm">42°C</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Quick Actions */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Hızlı İşlemler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-20 flex-col">
                                <Car className="h-6 w-6 mb-2"/>
                                Yeni Araç Ekle
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <Gauge className="h-6 w-6 mb-2"/>
                                Sistem Taraması
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <Settings className="h-6 w-6 mb-2"/>
                                Ayarlar
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <TrendingUp className="h-6 w-6 mb-2"/>
                                Raporlar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
