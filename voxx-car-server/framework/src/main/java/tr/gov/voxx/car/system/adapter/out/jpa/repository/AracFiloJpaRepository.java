package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.AracFiloEntity;

import java.util.List;

@Repository
public interface AracFiloJpaRepository extends JpaRepository<AracFiloEntity, String> {
    List<AracFiloEntity> findByIsDeletedFalse();

    List<AracFiloEntity> findByDeletedFalseAndFiloDurum(Integer filoDurum);

    @Modifying
    @Query("UPDATE AracFiloEntity a SET a.filoDurum = :durum WHERE a.id = :aracFiloId")
    void updateFiloDurum(@Param("aracFiloId") String aracFiloId, @Param("durum") Integer durum);
}
