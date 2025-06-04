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
import {
    AlertTriangle,
    Download,
    Edit,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Search,
    Trash,
    Trash2,
} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Alert, AlertDescription} from "@/components/ui/alert"

interface Marka {
    id: string
    adi: string
    createdAt: string
    updatedAt: string
}

export function MarkaManagement() {
    const [markalar, setMarkalar] = useState<Marka[]>([])
    const [filteredMarkalar, setFilteredMarkalar] = useState<Marka[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
    const [editingMarka, setEditingMarka] = useState<Marka | null>(null)
    const [deletingMarka, setDeletingMarka] = useState<Marka | null>(null)
    const [formData, setFormData] = useState({adi: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Mock data - gerçek uygulamada API'den gelecek
    useEffect(() => {
        const mockData: Marka[] = [
            {id: "1", adi: "Toyota", createdAt: "2024-01-15", updatedAt: "2024-01-15"},
            {id: "2", adi: "Honda", createdAt: "2024-01-16", updatedAt: "2024-01-16"},
            {id: "3", adi: "Ford", createdAt: "2024-01-17", updatedAt: "2024-01-17"},
            {id: "4", adi: "BMW", createdAt: "2024-01-18", updatedAt: "2024-01-18"},
            {id: "5", adi: "Mercedes", createdAt: "2024-01-19", updatedAt: "2024-01-19"},
            {id: "6", adi: "Audi", createdAt: "2024-01-20", updatedAt: "2024-01-20"},
            {id: "7", adi: "Volkswagen", createdAt: "2024-01-21", updatedAt: "2024-01-21"},
            {id: "8", adi: "Nissan", createdAt: "2024-01-22", updatedAt: "2024-01-22"},
        ]
        setMarkalar(mockData)
        setFilteredMarkalar(mockData)
    }, [])

    // Filtreleme
    useEffect(() => {
        const filtered = markalar.filter((marka) => marka.adi.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredMarkalar(filtered)
    }, [markalar, searchTerm])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(filteredMarkalar.map((item) => item.id))
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
        setEditingMarka(null)
        setFormData({adi: ""})
        setIsDialogOpen(true)
    }

    const openEditDialog = (marka: Marka) => {
        setEditingMarka(marka)
        setFormData({adi: marka.adi})
        setIsDialogOpen(true)
    }

    const openDeleteDialog = (marka: Marka) => {
        setDeletingMarka(marka)
        setIsDeleteDialogOpen(true)
    }

    const handleSave = async () => {
        if (!formData.adi.trim()) {
            setError("Marka adı gereklidir")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (editingMarka) {
                // Güncelleme
                setMarkalar((prev) =>
                    prev.map((item) =>
                        item.id === editingMarka.id
                            ? {...item, adi: formData.adi, updatedAt: new Date().toISOString().split("T")[0]}
                            : item,
                    ),
                )
            } else {
                // Yeni ekleme
                const newMarka: Marka = {
                    id: Date.now().toString(),
                    adi: formData.adi,
                    createdAt: new Date().toISOString().split("T")[0],
                    updatedAt: new Date().toISOString().split("T")[0],
                }
                setMarkalar((prev) => [...prev, newMarka])
            }

            setIsDialogOpen(false)
            setFormData({adi: ""})
        } catch (err) {
            setError("İşlem başarısız oldu")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deletingMarka) return

        setIsLoading(true)

        try {
            // API çağrısı simülasyonu
            await new Promise((resolve) => setTimeout(resolve, 500))

            setMarkalar((prev) => prev.filter((item) => item.id !== deletingMarka.id))
            setIsDeleteDialogOpen(false)
            setDeletingMarka(null)
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

            setMarkalar((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
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
            "ID,Marka Adı,Oluşturulma Tarihi,Güncellenme Tarihi\n" +
            filteredMarkalar.map((item) => `${item.id},${item.adi},${item.createdAt},${item.updatedAt}`).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "markalar.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const exportToPDF = () => {
        // PDF export simülasyonu
        alert("PDF export özelliği yakında eklenecek")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Marka Yönetimi</h1>
                <p className="text-gray-600 mt-2">Araç markalarını yönetin</p>
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
                        <CardTitle>Marka Listesi</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button onClick={openAddDialog} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2"/>
                                Yeni Marka
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
                                    placeholder="Marka ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2"/>
                                Filtreler
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

                    {/* Tablo */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedItems.length === filteredMarkalar.length && filteredMarkalar.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Marka Adı</TableHead>
                                    <TableHead>Oluşturulma Tarihi</TableHead>
                                    <TableHead>Güncellenme Tarihi</TableHead>
                                    <TableHead className="w-12">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMarkalar.map((marka) => (
                                    <TableRow key={marka.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(marka.id)}
                                                onCheckedChange={(checked) => handleSelectItem(marka.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{marka.id}</TableCell>
                                        <TableCell className="font-medium">{marka.adi}</TableCell>
                                        <TableCell>{marka.createdAt}</TableCell>
                                        <TableCell>{marka.updatedAt}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => openEditDialog(marka)}>
                                                        <Edit className="h-4 w-4 mr-2"/>
                                                        Düzenle
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDeleteDialog(marka)}
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

                    {filteredMarkalar.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Hiç marka bulunamadı</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingMarka ? "Marka Düzenle" : "Yeni Marka Ekle"}</DialogTitle>
                        <DialogDescription>
                            {editingMarka ? "Marka bilgilerini güncelleyin" : "Yeni bir marka ekleyin"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="adi">Marka Adı</Label>
                            <Input
                                id="adi"
                                value={formData.adi}
                                onChange={(e) => setFormData({adi: e.target.value})}
                                placeholder="Marka adını girin"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin"/> : null}
                            {editingMarka ? "Güncelle" : "Ekle"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Marka Sil</DialogTitle>
                        <DialogDescription>
                            "{deletingMarka?.adi}" markasını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
                        <DialogTitle>Seçili Markaları Sil</DialogTitle>
                        <DialogDescription>
                            {selectedItems.length} markayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
