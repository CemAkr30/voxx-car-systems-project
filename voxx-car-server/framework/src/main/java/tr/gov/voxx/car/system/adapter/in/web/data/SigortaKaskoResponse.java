package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.SigortaTipi;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SigortaKaskoResponse {
    private String id;
    private String aracFiloId;
    private SigortaTipi tip;
    private String sigortaSirketi;
    private String acente;
    private String policeNo;
    private Instant baslangicTarihi;
    private Instant bitisTarihi;
    private Instant createdAt;
    private Instant updatedAt;
}
