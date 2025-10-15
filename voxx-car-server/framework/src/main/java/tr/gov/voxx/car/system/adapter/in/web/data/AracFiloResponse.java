package tr.gov.voxx.car.system.adapter.in.web.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.gov.voxx.car.system.domain.enumeration.AracSegmentTipi;
import tr.gov.voxx.car.system.domain.enumeration.KasaTipi;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AracFiloResponse {
    private String id;
    private String plaka;
    private String markaId;
    private String modelId;
    private String modelYili;
    private AracSegmentTipi segment;
    private String motorNo;
    private String sasiNo;
    private String renk;
    private KasaTipi kasaTipi;
    private String lastikTipi;
    private Instant filoyaGirisTarihi;
    private String filoyaGirisKm;
    private Instant tescilTarihi;
    private Instant trafigeCikisTarihi;
    private boolean garantisiVarMi;
    private Instant garantiBaslangicTarihi;
    private String garantiSuresiYil;
    private String garantiKm;
    private boolean tramer;
    private Double tramerTutari;
    private Instant sonKmTarihi;
    private String sonKm;
    private String sonYakitMiktari;
    private Integer filoDurum;
    private Instant muayeneBitisTarihi;
    private Instant createdAt;
    private Instant updatedAt;
    private boolean isDeleted;
}

