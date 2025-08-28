package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.Cinsiyet;
import tr.gov.voxx.car.system.domain.enumeration.EhliyetTipi;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_arackullanan")
@Getter
@Setter
public class AracKullananEntity extends AbstractEntity {
    private String ad;
    private String soyad;
    private String email;
    private String telefonNo;
    private String adres;
    private String ehliyetNo;
    @Enumerated(EnumType.STRING)
    private EhliyetTipi ehliyetTipi;
    private String ehliyetOn;
    private String ehliyetArka;
    private Instant ehliyetBitisTarihi;
    @Enumerated(EnumType.STRING)
    private Cinsiyet cinsiyetTipi;
    private String firmaId;
}
