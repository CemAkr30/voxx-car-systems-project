package tr.gov.voxx.car.system.base;

import java.util.List;

public interface BasePersistenceJpaService<T, ID> {

    T findById(ID id);

    T create(T entity);

    T merge(T entity);

    void remove(ID id);

    List<T> findAll();
}
