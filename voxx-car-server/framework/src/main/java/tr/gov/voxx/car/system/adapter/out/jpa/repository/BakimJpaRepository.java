package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.BakimEntity;

import java.util.List;

@Repository
public interface BakimJpaRepository extends JpaRepository<BakimEntity, String> {
    List<BakimEntity> findByAracId(String aracId);

}
