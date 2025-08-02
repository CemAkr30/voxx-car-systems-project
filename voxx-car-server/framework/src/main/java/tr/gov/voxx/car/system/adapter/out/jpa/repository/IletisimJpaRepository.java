package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.IletisimEntity;

import java.util.List;

@Repository
public interface IletisimJpaRepository extends JpaRepository<IletisimEntity, String> {
    List<IletisimEntity> findByFirmaId(String firmaId);
    List<IletisimEntity> findByIsDeletedFalse();
}
