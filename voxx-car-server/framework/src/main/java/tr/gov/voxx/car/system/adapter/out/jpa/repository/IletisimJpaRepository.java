package tr.gov.voxx.car.system.adapter.out.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.IletisimEntity;

@Repository
public interface IletisimJpaRepository extends JpaRepository<IletisimEntity, String> {
}
