package tr.gov.voxx.car.system.domain.event;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import tr.gov.voxx.car.system.domain.enumeration.IletisimTipi;
import tr.gov.voxx.car.system.domain.valueobject.FirmaId;
import tr.gov.voxx.car.system.domain.valueobject.IletisimId;

import java.io.Serial;
import java.io.Serializable;

@Builder
public record IletisimCreatedEvent(
        IletisimId id,
        String numara,
        IletisimTipi tip,
        FirmaId firmaId
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @JsonCreator
    public IletisimCreatedEvent(
            @JsonProperty("id") IletisimId id,
            @JsonProperty("numara") String numara,
            @JsonProperty("tip") IletisimTipi tip,
            @JsonProperty("firmaId") FirmaId firmaId
    ) {
        this.id = id;
        this.numara = numara;
        this.tip = tip;
        this.firmaId = firmaId;
    }
}

