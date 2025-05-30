package tr.gov.voxx.car.system.base;

import java.util.List;

public interface BaseApplicationService<T, ID> {

    T get(ID id);

    T post(T entity);

    T put(T entity);

    void deleteById(ID id);

    List<T> getAll();
}
