package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MTVRequest {
    private String aracFiloId;
    private String yil;
    private String taksit;
    private String makbuzNo;
    private Double miktar;
    private OdemeTipi odemeTipi;
    private String odeyenFirmaId;
    private String not;
    private String gecikmeCezasi;
    private Boolean odendi;
}

