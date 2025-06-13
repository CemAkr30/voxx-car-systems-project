"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Building,
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Gauge,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Shield,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Marka {
  id: string;
  adi: string;
}

interface Model {
  id: string;
  adi: string;
  markaId: string;
}

interface Firma {
  id: string;
  adi: string;
}

interface Arac {
  id: string;
  plaka: string;
  markaId: string;
  markaAdi: string;
  modelId: string;
  modelAdi: string;
  modelYili: string;
  aracTipi: string;
  segment: string;
  motorNo: string;
  sasiNo: string;
  renk: string;
  kasaTipi: string;
  lastikTipi: string;
  filoyaGirisTarihi: string;
  filoyaGirisKm: string;
  tescilTarihi: string;
  trafigeCikisTarihi: string;
  garantisiVarMi: boolean;
  garantiBitisTarihi: string;
  garantiSuresiYil: string;
  garantiKm: string;
  tramer: boolean;
  tramerTutari: number;
  sonKmTarihi: string;
  sonKm: string;
  sonYakitMiktari: string;
  kiralandiMi: boolean;
  kiralandigiTarih: string;
  kontratSuresi: string;
  kiralikBitisTarihi: string;
  kiralayanFirmaId: string;
  kiralayanFirmaAdi: string;
  filoDurum: number;
  createdAt: string;
  updatedAt: string;
}

const filoDurumLabels = {
  1: "Aktif",
  2: "Bakımda",
  3: "Depoda",
  4: "Arızalı",
  5: "Satıldı",
  6: "Hurda",
};

const filoDurumColors = {
  1: "bg-green-100 text-green-800 border-green-200",
  2: "bg-yellow-100 text-yellow-800 border-yellow-200",
  3: "bg-gray-100 text-gray-800 border-gray-200",
  4: "bg-red-100 text-red-800 border-red-200",
  5: "bg-blue-100 text-blue-800 border-blue-200",
  6: "bg-purple-100 text-purple-800 border-purple-200",
};

const aracTipleri = [
  "Binek",
  "Ticari",
  "Kamyon",
  "Otobüs",
  "Motosiklet",
  "Traktör",
];
const segmentler = ["A", "B", "C", "D", "E", "F", "SUV", "MPV", "Pickup"];
const kasaTipleri = [
  "Sedan",
  "Hatchback",
  "Station Wagon",
  "Coupe",
  "Convertible",
  "SUV",
  "Pickup",
  "Van",
];
const lastikTipleri = ["Yaz", "Kış", "4 Mevsim", "Run Flat"];
const renkler = [
  "Beyaz",
  "Siyah",
  "Gri",
  "Mavi",
  "Kırmızı",
  "Yeşil",
  "Sarı",
  "Kahverengi",
  "Mor",
  "Turuncu",
];

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
}

export default function ListPage() {
  const [araclar, setAraclar] = useState<Arac[]>([]);
  const [markalar, setMarkalar] = useState<Marka[]>([]);
  const [modeller, setModeller] = useState<Model[]>([]);
  const [firmalar, setFirmalar] = useState<Firma[]>([]);
  const [filteredAraclar, setFilteredAraclar] = useState<Arac[]>([]);
  const [paginatedAraclar, setPaginatedAraclar] = useState<Arac[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarkaFilter, setSelectedMarkaFilter] = useState<string>("all");
  const [selectedDurumFilter, setSelectedDurumFilter] = useState<string>("all");
  const [selectedTipFilter, setSelectedTipFilter] = useState<string>("all");
  const [selectedSegmentFilter, setSelectedSegmentFilter] =
    useState<string>("all");
  const [garantiFilter, setGarantiFilter] = useState<string>("all");
  const [kiralikFilter, setKiralikFilter] = useState<string>("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dialogs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const [editingArac, setEditingArac] = useState<Arac | null>(null);
  const [deletingArac, setDeletingArac] = useState<Arac | null>(null);
  const [viewingArac, setViewingArac] = useState<Arac | null>(null);

  const [formData, setFormData] = useState({
    plaka: "",
    markaId: "",
    modelId: "",
    modelYili: new Date().getFullYear().toString(),
    aracTipi: "",
    segment: "",
    motorNo: "",
    sasiNo: "",
    renk: "",
    kasaTipi: "",
    lastikTipi: "",
    filoyaGirisTarihi: "",
    filoyaGirisKm: "",
    tescilTarihi: "",
    trafigeCikisTarihi: "",
    garantisiVarMi: false,
    garantiBitisTarihi: "",
    garantiSuresiYil: "",
    garantiKm: "",
    tramer: false,
    tramerTutari: 0,
    sonKmTarihi: "",
    sonKm: "",
    sonYakitMiktari: "",
    kiralandiMi: false,
    kiralandigiTarih: "",
    kontratSuresi: "",
    kiralikBitisTarihi: "",
    kiralayanFirmaId: "",
    filoDurum: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data
  useEffect(() => {
    const mockMarkalar: Marka[] = [
      { id: "1", adi: "Toyota" },
      { id: "2", adi: "Honda" },
      { id: "3", adi: "Ford" },
      { id: "4", adi: "BMW" },
      { id: "5", adi: "Mercedes" },
      { id: "6", adi: "Audi" },
      { id: "7", adi: "Volkswagen" },
      { id: "8", adi: "Nissan" },
    ];

    const mockModeller: Model[] = [
      { id: "1", adi: "Corolla", markaId: "1" },
      { id: "2", adi: "Camry", markaId: "1" },
      { id: "3", adi: "Civic", markaId: "2" },
      { id: "4", adi: "Accord", markaId: "2" },
      { id: "5", adi: "Focus", markaId: "3" },
      { id: "6", adi: "Fiesta", markaId: "3" },
      { id: "7", adi: "3 Series", markaId: "4" },
      { id: "8", adi: "5 Series", markaId: "4" },
      { id: "9", adi: "C-Class", markaId: "5" },
      { id: "10", adi: "E-Class", markaId: "5" },
    ];

    const mockFirmalar: Firma[] = [
      { id: "1", adi: "ABC Kiralama" },
      { id: "2", adi: "XYZ Filo" },
      { id: "3", adi: "DEF Rent A Car" },
    ];

    // Generate mock araçlar
    const mockAraclar: Arac[] = Array.from({ length: 127 }, (_, index) => {
      const marka = mockMarkalar[index % mockMarkalar.length];
      const model =
        mockModeller.filter((m) => m.markaId === marka.id)[0] ||
        mockModeller[0];
      const firma = mockFirmalar[index % mockFirmalar.length];

      return {
        id: (index + 1).toString(),
        plaka: `${34 + (index % 67)} ${String.fromCharCode(
          65 + (index % 26)
        )}${String.fromCharCode(65 + ((index + 1) % 26))}${String.fromCharCode(
          65 + ((index + 2) % 26)
        )} ${String(100 + (index % 900)).padStart(3, "0")}`,
        markaId: marka.id,
        markaAdi: marka.adi,
        modelId: model.id,
        modelAdi: model.adi,
        modelYili: (2015 + (index % 9)).toString(),
        aracTipi: aracTipleri[index % aracTipleri.length],
        segment: segmentler[index % segmentler.length],
        motorNo: `MOT${String(100000 + index).slice(-6)}`,
        sasiNo: `SASI${String(1000000 + index).slice(-7)}`,
        renk: renkler[index % renkler.length],
        kasaTipi: kasaTipleri[index % kasaTipleri.length],
        lastikTipi: lastikTipleri[index % lastikTipleri.length],
        filoyaGirisTarihi: new Date(
          2020 + (index % 4),
          index % 12,
          (index % 28) + 1
        )
          .toISOString()
          .split("T")[0],
        filoyaGirisKm: String(5000 + index * 1000),
        tescilTarihi: new Date(2015 + (index % 9), index % 12, (index % 28) + 1)
          .toISOString()
          .split("T")[0],
        trafigeCikisTarihi: new Date(
          2015 + (index % 9),
          (index + 1) % 12,
          (index % 28) + 1
        )
          .toISOString()
          .split("T")[0],
        garantisiVarMi: index % 3 === 0,
        garantiBitisTarihi: new Date(
          2025 + (index % 3),
          index % 12,
          (index % 28) + 1
        )
          .toISOString()
          .split("T")[0],
        garantiSuresiYil: (2 + (index % 4)).toString(),
        garantiKm: String(100000 + index * 10000),
        tramer: index % 4 === 0,
        tramerTutari: index % 4 === 0 ? 5000 + index * 100 : 0,
        sonKmTarihi: new Date(2024, 0, (index % 30) + 1)
          .toISOString()
          .split("T")[0],
        sonKm: String(50000 + index * 2000),
        sonYakitMiktari: String(40 + (index % 20)),
        kiralandiMi: index % 5 === 0,
        kiralandigiTarih:
          index % 5 === 0
            ? new Date(2023, index % 12, (index % 28) + 1)
                .toISOString()
                .split("T")[0]
            : "",
        kontratSuresi: index % 5 === 0 ? (12 + (index % 24)).toString() : "",
        kiralikBitisTarihi:
          index % 5 === 0
            ? new Date(2024 + (index % 2), index % 12, (index % 28) + 1)
                .toISOString()
                .split("T")[0]
            : "",
        kiralayanFirmaId: index % 5 === 0 ? firma.id : "",
        kiralayanFirmaAdi: index % 5 === 0 ? firma.adi : "",
        filoDurum: (index % 6) + 1,
        createdAt: new Date(2024, 0, (index % 30) + 1)
          .toISOString()
          .split("T")[0],
        updatedAt: new Date(2024, 0, (index % 30) + 1)
          .toISOString()
          .split("T")[0],
      };
    });

    setMarkalar(mockMarkalar);
    setModeller(mockModeller);
    setFirmalar(mockFirmalar);
    setAraclar(mockAraclar);
    setFilteredAraclar(mockAraclar);
  }, []);

  // Filtreleme
  useEffect(() => {
    const filtered = araclar.filter((arac) => {
      const searchMatch =
        arac.plaka.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arac.markaAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arac.modelAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arac.motorNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arac.sasiNo.toLowerCase().includes(searchTerm.toLowerCase());

      const markaMatch =
        selectedMarkaFilter === "all" || arac.markaId === selectedMarkaFilter;
      const durumMatch =
        selectedDurumFilter === "all" ||
        arac.filoDurum.toString() === selectedDurumFilter;
      const tipMatch =
        selectedTipFilter === "all" || arac.aracTipi === selectedTipFilter;
      const segmentMatch =
        selectedSegmentFilter === "all" ||
        arac.segment === selectedSegmentFilter;

      const garantiMatch =
        garantiFilter === "all" ||
        (garantiFilter === "var" && arac.garantisiVarMi) ||
        (garantiFilter === "yok" && !arac.garantisiVarMi);

      const kiralikMatch =
        kiralikFilter === "all" ||
        (kiralikFilter === "var" && arac.kiralandiMi) ||
        (kiralikFilter === "yok" && !arac.kiralandiMi);

      return (
        searchMatch &&
        markaMatch &&
        durumMatch &&
        tipMatch &&
        segmentMatch &&
        garantiMatch &&
        kiralikMatch
      );
    });

    setFilteredAraclar(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    araclar,
    searchTerm,
    selectedMarkaFilter,
    selectedDurumFilter,
    selectedTipFilter,
    selectedSegmentFilter,
    garantiFilter,
    kiralikFilter,
  ]);

  // Pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedAraclar(filteredAraclar.slice(startIndex, endIndex));
  }, [filteredAraclar, currentPage, itemsPerPage]);

  // Pagination info
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages: Math.ceil(filteredAraclar.length / itemsPerPage),
    totalItems: filteredAraclar.length,
    itemsPerPage,
    startItem: Math.min(
      (currentPage - 1) * itemsPerPage + 1,
      filteredAraclar.length
    ),
    endItem: Math.min(currentPage * itemsPerPage, filteredAraclar.length),
  };

  const getFilteredModeller = () => {
    if (!formData.markaId) return [];
    return modeller.filter((model) => model.markaId === formData.markaId);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(paginatedAraclar.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMarkaFilter("all");
    setSelectedDurumFilter("all");
    setSelectedTipFilter("all");
    setSelectedSegmentFilter("all");
    setGarantiFilter("all");
    setKiralikFilter("all");
  };

  const activeFilterCount = [
    searchTerm,
    selectedMarkaFilter !== "all" ? selectedMarkaFilter : null,
    selectedDurumFilter !== "all" ? selectedDurumFilter : null,
    selectedTipFilter !== "all" ? selectedTipFilter : null,
    selectedSegmentFilter !== "all" ? selectedSegmentFilter : null,
    garantiFilter !== "all" ? garantiFilter : null,
    kiralikFilter !== "all" ? kiralikFilter : null,
  ].filter(Boolean).length;

  // İstatistikler
  const stats = {
    toplam: araclar.length,
    aktif: araclar.filter((a) => a.filoDurum === 1).length,
    bakim: araclar.filter((a) => a.filoDurum === 2).length,
    arizali: araclar.filter((a) => a.filoDurum === 4).length,
    kiralik: araclar.filter((a) => a.kiralandiMi).length,
    garantili: araclar.filter((a) => a.garantisiVarMi).length,
    filtrelenmis: filteredAraclar.length,
  };

  const openAddDialog = () => {
    setEditingArac(null);
    setFormData({
      plaka: "",
      markaId: "",
      modelId: "",
      modelYili: new Date().getFullYear().toString(),
      aracTipi: "",
      segment: "",
      motorNo: "",
      sasiNo: "",
      renk: "",
      kasaTipi: "",
      lastikTipi: "",
      filoyaGirisTarihi: "",
      filoyaGirisKm: "",
      tescilTarihi: "",
      trafigeCikisTarihi: "",
      garantisiVarMi: false,
      garantiBitisTarihi: "",
      garantiSuresiYil: "",
      garantiKm: "",
      tramer: false,
      tramerTutari: 0,
      sonKmTarihi: "",
      sonKm: "",
      sonYakitMiktari: "",
      kiralandiMi: false,
      kiralandigiTarih: "",
      kontratSuresi: "",
      kiralikBitisTarihi: "",
      kiralayanFirmaId: "",
      filoDurum: 1,
    });
    setIsDialogOpen(true);
  };

  const openDetailDialog = (arac: Arac) => {
    setViewingArac(arac);
    setIsDetailDialogOpen(true);
  };

  const exportToExcel = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Plaka,Marka,Model,Yıl,Tip,Segment,Motor No,Şasi No,Renk,Durum,Garanti,Kiralık,Son KM\n" +
      filteredAraclar
        .map(
          (item) =>
            `${item.plaka},${item.markaAdi},${item.modelAdi},${
              item.modelYili
            },${item.aracTipi},${item.segment},${item.motorNo},${item.sasiNo},${
              item.renk
            },${
              filoDurumLabels[item.filoDurum as keyof typeof filoDurumLabels]
            },${item.garantisiVarMi ? "Var" : "Yok"},${
              item.kiralandiMi ? "Var" : "Yok"
            },${item.sonKm}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "araclar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Araç Yönetimi</h1>
        <p className="text-gray-600 mt-2">
          Araç filosunu yönetin ve takip edin
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.toplam}
            </div>
            <p className="text-sm text-gray-600">Toplam</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.aktif}
            </div>
            <p className="text-sm text-gray-600">Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.bakim}
            </div>
            <p className="text-sm text-gray-600">Bakımda</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {stats.arizali}
            </div>
            <p className="text-sm text-gray-600">Arızalı</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {stats.kiralik}
            </div>
            <p className="text-sm text-gray-600">Kiralık</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.garantili}
            </div>
            <p className="text-sm text-gray-600">Garantili</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {stats.filtrelenmis}
            </div>
            <p className="text-sm text-gray-600">Filtrelenmiş</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Araç Listesi
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount} filtre aktif
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                onClick={openAddDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Araç
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Dışa Aktar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportToExcel}>
                    <FileText className="h-4 w-4 mr-2" />
                    Excel ({filteredAraclar.length} kayıt)
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Plaka, marka, model, motor no, şasi no ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsFilterDialogOpen(true)}
                  className={
                    activeFilterCount > 0 ? "border-blue-500 text-blue-600" : ""
                  }
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Gelişmiş Filtreler
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
                {activeFilterCount > 0 && (
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Filtreleri Temizle
                  </Button>
                )}
              </div>
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {selectedItems.length} öğe seçili
                  </Badge>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setIsBulkDeleteDialogOpen(true)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Seçilenleri Sil
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Select
                value={selectedMarkaFilter}
                onValueChange={setSelectedMarkaFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Marka" />
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

              <Select
                value={selectedDurumFilter}
                onValueChange={setSelectedDurumFilter}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  {Object.entries(filoDurumLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTipFilter}
                onValueChange={setSelectedTipFilter}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tip" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Tipler</SelectItem>
                  {aracTipleri.map((tip) => (
                    <SelectItem key={tip} value={tip}>
                      {tip}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  setItemsPerPage(Number.parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
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
                      checked={
                        selectedItems.length === paginatedAraclar.length &&
                        paginatedAraclar.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Plaka</TableHead>
                  <TableHead>Marka/Model</TableHead>
                  <TableHead>Tip/Segment</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Garanti</TableHead>
                  <TableHead>Kiralık</TableHead>
                  <TableHead>Son KM</TableHead>
                  <TableHead className="w-12">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAraclar.map((arac) => (
                  <TableRow key={arac.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(arac.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(arac.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-mono font-medium">
                      {arac.plaka}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {arac.markaAdi} {arac.modelAdi}
                        </div>
                        <div className="text-sm text-gray-500">
                          {arac.modelYili} • {arac.renk}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{arac.aracTipi}</div>
                        <div className="text-sm text-gray-500">
                          {arac.segment} Segment
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          filoDurumColors[
                            arac.filoDurum as keyof typeof filoDurumColors
                          ]
                        }
                      >
                        {
                          filoDurumLabels[
                            arac.filoDurum as keyof typeof filoDurumLabels
                          ]
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {arac.garantisiVarMi ? (
                        <div className="flex items-center text-green-600">
                          <Shield className="h-4 w-4 mr-1" />
                          <span className="text-sm">Var</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Yok</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {arac.kiralandiMi ? (
                        <div className="flex items-center text-blue-600">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="text-sm">Var</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Yok</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">
                          {Number.parseInt(arac.sonKm).toLocaleString()} km
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => openDetailDialog(arac)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Detay
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                {Array.from(
                  { length: Math.min(5, paginationInfo.totalPages) },
                  (_, i) => {
                    let pageNum: number;
                    if (paginationInfo.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= paginationInfo.totalPages - 2) {
                      pageNum = paginationInfo.totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === paginationInfo.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(paginationInfo.totalPages)}
                  disabled={currentPage === paginationInfo.totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {filteredAraclar.length === 0 && (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Hiç araç bulunamadı</p>
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-2"
                >
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
            <DialogDescription>
              Araç listesini filtrelemek için kriterleri seçin
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Segment</Label>
              <Select
                value={selectedSegmentFilter}
                onValueChange={setSelectedSegmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Segment seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Segmentler</SelectItem>
                  {segmentler.map((segment) => (
                    <SelectItem key={segment} value={segment}>
                      {segment} Segment
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Garanti Durumu</Label>
              <Select value={garantiFilter} onValueChange={setGarantiFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Garanti durumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="var">Garantisi Var</SelectItem>
                  <SelectItem value="yok">Garantisi Yok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Kiralık Durumu</Label>
              <Select value={kiralikFilter} onValueChange={setKiralikFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kiralık durumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="var">Kiralık</SelectItem>
                  <SelectItem value="yok">Kiralık Değil</SelectItem>
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

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Araç Detayları</DialogTitle>
            <DialogDescription>
              {viewingArac?.plaka} - {viewingArac?.markaAdi}{" "}
              {viewingArac?.modelAdi}
            </DialogDescription>
          </DialogHeader>
          {viewingArac && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Car className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Temel Bilgiler</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Plaka:</span>{" "}
                        {viewingArac.plaka}
                      </div>
                      <div>
                        <span className="text-gray-600">Marka/Model:</span>{" "}
                        {viewingArac.markaAdi} {viewingArac.modelAdi}
                      </div>
                      <div>
                        <span className="text-gray-600">Model Yılı:</span>{" "}
                        {viewingArac.modelYili}
                      </div>
                      <div>
                        <span className="text-gray-600">Araç Tipi:</span>{" "}
                        {viewingArac.aracTipi}
                      </div>
                      <div>
                        <span className="text-gray-600">Segment:</span>{" "}
                        {viewingArac.segment}
                      </div>
                      <div>
                        <span className="text-gray-600">Renk:</span>{" "}
                        {viewingArac.renk}
                      </div>
                      <div>
                        <span className="text-gray-600">Kasa Tipi:</span>{" "}
                        {viewingArac.kasaTipi}
                      </div>
                      <div>
                        <span className="text-gray-600">Lastik Tipi:</span>{" "}
                        {viewingArac.lastikTipi}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Settings className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Teknik Bilgiler</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Motor No:</span>{" "}
                        {viewingArac.motorNo}
                      </div>
                      <div>
                        <span className="text-gray-600">Şasi No:</span>{" "}
                        {viewingArac.sasiNo}
                      </div>
                      <div>
                        <span className="text-gray-600">Tescil Tarihi:</span>{" "}
                        {viewingArac.tescilTarihi}
                      </div>
                      <div>
                        <span className="text-gray-600">Trafiğe Çıkış:</span>{" "}
                        {viewingArac.trafigeCikisTarihi}
                      </div>
                      <div>
                        <span className="text-gray-600">Filoya Giriş:</span>{" "}
                        {viewingArac.filoyaGirisTarihi}
                      </div>
                      <div>
                        <span className="text-gray-600">Giriş KM:</span>{" "}
                        {Number.parseInt(
                          viewingArac.filoyaGirisKm
                        ).toLocaleString()}
                      </div>
                      <div>
                        <span className="text-gray-600">Son KM:</span>{" "}
                        {Number.parseInt(viewingArac.sonKm).toLocaleString()}
                      </div>
                      <div>
                        <span className="text-gray-600">Son Yakıt:</span>{" "}
                        {viewingArac.sonYakitMiktari} L
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Garanti & Sigorta</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Garanti:</span>
                        <Badge
                          className={`ml-2 ${
                            viewingArac.garantisiVarMi
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {viewingArac.garantisiVarMi ? "Var" : "Yok"}
                        </Badge>
                      </div>
                      {viewingArac.garantisiVarMi && (
                        <>
                          <div>
                            <span className="text-gray-600">
                              Garanti Bitiş:
                            </span>{" "}
                            {viewingArac.garantiBitisTarihi}
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Garanti Süresi:
                            </span>{" "}
                            {viewingArac.garantiSuresiYil} yıl
                          </div>
                          <div>
                            <span className="text-gray-600">Garanti KM:</span>{" "}
                            {Number.parseInt(
                              viewingArac.garantiKm
                            ).toLocaleString()}
                          </div>
                        </>
                      )}
                      <div>
                        <span className="text-gray-600">Tramer:</span>
                        <Badge
                          className={`ml-2 ${
                            viewingArac.tramer
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {viewingArac.tramer ? "Var" : "Yok"}
                        </Badge>
                      </div>
                      {viewingArac.tramer && (
                        <div>
                          <span className="text-gray-600">Tramer Tutarı:</span>{" "}
                          ₺{viewingArac.tramerTutari.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {viewingArac.kiralandiMi && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Kiralama Bilgileri</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Kiralayan Firma:</span>{" "}
                        {viewingArac.kiralayanFirmaAdi}
                      </div>
                      <div>
                        <span className="text-gray-600">Kiralama Tarihi:</span>{" "}
                        {viewingArac.kiralandigiTarih}
                      </div>
                      <div>
                        <span className="text-gray-600">Kontrat Süresi:</span>{" "}
                        {viewingArac.kontratSuresi} ay
                      </div>
                      <div>
                        <span className="text-gray-600">Bitiş Tarihi:</span>{" "}
                        {viewingArac.kiralikBitisTarihi}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailDialogOpen(false)}
            >
              Kapat
            </Button>
            <Button
              onClick={() => {
                setIsDetailDialogOpen(false);
                // Edit dialog açılabilir
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
