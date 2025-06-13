"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Download,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Badge,
  Trash,
  Table,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BrandList = ({ markalar }: { markalar: any[] }) => {
  //   const exportToExcel = () => {
  //     // Excel export simülasyonu
  //     const csvContent =
  //       "data:text/csv;charset=utf-8," +
  //       "ID,Marka Adı,Oluşturulma Tarihi,Güncellenme Tarihi\n" +
  //       filteredMarkalar
  //         .map(
  //           (item) => `${item.id},${item.adi},${item.createdAt},${item.updatedAt}`
  //         )
  //         .join("\n");

  //     const encodedUri = encodeURI(csvContent);
  //     const link = document.createElement("a");
  //     link.setAttribute("href", encodedUri);
  //     link.setAttribute("download", "markalar.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };

  //   const exportToPDF = () => {
  //     // PDF export simülasyonu
  //     alert("PDF export özelliği yakında eklenecek");
  //   };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Marka Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Link
              href={pages.brand_create}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Marka
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Dışa Aktar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuItem onClick={exportToExcel}>
                  <FileText className="h-4 w-4 mr-2" />
                  Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </DropdownMenuItem> */}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              {/* <Input
                placeholder="Marka ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              /> */}
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtreler
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Yenile
            </Button>
          </div>
          {/* {selectedItems.length > 0 && (
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
          )} */}
        </div>

        {/* Tablo */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  {/* <Checkbox
                    checked={
                      selectedItems.length === filteredMarkalar.length &&
                      filteredMarkalar.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  /> */}
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Marka Adı</TableHead>
                <TableHead>Oluşturulma Tarihi</TableHead>
                <TableHead>Güncellenme Tarihi</TableHead>
                <TableHead className="w-12">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {markalar.map((marka) => (
                <TableRow key={marka.id}>
                  <TableCell>
                    {/* <Checkbox
                      checked={selectedItems.includes(marka.id)}
                      onCheckedChange={(checked) =>
                        handleSelectItem(marka.id, checked as boolean)
                      }
                    /> */}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {marka.id}
                  </TableCell>
                  <TableCell className="font-medium">{marka.adi}</TableCell>
                  <TableCell>{marka.createdAt}</TableCell>
                  <TableCell>{marka.updatedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* <DropdownMenuItem onClick={() => openEditDialog(marka)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(marka)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Sil
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandList;
