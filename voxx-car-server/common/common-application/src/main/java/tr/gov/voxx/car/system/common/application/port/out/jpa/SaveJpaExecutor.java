package tr.gov.voxx.car.system.common.application.port.out.jpa;


public interface SaveJpaExecutor<T, ID> {
    T save(T entity);
}
