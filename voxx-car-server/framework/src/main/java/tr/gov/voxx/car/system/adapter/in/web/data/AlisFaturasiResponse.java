package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.ParaBirimi;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlisFaturasiResponse {
    private String id;
    private String aracFiloId;
    private Instant alisFaturasiTarihi;
    private String alisFaturaNo;
    private String saticiFirmaId;
    private Double listeFiyati;
    private Integer ekGaranti;
    private Double malDegeri;
    private Double iskonto;
    private Double nakliyeBedeli;
    private Double otvMatrah;
    private Double otv;
    private Double otvIndirimi;
    private Double kdv;
    private Double faturaToplam;
    private ParaBirimi paraBirimi;
    private String gecikmeCezasi;
    private Double kur;
    private Double faturaTry;
    private String faturaYukle;//dosya yolu mu verilecek
    private String aciklama;
    private Instant createdAt;
    private Instant updatedAt;
}
