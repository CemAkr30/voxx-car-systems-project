package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.MuayeneTipi;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_muayene")
@Getter
@Setter
public class MuayeneEntity extends AbstractEntity {
    private String aracFiloId;
    @Enumerated(EnumType.STRING)
    private MuayeneTipi muayeneTipi;
    private String makbuzNo;
    private String odeyenFirmaId;
    private String gecikmeCezasi;
    private String not;
    private String yeri;
    @Enumerated(EnumType.STRING)
    private OdemeTipi odemeTipi;
    private Double miktar;
    private Boolean odendi;
    private LocalDateTime baslangicTarihi;
    private LocalDateTime bitisTarihi;
}

