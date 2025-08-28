package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "MTV Durumu Detay Response")
public class MTVDurumDetayResponse {

    // id, aracFiloId ve odeyenFirmaId kaldırıldı
    @Schema(description = "Araç Plakası")
    private String plaka;

    @Schema(description = "MTV Yılı")
    private String yil;

    @Schema(description = "MTV Taksiti")
    private String taksit;

    @Schema(description = "Makbuz Numarası")
    private String makbuzNo;

    @Schema(description = "MTV Miktarı")
    private Double miktar;

    @Schema(description = "Ödeme Tipi")
    private String odemeTipi;

    @Schema(description = "Ödeyen Firma Unvanı")
    private String odeyenFirmaUnvani;

    @Schema(description = "Açıklama")
    private String aciklama;

    @Schema(description = "Gecikme Cezası")
    private String gecikmeCezasi;

    @Schema(description = "Ödendi Durumu")
    private Boolean odendi;
} 