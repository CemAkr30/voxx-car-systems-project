package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.AdresTipi;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_adres")
@Getter
@Setter
public class AdresEntity extends AbstractEntity {
    private String aciklama;
    @Enumerated(EnumType.STRING)
    private AdresTipi tip;
    private String firmaId;
}
