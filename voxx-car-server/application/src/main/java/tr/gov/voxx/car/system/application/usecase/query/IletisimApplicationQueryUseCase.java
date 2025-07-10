package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.IletisimApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.IletisimPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Iletisim;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IletisimApplicationQueryUseCase implements IletisimApplicationQueryPort {

    private final IletisimPersistenceJpaPort iletisimPersistenceJpaPort;

    @Override
    @Cacheable(value = "iletisim", key = "#iletisimId")
    public Iletisim get(IletisimId iletisimId) {
        return iletisimPersistenceJpaPort.findById(iletisimId);
    }

    @Override
    public List<Iletisim> getAll() {
        return iletisimPersistenceJpaPort.findAll();
    }

    @Override
    public List<Iletisim> findFirmaIdGetAll(String firmaId) {
        return iletisimPersistenceJpaPort.findFirmaIdGetAll(firmaId);
    }
}
