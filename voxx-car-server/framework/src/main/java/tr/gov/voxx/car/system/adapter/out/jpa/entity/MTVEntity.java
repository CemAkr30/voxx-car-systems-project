package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.OdemeTipi;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_mtv")
@Getter
@Setter
public class MTVEntity extends AbstractEntity {
    private String aracFiloId;
    private String yil;
    private String taksit;
    private String makbuzNo;
    private Double miktar;
    @Enumerated(EnumType.STRING)
    private OdemeTipi odemeTipi;
    private String odeyenFirmaId;
    private String not;
    private String gecikmeCezasi;
    private Boolean odendi;
}
