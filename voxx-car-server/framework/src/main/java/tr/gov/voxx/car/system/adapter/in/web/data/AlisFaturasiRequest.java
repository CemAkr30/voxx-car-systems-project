package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.ParaBirimi;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlisFaturasiRequest {
    private String aracFiloId;
    private LocalDateTime alisFaturasiTarihi;
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
    private String not;
}

