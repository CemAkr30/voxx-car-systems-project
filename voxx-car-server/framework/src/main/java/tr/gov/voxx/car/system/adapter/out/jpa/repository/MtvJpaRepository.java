package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MTVEntity;

import java.util.List;

@Repository
public interface MtvJpaRepository extends JpaRepository<MTVEntity, String> {
    List<MTVEntity> findByAracFiloIdAndIsDeletedFalse(String aracFiloId);
    
    List<MTVEntity> findByYilAndTaksitAndOdendiAndIsDeletedFalse(String yil, String taksit, Boolean odendi);
    
    List<MTVEntity> findByOdendiAndIsDeletedFalse(Boolean odendi);
    
    List<MTVEntity> findByIsDeletedFalse();
}
