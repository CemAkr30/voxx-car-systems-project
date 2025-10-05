package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;

import java.util.List;

@Repository
public interface AracFirmaDetayJpaRepository extends JpaRepository<AracFirmaDetayEntity, String> {

    List<AracFirmaDetayEntity> findByAracFiloId(String aracFiloId);

    List<AracFirmaDetayEntity> findByFirmaId(String firmaId);

    List<AracFirmaDetayEntity> findByIsDeletedFalse();
}
