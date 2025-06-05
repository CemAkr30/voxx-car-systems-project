package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;

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
    private String musteriId;
    private Instant kazaTarihi;
    private String kazaIli;
    private String kazaNedeni;

    @Lob
    private String kazaTutanagi;

    private String onarimDurumu;
    private String odeyenFirmaId;
}
