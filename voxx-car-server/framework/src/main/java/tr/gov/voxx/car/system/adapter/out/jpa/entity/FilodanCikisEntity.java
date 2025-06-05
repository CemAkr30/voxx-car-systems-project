package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.FilodanCikisNedeni;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_filodancikis")
@Getter
@Setter
public class FilodanCikisEntity extends AbstractEntity {
    private String aracFiloId;
    @Enumerated(EnumType.STRING)
    private FilodanCikisNedeni filodanCikisNedeni;
    private Instant filodanCikisTarihi;
    private String alici;
    private Double anahtarTeslimFiyati;
    private Double aracDevirGiderleri;
    @Lob
    private String faturaYukle;
    private String not;
}

