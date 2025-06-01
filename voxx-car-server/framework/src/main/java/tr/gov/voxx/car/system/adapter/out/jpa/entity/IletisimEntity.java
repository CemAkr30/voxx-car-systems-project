package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.IletisimTipi;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_iletisim")
@Getter
@Setter
public class IletisimEntity extends AbstractEntity {
    private String numara;
    @Enumerated(EnumType.STRING)
    private IletisimTipi tip;
    private String firmaId;
}
