package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.HasarEntity;

import java.util.List;

@Repository
public interface HasarJpaRepository extends JpaRepository<HasarEntity, String> {
    List<HasarEntity> findByAracFiloId(String aracFiloId);

}
