package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Muayene Durumu Detay Response")
public class MuayeneDurumDetayResponse {

    @Schema(description = "Muayene ID")
    private String id;

    @Schema(description = "Araç Filo ID")
    private String aracFiloId;

    @Schema(description = "Araç Plakası")
    private String plaka;

    @Schema(description = "Muayene Tipi")
    private String muayeneTipi;

    @Schema(description = "Makbuz Numarası")
    private String makbuzNo;

    @Schema(description = "Ödeyen Firma ID")
    private String odeyenFirmaId;

    @Schema(description = "Başlangıç Tarihi")
    private Instant baslangicTarihi;

    @Schema(description = "Bitiş Tarihi")
    private Instant bitisTarihi;

    @Schema(description = "Gecikme Cezası")
    private String gecikmeCezasi;

    @Schema(description = "Açıklama")
    private String aciklama;

    @Schema(description = "Muayene Yeri")
    private String yeri;

    @Schema(description = "Miktar")
    private Double miktar;

    @Schema(description = "Ödeme Tipi")
    private String odemeTipi;

    @Schema(description = "Ödendi Durumu")
    private Boolean odendi;

    @Schema(description = "Kalan Gün Sayısı")
    private Long kalanGun;
} 