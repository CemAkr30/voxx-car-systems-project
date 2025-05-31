package tr.gov.voxx.car.system.common.application.port.out.jpa;

import java.util.List;

public interface PersistenceJpaExecutor<T, ID> {
    T findById(ID id);

    List<T> findAll();

    T persist(T entity);

    T merge(T entity);

    void deleteById(ID id);
}
