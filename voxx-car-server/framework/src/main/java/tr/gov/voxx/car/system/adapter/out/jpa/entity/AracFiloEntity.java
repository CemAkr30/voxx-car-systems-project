package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.AracSegmentTipi;
import tr.gov.voxx.car.system.domain.enumeration.KasaTipi;

import java.time.Instant;

@Entity
@Table(name = "tb_aracfilo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AracFiloEntity extends AbstractEntity {
    private String plaka;
    private String markaId;
    private String modelId;
    private String modelYili;
    @Enumerated(EnumType.STRING)
    private AracSegmentTipi segment;
    private String motorNo;
    private String sasiNo;
    private String renk;
    @Enumerated(EnumType.STRING)
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
}
