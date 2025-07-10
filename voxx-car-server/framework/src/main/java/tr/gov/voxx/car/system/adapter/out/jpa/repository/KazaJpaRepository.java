package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.KazaEntity;

import java.util.List;

@Repository
public interface KazaJpaRepository extends JpaRepository<KazaEntity, String> {
    List<KazaEntity> findByAracId(String aracId);
}
