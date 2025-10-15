package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_firma_dokuman_detay")
@Getter
@Setter
public class FirmaDokumanDetayEntity extends AbstractEntity {
    private String firmaId;
    @Column(columnDefinition = "TEXT")
    private String sozlesme;
}
