package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.SigortaKaskoApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.SigortaKaskoPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;
import tr.gov.voxx.car.system.domain.valueobject.SigortaId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SigortaKaskoApplicationQueryUseCase implements SigortaKaskoApplicationQueryPort {

    private final SigortaKaskoPersistenceJpaPort persistenceJpaPort;

    @Override
    @Cacheable(value = "sigortaKasko", key = "#sigortaId")
    public SigortaKasko get(SigortaId sigortaId) {
        return persistenceJpaPort.findById(sigortaId);
    }

    @Override
    public List<SigortaKasko> getAll() {
        return persistenceJpaPort.findAll();
    }

    @Override
    public List<SigortaKasko> findAracFiloIdGetAll(String aracFiloId) {
        return persistenceJpaPort.findAracFiloIdGetAll(aracFiloId);
    }
}
