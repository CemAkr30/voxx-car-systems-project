package tr.gov.voxx.car.system.application.usecase.query;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AdresApplicationQueryPort;
import tr.gov.voxx.car.system.application.port.out.AdresPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.Adres;
import tr.gov.voxx.car.system.domain.valueobject.AdresId;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdresApplicationQueryUseCase implements AdresApplicationQueryPort {

    private final AdresPersistenceJpaPort adresPersistenceJpaPort;

    @Override
    @Cacheable(value = "adres", key = "#adresId")
    public Adres get(AdresId adresId) {
        return adresPersistenceJpaPort.findById(adresId);
    }

    @Override
    public List<Adres> getAll() {
        return adresPersistenceJpaPort.findAll();
    }

    @Override
    public List<Adres> findFirmaIdGetAll(String firmaId) {
        return adresPersistenceJpaPort.findFirmaIdGetAll(firmaId);
    }
}
