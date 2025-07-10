package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AlisFaturasiEntity;

import java.util.List;

@Repository
public interface AlisFaturasiJpaRepository extends JpaRepository<AlisFaturasiEntity, String> {
    List<AlisFaturasiEntity> findByAracId(String aracId);

}
