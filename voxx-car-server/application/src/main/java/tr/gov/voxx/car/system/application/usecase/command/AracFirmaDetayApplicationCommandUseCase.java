package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFirmaDetayApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AracFirmaDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;

@Slf4j
@Service
@RequiredArgsConstructor
public class AracFirmaDetayApplicationCommandUseCase implements AracFirmaDetayApplicationCommandPort {

    private final AracFirmaDetayPersistenceJpaPort aracFirmaDetayPersistenceJpaPort;

    @Override
    public void post(AracFirmaDetay entity) {
        entity.initIdGenerator();
        aracFirmaDetayPersistenceJpaPort.persist(entity);
        log.info("Persisting new aracfirmadetay: {}", entity);
    }

    @Override
    public void put(AracFirmaDetay entity) {
        AracFirmaDetay existing = aracFirmaDetayPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("aracfirmadetay not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);
        aracFirmaDetayPersistenceJpaPort.merge(existing);
        log.info("Updating existing aracfirmadetay: {}", existing);
    }

    @Override
    public void deleteById(AracFirmaDetayId aracFirmaDetayId) {
        AracFirmaDetay existing = aracFirmaDetayPersistenceJpaPort.findById(aracFirmaDetayId);
        if (existing == null) {
            throw new NotFoundException("aracfirmadetay not found with id: " + aracFirmaDetayId);
        }

        aracFirmaDetayPersistenceJpaPort.deleteById(aracFirmaDetayId);
        log.info("Deleting existing aracfirmadetay: {}", existing);
    }
}

