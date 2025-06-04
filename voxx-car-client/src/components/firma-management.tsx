"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Checkbox} from "@/components/ui/checkbox"
import {Badge} from "@/components/ui/badge"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    AlertTriangle,
    Building,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Download,
    Edit,
    ExternalLink,
    Eye,
    FileText,
    Globe,
    Mail,
    MapPin,
    MoreHorizontal,
    Phone,
    Plus,
    RefreshCw,
    Search,
    Trash,
    Trash2
} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Alert, AlertDescription} from "@/components/ui/alert"

// Enum tanımlamaları
enum AdresTipi {
    MERKEZ = "MERKEZ",
    SUBE = "SUBE",
    SHOWROOM = "SHOWROOM",
    SERVIS = "SERVIS",
    DEPO = "DEPO",
    FATURA = "FATURA",
    MUHASEBE = "MUHASEBE",
    TESLIMAT = "TESLIMAT",
    YETKILI_BAYI = "YETKILI_BAYI",
    DIGER = "DIGER",
}

enum IletisimTipi {
    TELEFON = "TELEFON",
    CEP_TELEFONU = "CEP_TELEFONU",
    FAKS = "FAKS",
    E_POSTA = "E_POSTA",
    WEB_SITESI = "WEB_SITESI",
    WHATSAPP = "WHATSAPP",
    LINKEDIN = "LINKEDIN",
    INSTAGRAM = "INSTAGRAM",
    FACEBOOK = "FACEBOOK",
    TWITTER = "TWITTER",
    DIGER = "DIGER",
}

// Enum etiketleri
const adresTipiLabels: Record<AdresTipi, string> = {
    [AdresTipi.MERKEZ]: "Merkez",
    [AdresTipi.SUBE]: "Şube",
    [AdresTipi.SHOWROOM]: "Showroom",
    [AdresTipi.SERVIS]: "Servis",
    [AdresTipi.DEPO]: "Depo",
    [AdresTipi.FATURA]: "Fatura",
    [AdresTipi.MUHASEBE]: "Muhasebe",
    [AdresTipi.TESLIMAT]: "Teslimat",
    [AdresTipi.YETKILI_BAYI]: "Yetkili Bayi",
    [AdresTipi.DIGER]: "Diğer",
}

const iletisimTipiLabels: Record<IletisimTipi, string> = {
    [IletisimTipi.TELEFON]: "Telefon",
    [IletisimTipi.CEP_TELEFONU]: "Cep Telefonu",
    [IletisimTipi.FAKS]: "Faks",
    [IletisimTipi.E_POSTA]: "E-posta",
    [IletisimTipi.WEB_SITESI]: "Web Sitesi",
    [IletisimTipi.WHATSAPP]: "WhatsApp",
    [IletisimTipi.LINKEDIN]: "LinkedIn",
    [IletisimTipi.INSTAGRAM]: "Instagram",
    [IletisimTipi.FACEBOOK]: "Facebook",
    [IletisimTipi.TWITTER]: "Twitter",
    [IletisimTipi.DIGER]: "Diğer",
}

// Enum renkleri
const adresTipiColors: Record<AdresTipi, string> = {
    [AdresTipi.MERKEZ]: "bg-blue-100 text-blue-800 border-blue-200",
    [AdresTipi.SUBE]: "bg-green-100 text-green-800 border-green-200",
    [AdresTipi.SHOWROOM]: "bg-purple-100 text-purple-800 border-purple-200",
    [AdresTipi.SERVIS]: "bg-orange-100 text-orange-800 border-orange-200",
    [AdresTipi.DEPO]: "bg-gray-100 text-gray-800 border-gray-200",
    [AdresTipi.FATURA]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [AdresTipi.MUHASEBE]: "bg-indigo-100 text-indigo-800 border-indigo-200",
    [AdresTipi.TESLIMAT]: "bg-pink-100 text-pink-800 border-pink-200",
    [AdresTipi.YETKILI_BAYI]: "bg-teal-100 text-teal-800 border-teal-200",
    [AdresTipi.DIGER]: "bg-gray-100 text-gray-800 border-gray-200",
}

const iletisimTipiColors: Record<IletisimTipi, string> = {
    [IletisimTipi.TELEFON]: "bg-blue-100 text-blue-800 border-blue-200",
    [IletisimTipi.CEP_TELEFONU]: "bg-green-100 text-green-800 border-green-200",
    [IletisimTipi.FAKS]: "bg-gray-100 text-gray-800 border-gray-200",
    [IletisimTipi.E_POSTA]: "bg-purple-100 text-purple-800 border-purple-200",
    [IletisimTipi.WEB_SITESI]: "bg-indigo-100 text-indigo-800 border-indigo-200",
    [IletisimTipi.WHATSAPP]: "bg-green-100 text-green-800 border-green-200",
    [IletisimTipi.LINKEDIN]: "bg-blue-100 text-blue-800 border-blue-200",
    [IletisimTipi.INSTAGRAM]: "bg-pink-100 text-pink-800 border-pink-200",
    [IletisimTipi.FACEBOOK]: "bg-blue-100 text-blue-800 border-blue-200",
    [IletisimTipi.TWITTER]: "bg-sky-100 text-sky-800 border-sky-200",
    [IletisimTipi.DIGER]: "bg-gray-100 text-gray-800 border-gray-200",
}

// Enum ikonları
const iletisimTipiIcons: Record<IletisimTipi, React.ReactNode> = {
    [IletisimTipi.TELEFON]: <Phone className="h-4 w-4"/>,
    [IletisimTipi.CEP_TELEFONU]: <Phone className="h-4 w-4"/>,
    [IletisimTipi.FAKS]: <Phone className="h-4 w-4"/>,
    [IletisimTipi.E_POSTA]: <Mail className="h-4 w-4"/>,
    [IletisimTipi.WEB_SITESI]: <Globe className="h-4 w-4"/>,
    [IletisimTipi.WHATSAPP]: <Phone className="h-4 w-4"/>,
    [IletisimTipi.LINKEDIN]: <ExternalLink className="h-4 w-4"/>,
    [IletisimTipi.INSTAGRAM]: <ExternalLink className="h-4 w-4"/>,
    [IletisimTipi.FACEBOOK]: <ExternalLink className="h-4 w-4"/>,
    [IletisimTipi.TWITTER]: <ExternalLink className="h-4 w-4"/>,
    [IletisimTipi.DIGER]: <ExternalLink className="h-4 w-4"/>,
}

// Interface tanımlamaları
interface Firma {
    id: string
    adi: string
    vergiNo: string
    vergiDairesi: string
    aciklama: string
    createdAt: string
    updatedAt: string
}

interface Adres {
    id: string
    firmaId: string
    tip: AdresTipi
    adres: string
    il: string
    ilce: string
    postaKodu: string
    aciklama: string
    createdAt: string
    updatedAt: string
}

interface Iletisim {
    id: string
    firmaId: string
    tip: IletisimTipi
    numara: string
    aciklama: string
    createdAt: string
    updatedAt: string
}

interface PaginationInfo {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    startItem: number
    endItem: number
}

export function FirmaManagement() {
    // State tanımlamaları
    const [firmalar, setFirmalar] = useState<Firma[]>([])
    const [adresler, setAdresler] = useState<Adres[]>([])
    const [iletisimler, setIletisimler] = useState<Iletisim[]>([])

    const [filteredFirmalar, setFilteredFirmalar] = useState<Firma[]>([])
    const [paginatedFirmalar, setPaginatedFirmalar] = useState<Firma[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    // Aktif firma ve detay tabı
    const [activeFirma, setActiveFirma] = useState<Firma | null>(null)
    const [activeTab, setActiveTab] = useState("genel")

    // Filtreler
    const [searchTerm, setSearchTerm] = useState("")

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Dialog durumları
    const [isFirmaDialogOpen, setIsFirmaDialogOpen] = useState(false)
    const [isAdresDialogOpen, setIsAdresDialogOpen] = useState(false)
    const [isIletisimDialogOpen, setIsIletisimDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

    // Düzenleme durumları
    const [editingFirma, setEditingFirma] = useState<Firma | null>(null)
    const [editingAdres, setEditingAdres] = useState<Adres | null>(null)
    const [editingIletisim, setEditingIletisim] = useState<Iletisim | null>(null)
    const [deletingFirma, setDeletingFirma] = useState<Firma | null>(null)

    // Form verileri
    const [firmaFormData, setFirmaFormData] = useState({
        adi: "",
        vergiNo: "",
        vergiDairesi: "",
        aciklama: "",
    })

    const [adresFormData, setAdresFormData] = useState({
        tip: AdresTipi.MERKEZ,
        adres: "",
        il: "",
        ilce: "",
        postaKodu: "",
        aciklama: "",
    })

    const [iletisimFormData, setIletisimFormData] = useState({
        tip: IletisimTipi.TELEFON,
        numara: "",
        aciklama: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Mock data oluşturma
    useEffect(() => {
        // Firma mock data
        const mockFirmalar: Firma[] = Array.from({length: 50}, (_, index) => {
            return {
                id: (index + 1).toString(),
                adi: `Firma ${index + 1}`,
                vergiNo: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                vergiDairesi: `${["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"][index % 5]} Vergi Dairesi`,
                aciklama: `Firma ${index + 1} açıklama bilgileri burada yer alacak.`,
                createdAt: new Date(2023, index % 12, (index % 28) + 1).toISOString().split("T")[0],
                updatedAt: new Date(2024, 0, (index % 30) + 1).toISOString().split("T")[0],
            }
        })

        // Adres mock data
        const mockAdresler: Adres[] = []
        mockFirmalar.forEach((firma) => {
            // Her firma için 1-3 adres oluştur
            const adresSayisi = Math.floor(Math.random() * 3) + 1
            for (let i = 0; i < adresSayisi; i++) {
                const adresTipleri = Object.values(AdresTipi)
                mockAdresler.push({
                    id: `adres-${mockAdresler.length + 1}`,
                    firmaId: firma.id,
                    tip: adresTipleri[i % adresTipleri.length],
                    adres: `${firma.adi} ${adresTipiLabels[adresTipleri[i % adresTipleri.length] as AdresTipi]} Adresi, No: ${Math.floor(Math.random() * 100) + 1}, Kat: ${Math.floor(Math.random() * 10) + 1}`,
                    il: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"][(firma.id.length + i) % 5],
                    ilce: ["Kadıköy", "Çankaya", "Konak", "Nilüfer", "Muratpaşa"][(firma.id.length + i) % 5],
                    postaKodu: Math.floor(10000 + Math.random() * 90000).toString(),
                    aciklama: `${firma.adi} ${adresTipiLabels[adresTipleri[i % adresTipleri.length] as AdresTipi]} adres açıklaması.`,
                    createdAt: firma.createdAt,
                    updatedAt: firma.updatedAt,
                })
            }
        })

        // İletişim mock data
        const mockIletisimler: Iletisim[] = []
        mockFirmalar.forEach((firma) => {
            // Her firma için 2-5 iletişim oluştur
            const iletisimSayisi = Math.floor(Math.random() * 4) + 2
            for (let i = 0; i < iletisimSayisi; i++) {
                const iletisimTipleri = Object.values(IletisimTipi)
                const tip = iletisimTipleri[i % iletisimTipleri.length] as IletisimTipi

                let numara = ""
                switch (tip) {
                    case IletisimTipi.TELEFON:
                    case IletisimTipi.CEP_TELEFONU:
                    case IletisimTipi.FAKS:
                        numara = `+90 ${Math.floor(500 + Math.random() * 500)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`
                        break
                    case IletisimTipi.E_POSTA:
                        numara = `info@${firma.adi.toLowerCase().replace(/\s+/g, "")}.com`
                        break
                    case IletisimTipi.WEB_SITESI:
                        numara = `www.${firma.adi.toLowerCase().replace(/\s+/g, "")}.com`
                        break
                    case IletisimTipi.WHATSAPP:
                        numara = `+90 ${Math.floor(500 + Math.random() * 500)}${Math.floor(100 + Math.random() * 900)}${Math.floor(1000 + Math.random() * 9000)}`
                        break
                    case IletisimTipi.LINKEDIN:
                    case IletisimTipi.INSTAGRAM:
                    case IletisimTipi.FACEBOOK:
                    case IletisimTipi.TWITTER:
                        numara = `@${firma.adi.toLowerCase().replace(/\s+/g, "")}`
                        break
                    default:
                        numara = `İletişim ${i + 1}`
                }

                mockIletisimler.push({
                    id: `iletisim-${mockIletisimler.length + 1}`,
                    firmaId: firma.id,
                    tip,
                    numara,
                    aciklama: `${firma.adi} ${iletisimTipiLabels[tip]} iletişim açıklaması.`,
                    createdAt: firma.createdAt,
                    updatedAt: firma.updatedAt,
                })
            }
        })

        setFirmalar(mockFirmalar)
        setFilteredFirmalar(mockFirmalar)
        setAdresler(mockAdresler)
        setIletisimler(mockIletisimler)
    }, [])

    // Filtreleme
    useEffect(() => {
        const filtered = firmalar.filter((firma) => {
            const searchMatch =
                firma.adi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                firma.vergiNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                firma.vergiDairesi.toLowerCase().includes(searchTerm.toLowerCase())

            return searchMatch
        })

        setFilteredFirmalar(filtered)
        setCurrentPage(1) // Reset to first page when filters change
    }, [firmalar, searchTerm])

    // Pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedFirmalar(filteredFirmalar.slice(startIndex, endIndex))
    }, [filteredFirmalar, currentPage, itemsPerPage])

    // Pagination info
    const paginationInfo: PaginationInfo = {
        currentPage,
        totalPages: Math.ceil(filteredFirmalar.length / itemsPerPage),
        totalItems: filteredFirmalar.length,
        itemsPerPage,
        startItem: Math.min((currentPage - 1) * itemsPerPage + 1, filteredFirmalar.length),
        endItem: Math.min(currentPage * itemsPerPage, filteredFirmalar.length),
    }

    // Firma ile ilişkili adres ve iletişim bilgilerini getir
    const getFirmaAdresler = (firmaId: string) => {
        return adresler.filter((adres) => adres.firmaId === firmaId)
    }

    const getFirmaIletisimler = (firmaId: string) => {
        return iletisimler.filter((iletisim) => iletisim.firmaId === firmaId)
    }

    // Seçim işlemleri
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(paginatedFirmalar.map((item) => item.id))
        } else {
            setSelectedItems([])
        }
    }

    const handleSelectItem = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, id])
        } else {
            setSelectedItems((prev) => prev.filter((item) => item !== id))
        }
    }

    // Dialog açma işlemleri
    const openFirmaDialog = (firma?: Firma) => {
        if (firma) {
            setEditingFirma(firma)
            setFirmaFormData({
                adi: firma.adi,
                vergiNo: firma.vergiNo,
                vergiDairesi: firma.vergiDairesi,
                aciklama: firma.aciklama,
            })
        } else {
            setEditingFirma(null)
            setFirmaFormData({
                adi: "",
                vergiNo: "",
                vergiDairesi: "",
                aciklama: "",
            })
        }
        setIsFirmaDialogOpen(true)
    }

    const openAdresDialog = (adres?: Adres) => {
        if (adres) {
            setEditingAdres(adres)
            setAdresFormData({
                tip: adres.tip,
                adres: adres.adres,
                il: adres.il,
                ilce: adres.ilce,
                postaKodu: adres.postaKodu,
                aciklama: adres.aciklama,
            })
        } else {
            setEditingAdres(null)
            setAdresFormData({
                tip: AdresTipi.MERKEZ,
                adres: "",
                il: "",
                ilce: "",
                postaKodu: "",
                aciklama: "",
            })
        }
        setIsAdresDialogOpen(true)
    }

    const openIletisimDialog = (iletisim?: Iletisim) => {
        if (iletisim) {
            setEditingIletisim(iletisim)
            setIletisimFormData({
                tip: iletisim.tip,
                numara: iletisim.numara,
                aciklama: iletisim.aciklama,
            })
        } else {
            setEditingIletisim(null)
            setIletisimFormData({
                tip: IletisimTipi.TELEFON,
                numara: "",
                aciklama: "",
            })
        }
        setIsIletisimDialogOpen(true)
    }

    const openDeleteDialog = (firma: Firma) => {
        setDeletingFirma(firma)
        setIsDeleteDialogOpen(true)
    }

    const openDetailDialog = (firma: Firma) => {
        setActiveFirma(firma)
        setActiveTab("genel")
        setIsDetailDialogOpen(true)
    }

    // Kaydetme işlemleri
    const handleSaveFirma = async () => {
        if (!firmaFormData.adi.trim()) {
            setError("Firma adı gereklidir")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (editingFirma) {
                // Güncelleme
                setFirmalar((prev) =>
                    prev.map((item) =>
                        item.id === editingFirma.id
                            ? {
                                ...item,
                                ...firmaFormData,
                                updatedAt: new Date().toISOString().split("T")[0],
                            }
                            : item,
                    ),
                )
            } else {
                // Yeni ekleme
                const newFirma: Firma = {
                    id: Date.now().toString(),
                    ...firmaFormData,
                    createdAt: new Date().toISOString().split("T")[0],
                    updatedAt: new Date().toISOString().split("T")[0],
                }
                setFirmalar((prev) => [...prev, newFirma])
            }

            setIsFirmaDialogOpen(false)
        } catch (err) {
            setError("İşlem başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSaveAdres = async () => {
        if (!adresFormData.adres.trim()) {
            setError("Adres gereklidir")
            return
        }

        if (!activeFirma && !editingAdres) {
            setError("Firma seçilmelidir")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (editingAdres) {
                // Güncelleme
                setAdresler((prev) =>
                    prev.map((item) =>
                        item.id === editingAdres.id
                            ? {
                                ...item,
                                ...adresFormData,
                                updatedAt: new Date().toISOString().split("T")[0],
                            }
                            : item,
                    ),
                )
            } else {
                // Yeni ekleme
                const newAdres: Adres = {
                    id: `adres-${Date.now()}`,
                    firmaId: activeFirma!.id,
                    ...adresFormData,
                    createdAt: new Date().toISOString().split("T")[0],
                    updatedAt: new Date().toISOString().split("T")[0],
                }
                setAdresler((prev) => [...prev, newAdres])
            }

            setIsAdresDialogOpen(false)
        } catch (err) {
            setError("İşlem başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSaveIletisim = async () => {
        if (!iletisimFormData.numara.trim()) {
            setError("İletişim numarası/değeri gereklidir")
            return
        }

        if (!activeFirma && !editingIletisim) {
            setError("Firma seçilmelidir")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (editingIletisim) {
                // Güncelleme
                setIletisimler((prev) =>
                    prev.map((item) =>
                        item.id === editingIletisim.id
                            ? {
                                ...item,
                                ...iletisimFormData,
                                updatedAt: new Date().toISOString().split("T")[0],
                            }
                            : item,
                    ),
                )
            } else {
                // Yeni ekleme
                const newIletisim: Iletisim = {
                    id: `iletisim-${Date.now()}`,
                    firmaId: activeFirma!.id,
                    ...iletisimFormData,
                    createdAt: new Date().toISOString().split("T")[0],
                    updatedAt: new Date().toISOString().split("T")[0],
                }
                setIletisimler((prev) => [...prev, newIletisim])
            }

            setIsIletisimDialogOpen(false)
        } catch (err) {
            setError("İşlem başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    // Silme işlemleri
    const handleDeleteFirma = async () => {
        if (!deletingFirma) return

        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Firma ile ilişkili adres ve iletişim bilgilerini de sil
            setAdresler((prev) => prev.filter((item) => item.firmaId !== deletingFirma.id))
            setIletisimler((prev) => prev.filter((item) => item.firmaId !== deletingFirma.id))

            // Firmayı sil
            setFirmalar((prev) => prev.filter((item) => item.id !== deletingFirma.id))

            setIsDeleteDialogOpen(false)
            setDeletingFirma(null)
        } catch (err) {
            setError("Silme işlemi başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteAdres = async (adres: Adres) => {
        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            setAdresler((prev) => prev.filter((item) => item.id !== adres.id))
        } catch (err) {
            setError("Silme işlemi başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteIletisim = async (iletisim: Iletisim) => {
        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            setIletisimler((prev) => prev.filter((item) => item.id !== iletisim.id))
        } catch (err) {
            setError("Silme işlemi başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return

        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Seçili firmalar ile ilişkili adres ve iletişim bilgilerini de sil
            setAdresler((prev) => prev.filter((item) => !selectedItems.includes(item.firmaId)))
            setIletisimler((prev) => prev.filter((item) => !selectedItems.includes(item.firmaId)))

            // Seçili firmaları sil
            setFirmalar((prev) => prev.filter((item) => !selectedItems.includes(item.id)))

            setSelectedItems([])
            setIsBulkDeleteDialogOpen(false)
        } catch (err) {
            setError("Toplu silme işlemi başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    // Export işlemleri
    const exportToExcel = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "ID,Firma Adı,Vergi No,Vergi Dairesi,Açıklama,Oluşturulma Tarihi,Güncellenme Tarihi\n" +
            filteredFirmalar
                .map(
                    (item) =>
                        `${item.id},${item.adi},${item.vergiNo},${item.vergiDairesi},"${item.aciklama}",${item.createdAt},${item.updatedAt}`,
                )
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "firmalar.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // İstatistikler
    const stats = {
        toplam: firmalar.length,
        adresSayisi: adresler.length,
        iletisimSayisi: iletisimler.length,
        filtrelenmis: filteredFirmalar.length,
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Firma Yönetimi</h1>
                <p className="text-gray-600 mt-2">Firma, adres ve iletişim bilgilerini yönetin</p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">{stats.toplam}</div>
                        <p className="text-sm text-gray-600">Toplam Firma</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">{stats.adresSayisi}</div>
                        <p className="text-sm text-gray-600">Toplam Adres</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">{stats.iletisimSayisi}</div>
                        <p className="text-sm text-gray-600">Toplam İletişim</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">{stats.filtrelenmis}</div>
                        <p className="text-sm text-gray-600">Filtrelenmiş</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                            <Building className="h-5 w-5 mr-2"/>
                            Firma Listesi
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button onClick={() => openFirmaDialog()} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2"/>
                                Yeni Firma
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Download className="h-4 w-4 mr-2"/>
                                        Dışa Aktar
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={exportToExcel}>
                                        <FileText className="h-4 w-4 mr-2"/>
                                        Excel ({filteredFirmalar.length} kayıt)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filtreler */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                <Input
                                    placeholder="Firma adı, vergi no veya vergi dairesi ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-80"
                                />
                            </div>
                        </div>
                        {selectedItems.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <Badge variant="secondary">{selectedItems.length} öğe seçili</Badge>
                                <Button variant="destructive" size="sm" onClick={() => setIsBulkDeleteDialogOpen(true)}>
                                    <Trash className="h-4 w-4 mr-2"/>
                                    Seçilenleri Sil
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Pagination Info */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                            {paginationInfo.totalItems > 0 ? (
                                <>
                                    {paginationInfo.startItem}-{paginationInfo.endItem} arası,
                                    toplam {paginationInfo.totalItems} kayıt
                                </>
                            ) : (
                                "Kayıt bulunamadı"
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Sayfa başına:</span>
                            <Select
                                value={itemsPerPage.toString()}
                                onValueChange={(value) => {
                                    setItemsPerPage(Number.parseInt(value))
                                    setCurrentPage(1)
                                }}
                            >
                                <SelectTrigger className="w-20">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Tablo */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedItems.length === paginatedFirmalar.length && paginatedFirmalar.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Firma Adı</TableHead>
                                    <TableHead>Vergi No</TableHead>
                                    <TableHead>Vergi Dairesi</TableHead>
                                    <TableHead>Adres Sayısı</TableHead>
                                    <TableHead>İletişim Sayısı</TableHead>
                                    <TableHead className="w-12">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedFirmalar.map((firma) => {
                                    const firmaAdresler = getFirmaAdresler(firma.id)
                                    const firmaIletisimler = getFirmaIletisimler(firma.id)

                                    return (
                                        <TableRow key={firma.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedItems.includes(firma.id)}
                                                    onCheckedChange={(checked) => handleSelectItem(firma.id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{firma.adi}</TableCell>
                                            <TableCell>{firma.vergiNo}</TableCell>
                                            <TableCell>{firma.vergiDairesi}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline"
                                                       className="bg-blue-50 text-blue-700 border-blue-200">
                                                    {firmaAdresler.length}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline"
                                                       className="bg-purple-50 text-purple-700 border-purple-200">
                                                    {firmaIletisimler.length}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4"/>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => openDetailDialog(firma)}>
                                                            <Eye className="h-4 w-4 mr-2"/>
                                                            Detay
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openFirmaDialog(firma)}>
                                                            <Edit className="h-4 w-4 mr-2"/>
                                                            Düzenle
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openDeleteDialog(firma)}
                                                                          className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2"/>
                                                            Sil
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {paginationInfo.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-600">
                                Sayfa {paginationInfo.currentPage} / {paginationInfo.totalPages}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}>
                                    <ChevronsLeft className="h-4 w-4"/>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4"/>
                                </Button>

                                {/* Page numbers */}
                                {Array.from({length: Math.min(5, paginationInfo.totalPages)}, (_, i) => {
                                    let pageNum: number
                                    if (paginationInfo.totalPages <= 5) {
                                        pageNum = i + 1
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1
                                    } else if (currentPage >= paginationInfo.totalPages - 2) {
                                        pageNum = paginationInfo.totalPages - 4 + i
                                    } else {
                                        pageNum = currentPage - 2 + i
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </Button>
                                    )
                                })}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === paginationInfo.totalPages}
                                >
                                    <ChevronRight className="h-4 w-4"/>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(paginationInfo.totalPages)}
                                    disabled={currentPage === paginationInfo.totalPages}
                                >
                                    <ChevronsRight className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    )}

                    {filteredFirmalar.length === 0 && (
                        <div className="text-center py-8">
                            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                            <p className="text-gray-500">Hiç firma bulunamadı</p>
                            {searchTerm && (
                                <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
                                    Filtreleri Temizle
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Firma Dialog */}
            <Dialog open={isFirmaDialogOpen} onOpenChange={setIsFirmaDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingFirma ? "Firma Düzenle" : "Yeni Firma Ekle"}</DialogTitle>
                        <DialogDescription>
                            {editingFirma ? "Firma bilgilerini güncelleyin" : "Yeni bir firma ekleyin"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="adi">Firma Adı</Label>
                            <Input
                                id="adi"
                                value={firmaFormData.adi}
                                onChange={(e) => setFirmaFormData({...firmaFormData, adi: e.target.value})}
                                placeholder="Firma adını girin"
                            />
                        </div>
                        <div>
                            <Label htmlFor="vergiNo">Vergi No</Label>
                            <Input
                                id="vergiNo"
                                value={firmaFormData.vergiNo}
                                onChange={(e) => setFirmaFormData({...firmaFormData, vergiNo: e.target.value})}
                                placeholder="Vergi numarasını girin"
                            />
                        </div>
                        <div>
                            <Label htmlFor="vergiDairesi">Vergi Dairesi</Label>
                            <Input
                                id="vergiDairesi"
                                value={firmaFormData.vergiDairesi}
                                onChange={(e) => setFirmaFormData({...firmaFormData, vergiDairesi: e.target.value})}
                                placeholder="Vergi dairesini girin"
                            />
                        </div>
                        <div>
                            <Label htmlFor="aciklama">Açıklama</Label>
                            <Textarea
                                id="aciklama"
                                value={firmaFormData.aciklama}
                                onChange={(e) => setFirmaFormData({...firmaFormData, aciklama: e.target.value})}
                                placeholder="Firma hakkında açıklama girin"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsFirmaDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleSaveFirma} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            {editingFirma ? "Güncelle" : "Ekle"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Adres Dialog */}
            <Dialog open={isAdresDialogOpen} onOpenChange={setIsAdresDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingAdres ? "Adres Düzenle" : "Yeni Adres Ekle"}</DialogTitle>
                        <DialogDescription>
                            {editingAdres ? "Adres bilgilerini güncelleyin" : "Yeni bir adres ekleyin"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="tip">Adres Tipi</Label>
                            <Select
                                value={adresFormData.tip}
                                onValueChange={(value) => setAdresFormData({...adresFormData, tip: value as AdresTipi})}
                            >
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(AdresTipi).map((tip) => (
                                        <SelectItem key={tip} value={tip}>
                                            {adresTipiLabels[tip]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="adres">Adres</Label>
                            <Textarea
                                id="adres"
                                value={adresFormData.adres}
                                onChange={(e) => setAdresFormData({...adresFormData, adres: e.target.value})}
                                placeholder="Adres bilgisini girin"
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="il">İl</Label>
                                <Input
                                    id="il"
                                    value={adresFormData.il}
                                    onChange={(e) => setAdresFormData({...adresFormData, il: e.target.value})}
                                    placeholder="İl girin"
                                />
                            </div>
                            <div>
                                <Label htmlFor="ilce">İlçe</Label>
                                <Input
                                    id="ilce"
                                    value={adresFormData.ilce}
                                    onChange={(e) => setAdresFormData({...adresFormData, ilce: e.target.value})}
                                    placeholder="İlçe girin"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="postaKodu">Posta Kodu</Label>
                            <Input
                                id="postaKodu"
                                value={adresFormData.postaKodu}
                                onChange={(e) => setAdresFormData({...adresFormData, postaKodu: e.target.value})}
                                placeholder="Posta kodu girin"
                            />
                        </div>
                        <div>
                            <Label htmlFor="aciklama">Açıklama</Label>
                            <Input
                                id="aciklama"
                                value={adresFormData.aciklama}
                                onChange={(e) => setAdresFormData({...adresFormData, aciklama: e.target.value})}
                                placeholder="Adres hakkında açıklama girin"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAdresDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleSaveAdres} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            {editingAdres ? "Güncelle" : "Ekle"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* İletişim Dialog */}
            <Dialog open={isIletisimDialogOpen} onOpenChange={setIsIletisimDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingIletisim ? "İletişim Düzenle" : "Yeni İletişim Ekle"}</DialogTitle>
                        <DialogDescription>
                            {editingIletisim ? "İletişim bilgilerini güncelleyin" : "Yeni bir iletişim bilgisi ekleyin"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="tip">İletişim Tipi</Label>
                            <Select
                                value={iletisimFormData.tip}
                                onValueChange={(value) => setIletisimFormData({
                                    ...iletisimFormData,
                                    tip: value as IletisimTipi
                                })}
                            >
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(IletisimTipi).map((tip) => (
                                        <SelectItem key={tip} value={tip}>
                                            {iletisimTipiLabels[tip]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="numara">
                                {iletisimFormData.tip === IletisimTipi.E_POSTA
                                    ? "E-posta"
                                    : iletisimFormData.tip === IletisimTipi.WEB_SITESI
                                        ? "Web Sitesi"
                                        : iletisimFormData.tip === IletisimTipi.LINKEDIN ||
                                        iletisimFormData.tip === IletisimTipi.INSTAGRAM ||
                                        iletisimFormData.tip === IletisimTipi.FACEBOOK ||
                                        iletisimFormData.tip === IletisimTipi.TWITTER
                                            ? "Kullanıcı Adı"
                                            : "Numara"}
                            </Label>
                            <Input
                                id="numara"
                                value={iletisimFormData.numara}
                                onChange={(e) => setIletisimFormData({...iletisimFormData, numara: e.target.value})}
                                placeholder={
                                    iletisimFormData.tip === IletisimTipi.E_POSTA
                                        ? "E-posta adresini girin"
                                        : iletisimFormData.tip === IletisimTipi.WEB_SITESI
                                            ? "Web sitesi adresini girin"
                                            : iletisimFormData.tip === IletisimTipi.LINKEDIN ||
                                            iletisimFormData.tip === IletisimTipi.INSTAGRAM ||
                                            iletisimFormData.tip === IletisimTipi.FACEBOOK ||
                                            iletisimFormData.tip === IletisimTipi.TWITTER
                                                ? "Kullanıcı adını girin"
                                                : "Numarayı girin"
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="aciklama">Açıklama</Label>
                            <Input
                                id="aciklama"
                                value={iletisimFormData.aciklama}
                                onChange={(e) => setIletisimFormData({...iletisimFormData, aciklama: e.target.value})}
                                placeholder="İletişim hakkında açıklama girin"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsIletisimDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleSaveIletisim} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            {editingIletisim ? "Güncelle" : "Ekle"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Firma Sil</DialogTitle>
                        <DialogDescription>
                            "{deletingFirma?.adi}" firmasını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz
                            ve firmaya ait
                            tüm adres ve iletişim bilgileri de silinecektir.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteFirma} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            Sil
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Bulk Delete Dialog */}
            <Dialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Seçili Firmaları Sil</DialogTitle>
                        <DialogDescription>
                            {selectedItems.length} firmayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve
                            firmalara ait
                            tüm adres ve iletişim bilgileri de silinecektir.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBulkDeleteDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button variant="destructive" onClick={handleBulkDelete} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            Tümünü Sil
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Detail Dialog */}
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} className="max-w-4xl">
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{activeFirma?.adi}</DialogTitle>
                        <DialogDescription>
                            Vergi No: {activeFirma?.vergiNo} | Vergi Dairesi: {activeFirma?.vergiDairesi}
                        </DialogDescription>
                    </DialogHeader>

                    {activeFirma && (
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-3 mb-4">
                                <TabsTrigger value="genel">Genel Bilgiler</TabsTrigger>
                                <TabsTrigger value="adresler">
                                    Adresler ({getFirmaAdresler(activeFirma.id).length})
                                </TabsTrigger>
                                <TabsTrigger value="iletisim">
                                    İletişim ({getFirmaIletisimler(activeFirma.id).length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="genel" className="space-y-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="font-medium text-gray-700">Firma Adı</h3>
                                                <p>{activeFirma.adi}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-700">Vergi No</h3>
                                                <p>{activeFirma.vergiNo}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-700">Vergi Dairesi</h3>
                                                <p>{activeFirma.vergiDairesi}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-700">Kayıt Tarihi</h3>
                                                <p>{activeFirma.createdAt}</p>
                                            </div>
                                        </div>
                                        {activeFirma.aciklama && (
                                            <div className="mt-4">
                                                <h3 className="font-medium text-gray-700">Açıklama</h3>
                                                <p className="text-gray-600">{activeFirma.aciklama}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                                        Kapat
                                    </Button>
                                    <Button onClick={() => openFirmaDialog(activeFirma)}>
                                        <Edit className="h-4 w-4 mr-2"/>
                                        Düzenle
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="adresler" className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">Adres Bilgileri</h3>
                                    <Button onClick={() => openAdresDialog()}>
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Yeni Adres
                                    </Button>
                                </div>

                                {getFirmaAdresler(activeFirma.id).length > 0 ? (
                                    <div className="space-y-4">
                                        {getFirmaAdresler(activeFirma.i).map((adres) => (
                                            <Card key={adres.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <Badge className={adresTipiColors[adres.tip]}>
                                                                    <MapPin className="h-3 w-3 mr-1"/>
                                                                    {adresTipiLabels[adres.tip]}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-gray-900 mb-2">{adres.adres}</p>
                                                            <div className="text-sm text-gray-600">
                                                                <p>
                                                                    {adres.il} / {adres.ilce} - {adres.postaKodu}
                                                                </p>
                                                                {adres.aciklama &&
                                                                    <p className="mt-1">{adres.aciklama}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button variant="outline" size="sm"
                                                                    onClick={() => openAdresDialog(adres)}>
                                                                <Edit className="h-4 w-4"/>
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDeleteAdres(adres)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                                        <p className="text-gray-500">Henüz adres bilgisi eklenmemiş</p>
                                        <Button onClick={() => openAdresDialog()} className="mt-2">
                                            <Plus className="h-4 w-4 mr-2"/>
                                            İlk Adresi Ekle
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="iletisim" className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">İletişim Bilgileri</h3>
                                    <Button onClick={() => openIletisimDialog()}>
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Yeni İletişim
                                    </Button>
                                </div>

                                {getFirmaIletisimler(activeFirma.id).length > 0 ? (
                                    <div className="space-y-4">
                                        {getFirmaIletisimler(activeFirma.id).map((iletisim) => (
                                            <Card key={iletisim.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <Badge className={iletisimTipiColors[iletisim.tip]}>
                                                                    {iletisimTipiIcons[iletisim.tip]}
                                                                    <span
                                                                        className="ml-1">{iletisimTipiLabels[iletisim.tip]}</span>
                                                                </Badge>
                                                            </div>
                                                            <p className="text-gray-900 mb-1">{iletisim.numara}</p>
                                                            {iletisim.aciklama && (
                                                                <p className="text-sm text-gray-600">{iletisim.aciklama}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button variant="outline" size="sm"
                                                                    onClick={() => openIletisimDialog(iletisim)}>
                                                                <Edit className="h-4 w-4"/>
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleDeleteIletisim(iletisim)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                                        <p className="text-gray-500">Henüz iletişim bilgisi eklenmemiş</p>
                                        <Button onClick={() => openIletisimDialog()} className="mt-2">
                                            <Plus className="h-4 w-4 mr-2"/>
                                            İlk İletişimi Ekle
                                        </Button>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
