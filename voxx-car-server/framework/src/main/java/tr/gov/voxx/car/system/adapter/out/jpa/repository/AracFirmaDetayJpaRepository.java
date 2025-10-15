package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFirmaDetayEntity;

import java.time.Instant;
import java.util.List;

@Repository
public interface AracFirmaDetayJpaRepository extends JpaRepository<AracFirmaDetayEntity, String> {

    List<AracFirmaDetayEntity> findByAracFiloId(String aracFiloId);

    List<AracFirmaDetayEntity> findByFirmaId(String firmaId);

    @Query("SELECT a FROM AracFirmaDetayEntity a " +
            "WHERE :today NOT BETWEEN a.baslangicTarihi AND a.bitisTarihi")
    List<AracFirmaDetayEntity> findAllKiralanabilirAraclar(@Param("today") Instant today);

    List<AracFirmaDetayEntity> findByIsDeletedFalse();

    List<AracFirmaDetayEntity> findByDeletedFalseOrderBySozlesmeBitisTarihiAsc();

    List<AracFirmaDetayEntity> findAllByDeletedFalse();
}
