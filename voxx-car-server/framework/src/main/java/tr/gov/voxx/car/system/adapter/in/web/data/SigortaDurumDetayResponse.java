package tr.gov.voxx.car.system.adapter.in.web.data;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Sigorta Durumu Detay Response")
public class SigortaDurumDetayResponse {

    @Schema(description = "Sigorta ID")
    private String id;

    @Schema(description = "Araç Filo ID")
    private String aracFiloId;

    @Schema(description = "Araç Plakası")
    private String plaka;

    @Schema(description = "Sigorta Tipi")
    private String tip;

    @Schema(description = "Sigorta Şirketi")
    private String sigortaSirketi;

    @Schema(description = "Acente")
    private String acente;

    @Schema(description = "Poliçe Numarası")
    private String policeNo;

    @Schema(description = "Başlangıç Tarihi")
    private Instant baslangicTarihi;

    @Schema(description = "Bitiş Tarihi")
    private Instant bitisTarihi;

    @Schema(description = "Kalan Gün Sayısı")
    private Long kalanGun;
} 