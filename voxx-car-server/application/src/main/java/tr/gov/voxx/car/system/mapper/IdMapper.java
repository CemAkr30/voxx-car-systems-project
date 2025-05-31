package tr.gov.voxx.car.system.mapper;

import org.mapstruct.Mapper;
import tr.gov.voxx.car.system.valueobject.MarkaId;
import tr.gov.voxx.car.system.valueobject.ModelId;

@Mapper(componentModel = "spring")
public interface IdMapper {

    default Integer modelIdToInteger(ModelId id) {
        return id != null ? id.getValue() : null;
    }

    default ModelId integerToModelId(Integer id) {
        return id != null ? new ModelId(id) : null;
    }

    default Integer markaIdToInteger(MarkaId id) {
        return id != null ? id.getValue() : null;
    }

    default MarkaId integerToMarkaId(Integer id) {
        return id != null ? new MarkaId(id) : null;
    }

    default Long markaIdToLong(MarkaId id) {
        return id != null ? id.getValue().longValue() : null;
    }

    default MarkaId longToMarkaId(Long id) {
        return id != null ? new MarkaId(id.intValue()) : null;
    }

    default ModelId longToModelId(Long id) {
        return id != null ? new ModelId(id.intValue()) : null;
    }
}


