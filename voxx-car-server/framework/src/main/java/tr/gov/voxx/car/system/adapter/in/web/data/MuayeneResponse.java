package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.MuayeneTipi;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MuayeneResponse {
    private String id;
    private String aracFiloId;
    private MuayeneTipi muayeneTipi;
    private String makbuzNo;
    private Double miktar;
    private OdemeTipi odemeTipi;
    private String odeyenFirmaId;
    private String aciklama;
    private String yeri;
    private String gecikmeCezasi;
    private Boolean odendi;
    private Instant baslangicTarihi;
    private Instant bitisTarihi;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean isDeleted;
}



