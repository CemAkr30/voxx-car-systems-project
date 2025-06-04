"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {
    AlertTriangle,
    Car,
    Download,
    Edit,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Trash,
    Trash2
} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Alert, AlertDescription} from "@/components/ui/alert"

interface Marka {
    id: string
    adi: string
}

interface Model {
    id: string
    adi: string
    markaId: string
    markaAdi: string
    createdAt: string
    updatedAt: string
}

export function ModelManagement() {
    const [modeller, setModeller] = useState<Model[]>([])
    const [markalar, setMarkalar] = useState<Marka[]>([])
    const [filteredModeller, setFilteredModeller] = useState<Model[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedMarkaFilter, setSelectedMarkaFilter] = useState<string>("all")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
    const [editingModel, setEditingModel] = useState<Model | null>(null)
    const [deletingModel, setDeletingModel] = useState<Model | null>(null)
    const [formData, setFormData] = useState({adi: "", markaId: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Mock data - gerçek uygulamada API'den gelecek
    useEffect(() => {
        const mockMarkalar: Marka[] = [
            {id: "1", adi: "Toyota"},
            {id: "2", adi: "Honda"},
            {id: "3", adi: "Ford"},
            {id: "4", adi: "BMW"},
            {id: "5", adi: "Mercedes"},
            {id: "6", adi: "Audi"},
            {id: "7", adi: "Volkswagen"},
            {id: "8", adi: "Nissan"},
        ]

        const mockModeller: Model[] = [
            {
                id: "1",
                adi: "Corolla",
                markaId: "1",
                markaAdi: "Toyota",
                createdAt: "2024-01-15",
                updatedAt: "2024-01-15"
            },
            {id: "2", adi: "Camry", markaId: "1", markaAdi: "Toyota", createdAt: "2024-01-16", updatedAt: "2024-01-16"},
            {id: "3", adi: "Civic", markaId: "2", markaAdi: "Honda", createdAt: "2024-01-17", updatedAt: "2024-01-17"},
            {id: "4", adi: "Accord", markaId: "2", markaAdi: "Honda", createdAt: "2024-01-18", updatedAt: "2024-01-18"},
            {id: "5", adi: "Focus", markaId: "3", markaAdi: "Ford", createdAt: "2024-01-19", updatedAt: "2024-01-19"},
            {id: "6", adi: "Fiesta", markaId: "3", markaAdi: "Ford", createdAt: "2024-01-20", updatedAt: "2024-01-20"},
            {id: "7", adi: "3 Series", markaId: "4", markaAdi: "BMW", createdAt: "2024-01-21", updatedAt: "2024-01-21"},
            {id: "8", adi: "5 Series", markaId: "4", markaAdi: "BMW", createdAt: "2024-01-22", updatedAt: "2024-01-22"},
            {
                id: "9",
                adi: "C-Class",
                markaId: "5",
                markaAdi: "Mercedes",
                createdAt: "2024-01-23",
                updatedAt: "2024-01-23"
            },
            {
                id: "10",
                adi: "E-Class",
                markaId: "5",
                markaAdi: "Mercedes",
                createdAt: "2024-01-24",
                updatedAt: "2024-01-24"
            },
            {id: "11", adi: "A4", markaId: "6", markaAdi: "Audi", createdAt: "2024-01-25", updatedAt: "2024-01-25"},
            {id: "12", adi: "A6", markaId: "6", markaAdi: "Audi", createdAt: "2024-01-26", updatedAt: "2024-01-26"},
        ]

        setMarkalar(mockMarkalar)
        setModeller(mockModeller)
        setFilteredModeller(mockModeller)
    }, [])

    // Filtreleme
    useEffect(() => {
        let filtered = modeller.filter((model) => model.adi.toLowerCase().includes(searchTerm.toLowerCase()))

        if (selectedMarkaFilter !== "all") {
            filtered = filtered.filter((model) => model.markaId === selectedMarkaFilter)
        }

        setFilteredModeller(filtered)
    }, [modeller, searchTerm, selectedMarkaFilter])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(filteredModeller.map((item) => item.id))
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

    const openAddDialog = () => {
        setEditingModel(null)
        setFormData({adi: "", markaId: ""})
        setIsDialogOpen(true)
    }

    const openEditDialog = (model: Model) => {
        setEditingModel(model)
        setFormData({adi: model.adi, markaId: model.markaId})
        setIsDialogOpen(true)
    }

    const openDeleteDialog = (model: Model) => {
        setDeletingModel(model)
        setIsDeleteDialogOpen(true)
    }

    const handleSave = async () => {
        if (!formData.adi.trim()) {
            setError("Model adı gereklidir")
            return
        }
        if (!formData.markaId) {
            setError("Marka seçimi gereklidir")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const selectedMarka = markalar.find((m) => m.id === formData.markaId)

            if (editingModel) {
                // Güncelleme
                setModeller((prev) =>
                    prev.map((item) =>
                        item.id === editingModel.id
                            ? {
                                ...item,
                                adi: formData.adi,
                                markaId: formData.markaId,
                                markaAdi: selectedMarka?.adi || "",
                                updatedAt: new Date().toISOString().split("T")[0],
                            }
                            : item,
                    ),
                )
            } else {
                // Yeni ekleme
                const newModel: Model = {
                    id: Date.now().toString(),
                    adi: formData.adi,
                    markaId: formData.markaId,
                    markaAdi: selectedMarka?.adi || "",
                    createdAt: new Date().toISOString().split("T")[0],
                    updatedAt: new Date().toISOString().split("T")[0],
                }
                setModeller((prev) => [...prev, newModel])
            }

            setIsDialogOpen(false)
            setFormData({adi: "", markaId: ""})
        } catch (err) {
            setError("İşlem başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deletingModel) return

        setIsLoading(true)

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 500))

            setModeller((prev) => prev.filter((item) => item.id !== deletingModel.id))
            setIsDeleteDialogOpen(false)
            setDeletingModel(null)
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

            setModeller((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
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
            "ID,Model Adı,Marka,Oluşturulma Tarihi,Güncellenme Tarihi\n" +
            filteredModeller
                .map((item) => `${item.id},${item.adi},${item.markaAdi},${item.createdAt},${item.updatedAt}`)
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "modeller.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const exportToPDF = () => {
        // PDF export simülasyonu
        alert("PDF export özelliği yakında eklenecek")
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedMarkaFilter("all")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Model Yönetimi</h1>
                <p className="text-gray-600 mt-2">Araç modellerini yönetin</p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                            <Car className="h-5 w-5 mr-2"/>
                            Model Listesi
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button onClick={openAddDialog} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2"/>
                                Yeni Model
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
                                        Excel
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={exportToPDF}>
                                        <FileText className="h-4 w-4 mr-2"/>
                                        PDF
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filtreler ve Arama */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                <Input
                                    placeholder="Model ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Select value={selectedMarkaFilter} onValueChange={setSelectedMarkaFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Marka seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tüm Markalar</SelectItem>
                                    {markalar.map((marka) => (
                                        <SelectItem key={marka.id} value={marka.id}>
                                            {marka.adi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm" onClick={clearFilters}>
                                <Filter className="h-4 w-4 mr-2"/>
                                Filtreleri Temizle
                            </Button>
                            <Button variant="outline" size="sm">
                                <RefreshCw className="h-4 w-4 mr-2"/>
                                Yenile
                            </Button>
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

                    {/* İstatistikler */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-blue-600">{modeller.length}</div>
                                <p className="text-sm text-gray-600">Toplam Model</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-green-600">{markalar.length}</div>
                                <p className="text-sm text-gray-600">Aktif Marka</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-purple-600">{filteredModeller.length}</div>
                                <p className="text-sm text-gray-600">Filtrelenmiş</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-orange-600">{selectedItems.length}</div>
                                <p className="text-sm text-gray-600">Seçili</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tablo */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedItems.length === filteredModeller.length && filteredModeller.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Model Adı</TableHead>
                                    <TableHead>Marka</TableHead>
                                    <TableHead>Oluşturulma Tarihi</TableHead>
                                    <TableHead>Güncellenme Tarihi</TableHead>
                                    <TableHead className="w-12">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredModeller.map((model) => (
                                    <TableRow key={model.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(model.id)}
                                                onCheckedChange={(checked) => handleSelectItem(model.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{model.id}</TableCell>
                                        <TableCell className="font-medium">{model.adi}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline"
                                                   className="bg-blue-50 text-blue-700 border-blue-200">
                                                {model.markaAdi}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{model.createdAt}</TableCell>
                                        <TableCell>{model.updatedAt}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => openEditDialog(model)}>
                                                        <Edit className="h-4 w-4 mr-2"/>
                                                        Düzenle
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDeleteDialog(model)}
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

                    {filteredModeller.length === 0 && (
                        <div className="text-center py-8">
                            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                            <p className="text-gray-500">Hiç model bulunamadı</p>
                            {(searchTerm || selectedMarkaFilter !== "all") && (
                                <Button variant="outline" onClick={clearFilters} className="mt-2">
                                    Filtreleri Temizle
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingModel ? "Model Düzenle" : "Yeni Model Ekle"}</DialogTitle>
                        <DialogDescription>
                            {editingModel ? "Model bilgilerini güncelleyin" : "Yeni bir model ekleyin"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="adi">Model Adı</Label>
                            <Input
                                id="adi"
                                value={formData.adi}
                                onChange={(e) => setFormData({...formData, adi: e.target.value})}
                                placeholder="Model adını girin"
                            />
                        </div>
                        <div>
                            <Label htmlFor="markaId">Marka</Label>
                            <Select value={formData.markaId}
                                    onValueChange={(value) => setFormData({...formData, markaId: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Marka seçin"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {markalar.map((marka) => (
                                        <SelectItem key={marka.id} value={marka.id}>
                                            {marka.adi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            {editingModel ? "Güncelle" : "Ekle"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Model Sil</DialogTitle>
                        <DialogDescription>
                            "{deletingModel?.adi}" modelini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
                        <DialogTitle>Seçili Modelleri Sil</DialogTitle>
                        <DialogDescription>
                            {selectedItems.length} modeli silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
