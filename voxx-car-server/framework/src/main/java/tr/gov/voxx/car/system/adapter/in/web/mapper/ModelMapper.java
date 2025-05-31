package tr.gov.voxx.car.system.adapter.in.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.ModelResponse;
import tr.gov.voxx.car.system.entity.Model;
import tr.gov.voxx.car.system.mapper.IdMapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = IdMapper.class)
public interface ModelMapper {

    ModelMapper INSTANCE = Mappers.getMapper(ModelMapper.class);

    ModelResponse toResponse(Model model);

    Model toModel(ModelRequest request);

    List<ModelResponse> toResponseList(List<Model> models);
}
