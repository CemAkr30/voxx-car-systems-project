package tr.gov.voxx.car.system.adapter.out.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import tr.gov.voxx.car.system.common.framework.persistence.AbstractEntity;
import tr.gov.voxx.car.system.domain.enumeration.ParaBirimi;

import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_alisfaturasi")
@Getter
@Setter
public class AlisFaturasiEntity extends AbstractEntity {
    private String aracFiloId;
    private Instant alisFaturasiTarihi;
    private String alisFaturaNo;
    private String saticiFirmaId;
    private Double listeFiyati;
    private Integer ekGaranti;
    private Double malDegeri;
    private Double iskonto;
    private Double nakliyeBedeli;
    private Double otvMatrah;
    private Double otv;
    private Double otvIndirimi;
    private Double kdv;
    private Double faturaToplam;
    @Enumerated(EnumType.STRING)
    private ParaBirimi paraBirimi;
    private String gecikmeCezasi;
    private Double kur;
    private Double faturaTry;
    private String faturaYukle;//dosya yolu mu verilecek
    private String not;
}


