package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.FirmaDokumanDetayEntity;

import java.time.Instant;
import java.util.List;

@Repository
public interface FirmaDokumanDetayJpaRepository extends JpaRepository<FirmaDokumanDetayEntity, String> {

    List<FirmaDokumanDetayEntity> findByIsDeletedFalse();
}
