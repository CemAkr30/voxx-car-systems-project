package tr.gov.voxx.car.system.common.application.port.in;

public interface UseCaseExecutor<T, ID> {

    void post(T entity);

    void put(T entity);

    void deleteById(ID id);
}
