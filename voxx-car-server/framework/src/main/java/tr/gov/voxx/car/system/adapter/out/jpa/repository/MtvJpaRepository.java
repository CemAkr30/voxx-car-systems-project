package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MTVEntity;

import java.util.List;

@Repository
public interface MtvJpaRepository extends JpaRepository<MTVEntity, String> {
    List<MTVEntity> findByAracFiloId(String aracFiloId);
    
    List<MTVEntity> findByYilAndTaksitAndOdendi(String yil, String taksit, Boolean odendi);
}
