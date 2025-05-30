package tr.gov.voxx.car.system.adapter.out.jpa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import tr.gov.voxx.car.system.adapter.out.jpa.entity.ModelEntity;
import tr.gov.voxx.car.system.entity.Model;

import java.util.List;

@Mapper
public interface ModelJpaMapper {

    ModelJpaMapper INSTANCE = Mappers.getMapper(ModelJpaMapper.class);

    Model toModel(ModelEntity entity);

    ModelEntity toEntity(Model model);

    List<Model> toModelList(List<ModelEntity> entities);
}
