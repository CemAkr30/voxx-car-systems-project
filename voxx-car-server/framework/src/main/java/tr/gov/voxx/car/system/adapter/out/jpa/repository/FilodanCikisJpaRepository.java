package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FilodanCikisEntity;

import java.util.List;

@Repository
public interface FilodanCikisJpaRepository extends JpaRepository<FilodanCikisEntity, String> {
    List<FilodanCikisEntity> findByAracFiloId(String aracFiloId);
    List<FilodanCikisEntity> findByIsDeletedFalse();
}
