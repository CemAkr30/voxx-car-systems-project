package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MuayeneEntity;

import java.util.List;

@Repository
public interface MuayeneJpaRepository extends JpaRepository<MuayeneEntity, String> {
    List<MuayeneEntity> findByAracFiloId(String aracFiloId);
    
    List<MuayeneEntity> findByBitisTarihiBefore(java.time.Instant bitis);
}
