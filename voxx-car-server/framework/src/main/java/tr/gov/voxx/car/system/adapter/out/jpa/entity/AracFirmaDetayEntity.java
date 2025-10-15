package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_arac_firma_detay")
@Getter
@Setter
public class AracFirmaDetayEntity extends AbstractEntity {
    private String aracFiloId;
    private String firmaId;
    private Instant baslangicTarihi;
    private Instant bitisTarihi;
    private Double sozlesmeTutari;
    private Double aylikFaturaTutari;
    private Double kapora;
    private Instant sozlesmeBaslangicTarihi;
    private Instant sozlesmeBitisTarihi;
    private String teslimatTutanagi;
    private String sozlesme;
    private Integer odemeVadesi;
}
