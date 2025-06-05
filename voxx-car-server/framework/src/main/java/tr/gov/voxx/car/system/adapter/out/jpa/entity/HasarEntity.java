package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.HasarTipi;
import tr.gov.voxx.car.system.domain.enumeration.HasarliParca;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_hasar")
@Getter
@Setter
public class HasarEntity extends AbstractEntity {
    private String aracFiloId;
    @Enumerated(EnumType.STRING)
    private HasarliParca hasarliParca;
    @Enumerated(EnumType.STRING)
    private HasarTipi hasarTipi;
}
