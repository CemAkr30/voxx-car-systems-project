package tr.gov.voxx.car.system.entity;

import tr.gov.voxx.car.system.valueobject.MarkaId;
import tr.gov.voxx.car.system.valueobject.ModelId;

import java.security.SecureRandom;
import java.time.Instant;

public class Model extends AbstractAggregateModel<ModelId> {
    private String adi;
    private MarkaId markaId;

    public void init(){
        super.setId(new ModelId(generateId()));
    }

    public void modifiedToDomain(Model initModel){
        this.adi = initModel.getAdi();
        this.markaId = initModel.getMarkaId();
    }

    public int generateId(){
        SecureRandom RANDOM = new SecureRandom();
        long timePart = Instant.now().toEpochMilli();
        int randomPart = RANDOM.nextInt(1024);
        return randomPart;
    }

    public MarkaId getMarkaId() {
        return markaId;
    }

    public String getAdi() {
        return adi;
    }
}
