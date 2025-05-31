package tr.gov.voxx.car.system.common.application.port.in;

import java.util.List;

public interface QueryExecutor<T, ID> {

    T get(ID id);

    List<T> getAll();
}
