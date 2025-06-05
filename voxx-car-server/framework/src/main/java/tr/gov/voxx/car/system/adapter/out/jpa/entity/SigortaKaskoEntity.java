package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.SigortaTipi;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_sigorta")
@Getter
@Setter
public class SigortaKaskoEntity extends AbstractEntity {
    private String aracFiloId;
    @Enumerated(EnumType.STRING)
    private SigortaTipi tip;
    private String sigortaSirketi;
    private String acente;
    private String policeNo;
    private Instant baslangicTarihi;
    private Instant bitisTarihi;
}
