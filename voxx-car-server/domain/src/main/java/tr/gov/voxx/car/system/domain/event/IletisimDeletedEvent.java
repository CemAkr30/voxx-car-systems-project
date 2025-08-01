package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record IletisimDeletedEvent(IletisimId id, FirmaId firmaId) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public IletisimDeletedEvent(
            @JsonProperty("id") IletisimId id,
            @JsonProperty("firmaId") FirmaId firmaId) {
        this.id = id;
        this.firmaId = firmaId;
    }
}
