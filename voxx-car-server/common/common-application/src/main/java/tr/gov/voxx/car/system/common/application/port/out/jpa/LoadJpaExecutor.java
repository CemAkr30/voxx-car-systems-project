package tr.gov.voxx.car.system.common.application.port.out.jpa;

import java.util.List;

public interface LoadJpaExecutor<T, ID> {
    T findById(ID id);
    List<T> findAll();
}
