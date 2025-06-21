package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AdresEntity;

import java.util.List;

@Repository
public interface AdresJpaRepository extends JpaRepository<AdresEntity, String> {
    
    List<AdresEntity> findByFirmaId(String firmaId);
}
