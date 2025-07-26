package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.SigortaKaskoEntity;

import java.util.List;

@Repository
public interface SigortaJpaRepository extends JpaRepository<SigortaKaskoEntity, String> {
    List<SigortaKaskoEntity> findByAracFiloId(String aracFiloId);
    
    List<SigortaKaskoEntity> findByBitisTarihiBefore(java.time.Instant bitis);
}
