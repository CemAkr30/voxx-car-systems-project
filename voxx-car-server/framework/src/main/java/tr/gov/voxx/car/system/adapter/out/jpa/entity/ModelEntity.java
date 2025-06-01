package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_model")
@Getter
@Setter
public class ModelEntity extends AbstractEntity {
    private String adi;
    private String markaId;
}
