package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.MuayeneTipi;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MuayeneRequest {
    private String aracFiloId;
    private MuayeneTipi muayeneTipi;
    private String makbuzNo;
    private String odeyenFirmaId;
    private String gecikmeCezasi;
    private String not;
    private String yeri;
    private OdemeTipi odemeTipi;
    private Double miktar;
    private Boolean odendi;
    private LocalDateTime baslangicTarihi;
    private LocalDateTime bitisTarihi;
}

