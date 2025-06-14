package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.MarkaEntity;

import java.util.List;

@Repository
public interface MarkaJpaRepository extends JpaRepository<MarkaEntity, String> {
    List<MarkaEntity> findByAdi(String adi);
}
