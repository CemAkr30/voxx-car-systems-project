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
import {
    AlertTriangle,
    Building,
    Calendar,
    Car,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Download,
    Edit,
    Eye,
    FileIcon,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Trash,
    Trash2,
    X,
} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {format} from "date-fns"
import {tr} from "date-fns/locale"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Calendar as CalendarComponent} from "@/components/ui/calendar"

interface Arac {
    id: string
    plaka: string
    markaAdi: string
    modelAdi: string
}

interface Firma {
    id: string
    adi: string
}

interface Kaza {
    id: string
    aracFiloId: string
    aracPlaka: string
    aracMarka: string
    aracModel: string
    firmaId: string
    firmaAdi: string
    musteriId: string
    musteriAdi: string
    kazaTarihi: string
    kazaIli: string
    kazaNedeni: string
    kazaTutanagi: string
    onarimDurumu: string
    odeyenFirmaId: string
    odeyenFirmaAdi: string
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

const onarimDurumlari = ["Beklemede", "Onay Bekliyor", "Serviste", "Tamamlandı", "İptal Edildi"]

const iller = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
]

export function KazaManagement() {
    const [kazalar, setKazalar] = useState<Kaza[]>([])
    const [araclar, setAraclar] = useState<Arac[]>([])
    const [firmalar, setFirmalar] = useState<Firma[]>([])
    const [filteredKazalar, setFilteredKazalar] = useState<Kaza[]>([])
    const [paginatedKazalar, setPaginatedKazalar] = useState<Kaza[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    // Filtreler
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedAracFilter, setSelectedAracFilter] = useState<string>("all")
    const [selectedFirmaFilter, setSelectedFirmaFilter] = useState<string>("all")
    const [selectedIlFilter, setSelectedIlFilter] = useState<string>("all")
    const [selectedOnarimDurumuFilter, setSelectedOnarimDurumuFilter] = useState<string>("all")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Dialog durumları
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

    const [editingKaza, setEditingKaza] = useState<Kaza | null>(null)
    const [deletingKaza, setDeletingKaza] = useState<Kaza | null>(null)
    const [viewingKaza, setViewingKaza] = useState<Kaza | null>(null)

    const [formData, setFormData] = useState({
        aracFiloId: "",
        firmaId: "",
        musteriId: "",
        kazaTarihi: "",
        kazaIli: "",
        kazaNedeni: "",
        kazaTutanagi: "",
        onarimDurumu: "Beklemede",
        odeyenFirmaId: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Mock data
    useEffect(() => {
        // Araç mock data
        const mockAraclar: Arac[] = Array.from({length: 20}, (_, index) => {
            const markalar = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"]
            const modeller = ["Corolla", "Civic", "Focus", "3 Series", "C-Class"]

            return {
                id: (index + 1).toString(),
                plaka: `${34 + (index % 67)} ${String.fromCharCode(65 + (index % 26))}${String.fromCharCode(65 + ((index + 1) % 26))}${String.fromCharCode(65 + ((index + 2) % 26))} ${String(100 + (index % 900)).padStart(3, "0")}`,
                markaAdi: markalar[index % markalar.length],
                modelAdi: modeller[index % modeller.length],
            }
        })

        // Firma mock data
        const mockFirmalar: Firma[] = Array.from({length: 10}, (_, index) => {
            return {
                id: (index + 1).toString(),
                adi: `Firma ${index + 1}`,
            }
        })

        // Kaza mock data
        const mockKazalar: Kaza[] = Array.from({length: 50}, (_, index) => {
            const arac = mockAraclar[index % mockAraclar.length]
            const firma = mockFirmalar[index % mockFirmalar.length]
            const odeyenFirma = mockFirmalar[(index + 2) % mockFirmalar.length]

            const kazaTarihi = new Date()
            kazaTarihi.setDate(kazaTarihi.getDate() - index * 3)

            return {
                id: (index + 1).toString(),
                aracFiloId: arac.id,
                aracPlaka: arac.plaka,
                aracMarka: arac.markaAdi,
                aracModel: arac.modelAdi,
                firmaId: firma.id,
                firmaAdi: firma.adi,
                musteriId: `M-${1000 + index}`,
                musteriAdi: `Müşteri ${index + 1}`,
                kazaTarihi: kazaTarihi.toISOString(),
                kazaIli: iller[index % iller.length],
                kazaNedeni: `Kaza nedeni ${index + 1}`,
                kazaTutanagi: index % 3 === 0 ? "Var" : "Yok",
                onarimDurumu: onarimDurumlari[index % onarimDurumlari.length],
                odeyenFirmaId: odeyenFirma.id,
                odeyenFirmaAdi: odeyenFirma.adi,
                createdAt: new Date(2024, 0, (index % 30) + 1).toISOString(),
                updatedAt: new Date(2024, 0, (index % 30) + 1).toISOString(),
            }
        })

        setAraclar(mockAraclar)
        setFirmalar(mockFirmalar)
        setKazalar(mockKazalar)
        setFilteredKazalar(mockKazalar)
    }, [])

    // Filtreleme
    useEffect(() => {
        const filtered = kazalar.filter((kaza) => {
            const searchMatch =
                kaza.aracPlaka.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kaza.aracMarka.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kaza.aracModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kaza.firmaAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kaza.kazaIli.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kaza.kazaNedeni.toLowerCase().includes(searchTerm.toLowerCase())

            const aracMatch = selectedAracFilter === "all" || kaza.aracFiloId === selectedAracFilter
            const firmaMatch = selectedFirmaFilter === "all" || kaza.firmaId === selectedFirmaFilter
            const ilMatch = selectedIlFilter === "all" || kaza.kazaIli === selectedIlFilter
            const onarimDurumuMatch = selectedOnarimDurumuFilter === "all" || kaza.onarimDurumu === selectedOnarimDurumuFilter

            // Tarih filtresi
            let dateMatch = true
            if (selectedDate) {
                const kazaDate = new Date(kaza.kazaTarihi)
                dateMatch =
                    kazaDate.getDate() === selectedDate.getDate() &&
                    kazaDate.getMonth() === selectedDate.getMonth() &&
                    kazaDate.getFullYear() === selectedDate.getFullYear()
            }

            return searchMatch && aracMatch && firmaMatch && ilMatch && onarimDurumuMatch && dateMatch
        })

        setFilteredKazalar(filtered)
        setCurrentPage(1) // Reset to first page when filters change
    }, [
        kazalar,
        searchTerm,
        selectedAracFilter,
        selectedFirmaFilter,
        selectedIlFilter,
        selectedOnarimDurumuFilter,
        selectedDate,
    ])

    // Pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedKazalar(filteredKazalar.slice(startIndex, endIndex))
    }, [filteredKazalar, currentPage, itemsPerPage])

    // Pagination info
    const paginationInfo: PaginationInfo = {
        currentPage,
        totalPages: Math.ceil(filteredKazalar.length / itemsPerPage),
        totalItems: filteredKazalar.length,
        itemsPerPage,
        startItem: Math.min((currentPage - 1) * itemsPerPage + 1, filteredKazalar.length),
        endItem: Math.min(currentPage * itemsPerPage, filteredKazalar.length),
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(paginatedKazalar.map((item) => item.id))
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

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedAracFilter("all")
        setSelectedFirmaFilter("all")
        setSelectedIlFilter("all")
        setSelectedOnarimDurumuFilter("all")
        setSelectedDate(undefined)
    }

    const activeFilterCount = [
        searchTerm,
        selectedAracFilter !== "all" ? selectedAracFilter : null,
        selectedFirmaFilter !== "all" ? selectedFirmaFilter : null,
        selectedIlFilter !== "all" ? selectedIlFilter : null,
        selectedOnarimDurumuFilter !== "all" ? selectedOnarimDurumuFilter : null,
        selectedDate ? "date" : null,
    ].filter(Boolean).length

    // İstatistikler
    const stats = {
        toplam: kazalar.length,
        beklemede: kazalar.filter((k) => k.onarimDurumu === "Beklemede").length,
        serviste: kazalar.filter((k) => k.onarimDurumu === "Serviste").length,
        tamamlandi: kazalar.filter((k) => k.onarimDurumu === "Tamamlandı").length,
        tutanakli: kazalar.filter((k) => k.kazaTutanagi === "Var").length,
        filtrelenmis: filteredKazalar.length,
    }

    const openAddDialog = () => {
        setEditingKaza(null)
        setFormData({
            aracFiloId: "",
            firmaId: "",
            musteriId: "",
            kazaTarihi: new Date().toISOString(),
            kazaIli: "",
            kazaNedeni: "",
            kazaTutanagi: "Yok",
            onarimDurumu: "Beklemede",
            odeyenFirmaId: "",
        })
        setIsDialogOpen(true)
    }

    const openEditDialog = (kaza: Kaza) => {
        setEditingKaza(kaza)
        setFormData({
            aracFiloId: kaza.aracFiloId,
            firmaId: kaza.firmaId,
            musteriId: kaza.musteriId,
            kazaTarihi: kaza.kazaTarihi,
            kazaIli: kaza.kazaIli,
            kazaNedeni: kaza.kazaNedeni,
            kazaTutanagi: kaza.kazaTutanagi,
            onarimDurumu: kaza.onarimDurumu,
            odeyenFirmaId: kaza.odeyenFirmaId,
        })
        setIsDialogOpen(true)
    }

    const openDetailDialog = (kaza: Kaza) => {
        setViewingKaza(kaza)
        setIsDetailDialogOpen(true)
    }

    const openDeleteDialog = (kaza: Kaza) => {
        setDeletingKaza(kaza)
        setIsDeleteDialogOpen(true)
    }

    const handleSave = async () => {
        if (!formData.aracFiloId) {
            setError("Araç seçimi gereklidir")
            return
        }
        if (!formData.firmaId) {
            setError("Firma seçimi gereklidir")
            return
        }
        if (!formData.kazaTarihi) {
            setError("Kaza tarihi gereklidir")
            return
        }
        if (!formData.kazaIli) {
            setError("Kaza ili gereklidir")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const selectedArac = araclar.find((a) => a.id === formData.aracFiloId)
            const selectedFirma = firmalar.find((f) => f.id === formData.firmaId)
            const selectedOdeyenFirma = firmalar.find((f) => f.id === formData.odeyenFirmaId)

            if (editingKaza) {
                // Güncelleme
                setKazalar((prev) =>
                    prev.map((item) =>
                        item.id === editingKaza.id
                            ? {
                                ...item,
                                ...formData,
                                aracPlaka: selectedArac?.plaka || item.aracPlaka,
                                aracMarka: selectedArac?.markaAdi || item.aracMarka,
                                aracModel: selectedArac?.modelAdi || item.aracModel,
                                firmaAdi: selectedFirma?.adi || item.firmaAdi,
                                odeyenFirmaAdi: selectedOdeyenFirma?.adi || item.odeyenFirmaAdi,
                                updatedAt: new Date().toISOString(),
                            }
                            : item,
                    ),
                )
            } else {
                // Yeni ekleme
                const newKaza: Kaza = {
                    id: Date.now().toString(),
                    ...formData,
                    aracPlaka: selectedArac?.plaka || "",
                    aracMarka: selectedArac?.markaAdi || "",
                    aracModel: selectedArac?.modelAdi || "",
                    firmaAdi: selectedFirma?.adi || "",
                    musteriAdi: `Müşteri ${formData.musteriId}`,
                    odeyenFirmaAdi: selectedOdeyenFirma?.adi || "",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
                setKazalar((prev) => [...prev, newKaza])
            }

            setIsDialogOpen(false)
        } catch (err) {
            setError("İşlem başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deletingKaza) return

        setIsLoading(true)

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 500))

            setKazalar((prev) => prev.filter((item) => item.id !== deletingKaza.id))
            setIsDeleteDialogOpen(false)
            setDeletingKaza(null)
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
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setKazalar((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
            setSelectedItems([])
            setIsBulkDeleteDialogOpen(false)
        } catch (err) {
            setError("Toplu silme işlemi başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const exportToExcel = () => {
        // Excel export simülasyonu
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "ID,Araç Plaka,Marka/Model,Firma,Kaza Tarihi,Kaza İli,Kaza Nedeni,Tutanak,Onarım Durumu,Ödeyen Firma\n" +
            filteredKazalar
                .map(
                    (item) =>
                        `${item.id},${item.aracPlaka},${item.aracMarka} ${item.aracModel},${item.firmaAdi},${new Date(
                            item.kazaTarihi,
                        ).toLocaleDateString("tr-TR")},${item.kazaIli},${item.kazaNedeni},${item.kazaTutanagi},${
                            item.onarimDurumu
                        },${item.odeyenFirmaAdi}`,
                )
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "kazalar.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Kaza Yönetimi</h1>
                <p className="text-gray-600 mt-2">Araç kazalarını yönetin ve takip edin</p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">{stats.toplam}</div>
                        <p className="text-sm text-gray-600">Toplam Kaza</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-yellow-600">{stats.beklemede}</div>
                        <p className="text-sm text-gray-600">Beklemede</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">{stats.serviste}</div>
                        <p className="text-sm text-gray-600">Serviste</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">{stats.tamamlandi}</div>
                        <p className="text-sm text-gray-600">Tamamlandı</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">{stats.tutanakli}</div>
                        <p className="text-sm text-gray-600">Tutanaklı</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold text-gray-600">{stats.filtrelenmis}</div>
                        <p className="text-sm text-gray-600">Filtrelenmiş</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                            <Car className="h-5 w-5 mr-2"/>
                            Kaza Listesi
                            {activeFilterCount > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {activeFilterCount} filtre aktif
                                </Badge>
                            )}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button onClick={openAddDialog} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2"/>
                                Yeni Kaza Kaydı
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
                                        Excel ({filteredKazalar.length} kayıt)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filtreler */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                    <Input
                                        placeholder="Plaka, marka, model, firma, il ara..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 w-80"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsFilterDialogOpen(true)}
                                    className={activeFilterCount > 0 ? "border-blue-500 text-blue-600" : ""}
                                >
                                    <Filter className="h-4 w-4 mr-2"/>
                                    Gelişmiş Filtreler
                                    {activeFilterCount > 0 && (
                                        <Badge variant="secondary" className="ml-2">
                                            {activeFilterCount}
                                        </Badge>
                                    )}
                                </Button>
                                {activeFilterCount > 0 && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        <X className="h-4 w-4 mr-2"/>
                                        Filtreleri Temizle
                                    </Button>
                                )}
                            </div>
                            {selectedItems.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">{selectedItems.length} öğe seçili</Badge>
                                    <Button variant="destructive" size="sm"
                                            onClick={() => setIsBulkDeleteDialogOpen(true)}>
                                        <Trash className="h-4 w-4 mr-2"/>
                                        Seçilenleri Sil
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Quick Filters */}
                        <div className="flex items-center space-x-2 flex-wrap gap-2">
                            <Select value={selectedOnarimDurumuFilter} onValueChange={setSelectedOnarimDurumuFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Onarım Durumu"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                                    {onarimDurumlari.map((durum) => (
                                        <SelectItem key={durum} value={durum}>
                                            {durum}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-[240px] justify-start text-left font-normal ${
                                            selectedDate ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                    >
                                        <Calendar className="mr-2 h-4 w-4"/>
                                        {selectedDate ? format(selectedDate, "PPP", {locale: tr}) : "Tarih Seçin"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate}
                                                       initialFocus/>
                                </PopoverContent>
                            </Popover>
                        </div>
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
                                            checked={selectedItems.length === paginatedKazalar.length && paginatedKazalar.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Araç Plaka</TableHead>
                                    <TableHead>Firma</TableHead>
                                    <TableHead>Kaza Tarihi</TableHead>
                                    <TableHead>Kaza İli</TableHead>
                                    <TableHead>Tutanak</TableHead>
                                    <TableHead>Onarım Durumu</TableHead>
                                    <TableHead>Ödeyen Firma</TableHead>
                                    <TableHead className="w-12">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedKazalar.map((kaza) => (
                                    <TableRow key={kaza.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(kaza.id)}
                                                onCheckedChange={(checked) => handleSelectItem(kaza.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div>
                                                <div className="font-mono">{kaza.aracPlaka}</div>
                                                <div className="text-xs text-gray-500">
                                                    {kaza.aracMarka} {kaza.aracModel}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{kaza.firmaAdi}</TableCell>
                                        <TableCell>
                                            {new Date(kaza.kazaTarihi).toLocaleDateString("tr-TR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>{kaza.kazaIli}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    kaza.kazaTutanagi === "Var"
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                                }
                                            >
                                                {kaza.kazaTutanagi}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    kaza.onarimDurumu === "Tamamlandı"
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : kaza.onarimDurumu === "Serviste"
                                                            ? "bg-orange-50 text-orange-700 border-orange-200"
                                                            : kaza.onarimDurumu === "Beklemede"
                                                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                                : kaza.onarimDurumu === "İptal Edildi"
                                                                    ? "bg-red-50 text-red-700 border-red-200"
                                                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                                }
                                            >
                                                {kaza.onarimDurumu}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{kaza.odeyenFirmaAdi || "-"}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => openDetailDialog(kaza)}>
                                                        <Eye className="h-4 w-4 mr-2"/>
                                                        Detay
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openEditDialog(kaza)}>
                                                        <Edit className="h-4 w-4 mr-2"/>
                                                        Düzenle
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDeleteDialog(kaza)}
                                                                      className="text-red-600">
                                                        <Trash2 className="h-4 w-4 mr-2"/>
                                                        Sil
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
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

                    {filteredKazalar.length === 0 && (
                        <div className="text-center py-8">
                            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                            <p className="text-gray-500">Hiç kaza kaydı bulunamadı</p>
                            {activeFilterCount > 0 && (
                                <Button variant="outline" onClick={clearFilters} className="mt-2">
                                    Filtreleri Temizle
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Advanced Filters Dialog */}
            <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Gelişmiş Filtreler</DialogTitle>
                        <DialogDescription>Kaza listesini filtrelemek için kriterleri seçin</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Araç</Label>
                            <Select value={selectedAracFilter} onValueChange={setSelectedAracFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Araç seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm Araçlar</SelectItem>
                                    {araclar.map((arac) => (
                                        <SelectItem key={arac.id} value={arac.id}>
                                            {arac.plaka} - {arac.markaAdi} {arac.modelAdi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Firma</Label>
                            <Select value={selectedFirmaFilter} onValueChange={setSelectedFirmaFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Firma seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm Firmalar</SelectItem>
                                    {firmalar.map((firma) => (
                                        <SelectItem key={firma.id} value={firma.id}>
                                            {firma.adi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>İl</Label>
                            <Select value={selectedIlFilter} onValueChange={setSelectedIlFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="İl seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm İller</SelectItem>
                                    {iller.map((il) => (
                                        <SelectItem key={il} value={il}>
                                            {il}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Onarım Durumu</Label>
                            <Select value={selectedOnarimDurumuFilter} onValueChange={setSelectedOnarimDurumuFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Durum seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                                    {onarimDurumlari.map((durum) => (
                                        <SelectItem key={durum} value={durum}>
                                            {durum}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={clearFilters}>
                            Filtreleri Temizle
                        </Button>
                        <Button onClick={() => setIsFilterDialogOpen(false)}>Uygula</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingKaza ? "Kaza Kaydını Düzenle" : "Yeni Kaza Kaydı"}</DialogTitle>
                        <DialogDescription>
                            {editingKaza ? "Kaza bilgilerini güncelleyin" : "Yeni bir kaza kaydı ekleyin"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="aracFiloId">Araç</Label>
                            <Select
                                value={formData.aracFiloId}
                                onValueChange={(value) => setFormData({...formData, aracFiloId: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Araç seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {araclar.map((arac) => (
                                        <SelectItem key={arac.id} value={arac.id}>
                                            {arac.plaka} - {arac.markaAdi} {arac.modelAdi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="firmaId">Firma</Label>
                            <Select value={formData.firmaId}
                                    onValueChange={(value) => setFormData({...formData, firmaId: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Firma seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {firmalar.map((firma) => (
                                        <SelectItem key={firma.id} value={firma.id}>
                                            {firma.adi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="musteriId">Müşteri ID</Label>
                            <Input
                                id="musteriId"
                                value={formData.musteriId}
                                onChange={(e) => setFormData({...formData, musteriId: e.target.value})}
                                placeholder="Müşteri ID girin"
                            />
                        </div>
                        <div>
                            <Label htmlFor="kazaTarihi">Kaza Tarihi</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start text-left font-normal ${
                                            formData.kazaTarihi ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                    >
                                        <Calendar className="mr-2 h-4 w-4"/>
                                        {formData.kazaTarihi ? format(new Date(formData.kazaTarihi), "PPP", {locale: tr}) : "Tarih Seçin"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={formData.kazaTarihi ? new Date(formData.kazaTarihi) : undefined}
                                        onSelect={(date) => setFormData({
                                            ...formData,
                                            kazaTarihi: date ? date.toISOString() : ""
                                        })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label htmlFor="kazaIli">Kaza İli</Label>
                            <Select value={formData.kazaIli}
                                    onValueChange={(value) => setFormData({...formData, kazaIli: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="İl seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {iller.map((il) => (
                                        <SelectItem key={il} value={il}>
                                            {il}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="onarimDurumu">Onarım Durumu</Label>
                            <Select
                                value={formData.onarimDurumu}
                                onValueChange={(value) => setFormData({...formData, onarimDurumu: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Durum seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {onarimDurumlari.map((durum) => (
                                        <SelectItem key={durum} value={durum}>
                                            {durum}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="kazaTutanagi">Kaza Tutanağı</Label>
                            <Select
                                value={formData.kazaTutanagi}
                                onValueChange={(value) => setFormData({...formData, kazaTutanagi: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Tutanak durumu"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Var">Var</SelectItem>
                                    <SelectItem value="Yok">Yok</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="odeyenFirmaId">Ödeyen Firma</Label>
                            <Select
                                value={formData.odeyenFirmaId}
                                onValueChange={(value) => setFormData({...formData, odeyenFirmaId: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Firma seçin (opsiyonel)"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Seçilmedi</SelectItem>
                                    {firmalar.map((firma) => (
                                        <SelectItem key={firma.id} value={firma.id}>
                                            {firma.adi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="kazaNedeni">Kaza Nedeni</Label>
                            <Textarea
                                id="kazaNedeni"
                                value={formData.kazaNedeni}
                                onChange={(e) => setFormData({...formData, kazaNedeni: e.target.value})}
                                placeholder="Kaza nedeni açıklaması girin"
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            {editingKaza ? "Güncelle" : "Ekle"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Detail Dialog */}
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Kaza Detayları</DialogTitle>
                        <DialogDescription>
                            {viewingKaza?.aracPlaka} - {viewingKaza?.aracMarka} {viewingKaza?.aracModel}
                        </DialogDescription>
                    </DialogHeader>
                    {viewingKaza && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Car className="h-4 w-4 text-blue-600"/>
                                            <span className="font-medium">Araç Bilgileri</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <span className="text-gray-600">Plaka:</span> {viewingKaza.aracPlaka}
                                            </div>
                                            <div>
                                                <span
                                                    className="text-gray-600">Marka/Model:</span> {viewingKaza.aracMarka}{" "}
                                                {viewingKaza.aracModel}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Firma:</span> {viewingKaza.firmaAdi}
                                            </div>
                                            <div>
                                                <span
                                                    className="text-gray-600">Müşteri ID:</span> {viewingKaza.musteriId}
                                            </div>
                                            <div>
                                                <span
                                                    className="text-gray-600">Müşteri Adı:</span> {viewingKaza.musteriAdi}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Calendar className="h-4 w-4 text-green-600"/>
                                            <span className="font-medium">Kaza Bilgileri</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <span className="text-gray-600">Kaza Tarihi:</span>{" "}
                                                {new Date(viewingKaza.kazaTarihi).toLocaleDateString("tr-TR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Kaza İli:</span> {viewingKaza.kazaIli}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Tutanak:</span>{" "}
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        viewingKaza.kazaTutanagi === "Var"
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-gray-50 text-gray-700 border-gray-200"
                                                    }
                                                >
                                                    {viewingKaza.kazaTutanagi}
                                                </Badge>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Onarım Durumu:</span>{" "}
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        viewingKaza.onarimDurumu === "Tamamlandı"
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : viewingKaza.onarimDurumu === "Serviste"
                                                                ? "bg-orange-50 text-orange-700 border-orange-200"
                                                                : viewingKaza.onarimDurumu === "Beklemede"
                                                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                                    : viewingKaza.onarimDurumu === "İptal Edildi"
                                                                        ? "bg-red-50 text-red-700 border-red-200"
                                                                        : "bg-blue-50 text-blue-700 border-blue-200"
                                                    }
                                                >
                                                    {viewingKaza.onarimDurumu}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Building className="h-4 w-4 text-purple-600"/>
                                            <span className="font-medium">Ödeme Bilgileri</span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <span className="text-gray-600">Ödeyen Firma:</span>{" "}
                                                {viewingKaza.odeyenFirmaAdi || "Belirtilmemiş"}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Kayıt Tarihi:</span>{" "}
                                                {new Date(viewingKaza.createdAt).toLocaleDateString("tr-TR")}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Son Güncelleme:</span>{" "}
                                                {new Date(viewingKaza.updatedAt).toLocaleDateString("tr-TR")}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <FileIcon className="h-4 w-4 text-blue-600"/>
                                        <span className="font-medium">Kaza Nedeni</span>
                                    </div>
                                    <p className="text-gray-700">{viewingKaza.kazaNedeni || "Belirtilmemiş"}</p>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                                    Kapat
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsDetailDialogOpen(false)
                                        openEditDialog(viewingKaza)
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2"/>
                                    Düzenle
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Kaza Kaydını Sil</DialogTitle>
                        <DialogDescription>
                            {deletingKaza?.aracPlaka} plakalı araca ait kaza kaydını silmek istediğinizden emin misiniz?
                            Bu işlem geri
                            alınamaz.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
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
                        <DialogTitle>Seçili Kayıtları Sil</DialogTitle>
                        <DialogDescription>
                            {selectedItems.length} kaza kaydını silmek istediğinizden emin misiniz? Bu işlem geri
                            alınamaz.
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
        </div>
    )
}
