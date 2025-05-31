package tr.gov.voxx.car.system.common.application.port.out.jpa;


public interface DeleteJpaExecutor<ID> {
    void deleteById(ID id);
}
