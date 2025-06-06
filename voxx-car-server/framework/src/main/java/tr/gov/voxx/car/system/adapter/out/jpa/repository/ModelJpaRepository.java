package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.ModelEntity;

import java.util.List;

@Repository
public interface ModelJpaRepository extends JpaRepository<ModelEntity, String> {

    List<ModelEntity> findByAdi(String adi);
}
