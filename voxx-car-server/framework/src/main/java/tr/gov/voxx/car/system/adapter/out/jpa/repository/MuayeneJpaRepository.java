package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MuayeneEntity;

import java.util.List;

@Repository
public interface MuayeneJpaRepository extends JpaRepository<MuayeneEntity, String> {
    List<MuayeneEntity> findByAracFiloIdAndIsDeletedFalse(String aracFiloId);
    
    List<MuayeneEntity> findByBitisTarihiBeforeAndIsDeletedFalse(java.time.Instant bitis);
    
    List<MuayeneEntity> findByIsDeletedFalse();
}
