"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Bell,
    Car,
    ChevronDown,
    ChevronRight,
    Home,
    LogOut,
    MapPin,
    Menu,
    Settings,
    Terminal,
    User,
    X,
} from "lucide-react"
import {MarkaManagement} from "@/components/marka-management"
import {ModelManagement} from "@/components/model-management"
import {AracManagement} from "@/components/arac-management"
import {FirmaManagement} from "@/components/firma-management"
import {KazaManagement} from "@/components/kaza-management"

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeSection, setActiveSection] = useState("dashboard")
    const [activeSubSection, setActiveSubSection] = useState("")
    const [expandedSections, setExpandedSections] = useState<string[]>([])
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

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

    const navigationItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: Home,
            description: "Ana sayfa ve genel bakış",
        },
        {
            id: "arac",
            label: "Araç",
            icon: Car,
            description: "Araç yönetimi ve takibi",
            children: [
                {id: "marka", label: "Marka", description: "Araç markaları yönetimi"},
                {id: "model", label: "Model", description: "Araç modelleri yönetimi"},
                {id: "arac-listesi", label: "Araç Listesi", description: "Tüm araçlar"},
            ],
        },
        {
            id: "ssh",
            label: "SSH",
            icon: Terminal,
            description: "SSH bağlantıları ve terminal",
            children: [{id: "kaza", label: "Kaza", description: "Kaza kayıtları yönetimi"}],
        },
        {
            id: "adres",
            label: "Adres",
            icon: MapPin,
            description: "Adres yönetimi ve haritalar",
        },
    ]

    const handleSectionClick = (item: any) => {
        if (item.children) {
            toggleSection(item.id)
            if (!expandedSections.includes(item.id)) {
                setActiveSection(item.id)
                setActiveSubSection(item.children[0].id)
            }
        } else {
            setActiveSection(item.id)
            setActiveSubSection("")
        }
    }

    const renderContent = () => {
        if (activeSection === "arac") {
            if (activeSubSection === "marka") {
                return <MarkaManagement/>
            }
            if (activeSubSection === "model") {
                return <ModelManagement/>
            }
            if (activeSubSection === "arac-listesi") {
                return <AracManagement/>
            }
            return (
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Araç Yönetimi</h1>
                        <p className="text-gray-600 mt-2">Araç filosunu yönetin ve takip edin</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Car className="mr-2 h-5 w-5"/>
                                    Toplam Araçlar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">24</div>
                                <p className="text-sm text-gray-600">Aktif araç sayısı</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Aktif Sürücüler</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">18</div>
                                <p className="text-sm text-gray-600">Şu anda görevde</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Günlük Mesafe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,247 km</div>
                                <p className="text-sm text-gray-600">Bugün kat edilen</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
        }

        if (activeSection === "ssh") {
            if (activeSubSection === "kaza") {
                return <KazaManagement/>
            }
            return (
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">SSH Yönetimi</h1>
                        <p className="text-gray-600 mt-2">SSH bağlantıları ve terminal erişimi</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Terminal className="mr-2 h-5 w-5"/>
                                    Aktif Bağlantılar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-sm text-gray-600">Açık SSH oturumu</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Sunucu Durumu</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">Online</div>
                                <p className="text-sm text-gray-600">Tüm sunucular erişilebilir</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
        }

        if (activeSection === "adres") {
            return <FirmaManagement/>
        }

        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Voxx Car Systems'e hoş geldiniz</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <CardTitle className="text-sm font-medium">SSH Bağlantıları</CardTitle>
                            <Terminal className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">Aktif oturum</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Adres Kayıtları</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                            <p className="text-xs text-muted-foreground">Toplam adres</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sistem Durumu</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Online</div>
                            <p className="text-xs text-muted-foreground">Tüm sistemler çalışıyor</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-16"
                } bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        {sidebarOpen && (
                            <div className="flex items-center space-x-2">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Car className="h-5 w-5 text-white"/>
                                </div>
                                <span className="font-bold text-gray-900">Voxx Car</span>
                            </div>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                            {sidebarOpen ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
                        </Button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeSection === item.id
                        const isExpanded = expandedSections.includes(item.id)

                        return (
                            <div key={item.id}>
                                <button
                                    onClick={() => handleSectionClick(item)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                                        isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0"/>
                                    {sidebarOpen && (
                                        <>
                                            <span className="font-medium flex-1 text-left">{item.label}</span>
                                            {item.children && (
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}/>
                                            )}
                                        </>
                                    )}
                                </button>

                                {/* Child Items */}
                                {item.children && isExpanded && sidebarOpen && (
                                    <div className="ml-6 mt-2 space-y-1">
                                        {item.children.map((child) => (
                                            <button
                                                key={child.id}
                                                onClick={() => {
                                                    setActiveSection(item.id)
                                                    setActiveSubSection(child.id)
                                                }}
                                                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                                    activeSubSection === child.id
                                                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                            >
                                                <span>{child.label}</span>
                                                {activeSubSection === child.id &&
                                                    <ChevronRight className="h-3 w-3 ml-auto"/>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-200">
                    {sidebarOpen ? (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3 px-3 py-2">
                                <div className="bg-gray-300 p-2 rounded-full">
                                    <User className="h-4 w-4"/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{user}</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                                <LogOut className="h-4 w-4 mr-2"/>
                                Çıkış Yap
                            </Button>
                        </div>
                    ) : (
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full p-2">
                            <LogOut className="h-4 w-4"/>
                        </Button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {activeSubSection
                                    ? navigationItems
                                        .find((item) => item.id === activeSection)
                                        ?.children?.find((child) => child.id === activeSubSection)?.label
                                    : navigationItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="h-4 w-4"/>
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
            </div>
        </div>
    )
}
