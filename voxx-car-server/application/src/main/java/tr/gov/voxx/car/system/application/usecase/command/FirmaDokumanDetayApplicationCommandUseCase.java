package tr.gov.voxx.car.system.application.usecase.command;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.gov.voxx.car.system.application.port.in.AracFirmaDetayApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.in.FirmaDokumanDetayApplicationCommandPort;
import tr.gov.voxx.car.system.application.port.out.AracFirmaDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.application.port.out.FirmaDokumanDetayPersistenceJpaPort;
import tr.gov.voxx.car.system.domain.entity.AracFirmaDetay;
import tr.gov.voxx.car.system.domain.entity.FirmaDokumanDetay;
import tr.gov.voxx.car.system.domain.exception.NotFoundException;
import tr.gov.voxx.car.system.domain.valueobject.AracFirmaDetayId;
import tr.gov.voxx.car.system.domain.valueobject.FirmaDokumanDetayId;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirmaDokumanDetayApplicationCommandUseCase implements FirmaDokumanDetayApplicationCommandPort {

    private final FirmaDokumanDetayPersistenceJpaPort firmaDokumanDetayPersistenceJpaPort;

    @Override
    public void post(FirmaDokumanDetay entity) {
        entity.initIdGenerator();
        firmaDokumanDetayPersistenceJpaPort.persist(entity);
        log.info("Persisting new firmadokumandetay: {}", entity);
    }

    @Override
    public void put(FirmaDokumanDetay entity) {
        FirmaDokumanDetay existing = firmaDokumanDetayPersistenceJpaPort.findById(entity.getId());
        if (existing == null) {
            throw new NotFoundException("firmadokumandetay not found with id: " + entity.getId());
        }
        existing.updateFrom(entity);
        firmaDokumanDetayPersistenceJpaPort.merge(existing);
        log.info("Updating existing firmadokumandetay: {}", existing);
    }

    @Override
    public void deleteById(FirmaDokumanDetayId firmaDokumanDetayId) {
        FirmaDokumanDetay existing = firmaDokumanDetayPersistenceJpaPort.findById(firmaDokumanDetayId);
        if (existing == null) {
            throw new NotFoundException("firmadokumandetay not found with id: " + firmaDokumanDetayId);
        }

        firmaDokumanDetayPersistenceJpaPort.deleteById(firmaDokumanDetayId);
        log.info("Deleting existing firmadokumandetay: {}", existing);
    }
}

