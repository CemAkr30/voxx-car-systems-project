import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { createFileRoute } from "@tanstack/react-router";
import {
  Download,
  Search,
  Filter,
  RefreshCw,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useAppForm } from "@/hooks/demo.form";
import { markaCreateSchema } from "@/schemas/marka";
import { useSuspenseQuery } from "@tanstack/react-query";
import { markalarOptions } from "@/queries/marka";

export const Route = createFileRoute("/_layout_authenticated/marka/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: markalar } = useSuspenseQuery(markalarOptions(10, 10));

  const form = useAppForm({
    defaultValues: {
      adi: "",
    },
    validators: {
      onChange: markaCreateSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      form.reset();
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(markalar.map((item) => item.id));
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Marka Yönetimi</h1>
        <p className="text-gray-600 mt-2">Araç markalarını yönetin</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Marka Listesi</CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default">Yeni Marka Ekle</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                    className="space-y-6"
                  >
                    <form.AppField name="adi">
                      {(field) => <field.TextField label="Kullanıcı Adı" />}
                    </form.AppField>

                    <div className="flex justify-end">
                      <form.AppForm>
                        <form.SubscribeButton label="Submit" />
                      </form.AppForm>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                <Input
                  placeholder="Marka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
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
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {selectedItems.length} öğe seçili
                </Badge>
                {/* <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsBulkDeleteDialogOpen(true)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Seçilenleri Sil
                </Button> */}
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
                      checked={
                        selectedItems.length === markalar.length &&
                        markalar.length > 0
                      }
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
                {markalar.map((marka) => (
                  <TableRow key={marka.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(marka.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(marka.id, checked as boolean)
                        }
                      />
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
                          <DropdownMenuItem
                            onClick={() =>
                              console.log("edit dialog will be opened")
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              console.log("delete dialog will be opened")
                            }
                            className="text-red-600"
                          >
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

          <pre>{JSON.stringify(markalar, null, 2)}</pre>

          {markalar.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Hiç marka bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
