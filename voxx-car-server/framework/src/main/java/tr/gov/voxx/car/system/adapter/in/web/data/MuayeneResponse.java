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
public class MuayeneResponse {
    private String id;
    private String aracFiloId;
    private MuayeneTipi muayeneTipi;
    private String makbuzNo;
    private Double miktar;
    private OdemeTipi odemeTipi;
    private String odeyenFirmaId;
    private String not;
    private String yeri;
    private String gecikmeCezasi;
    private Boolean odendi;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}



