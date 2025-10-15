package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.KazaNedeni;

import java.time.Instant;

@Entity
@Table(name = "tb_kaza")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KazaEntity extends AbstractEntity {
    private String aracFiloId;
    private String firmaId;
    private Instant kazaTarihi;
    private String kazaIli;
    @Enumerated(EnumType.STRING)
    private KazaNedeni kazaNedeni;
    @Lob
    private String kazaTutanagi;
    private String onarimDurumu;
    private String odeyenFirmaId;
}
