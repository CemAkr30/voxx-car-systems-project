package tr.gov.voxx.car.system.adapter.in.web.mapper;

import lombok.experimental.UtilityClass;
import tr.gov.voxx.car.system.adapter.in.web.data.FilodanCikisRequest;
import tr.gov.voxx.car.system.adapter.in.web.data.FilodanCikisResponse;
import tr.gov.voxx.car.system.domain.entity.FilodanCikis;
import tr.gov.voxx.car.system.domain.valueobject.AracFiloId;

import java.util.List;

@UtilityClass
public class FilodanCikisMapper {
    public static FilodanCikisResponse toResponse(FilodanCikis filodanCikis) {
        return FilodanCikisResponse.builder()
                .id(filodanCikis.getId().getValue())
                .aracFiloId(filodanCikis.getAracFiloId().getValue())
                .filodanCikisNedeni(filodanCikis.getFilodanCikisNedeni())
                .filodanCikisTarihi(filodanCikis.getFilodanCikisTarihi())
                .alici(filodanCikis.getAlici())
                .anahtarTeslimFiyati(filodanCikis.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(filodanCikis.getAracDevirGiderleri())
                .faturaYukle(filodanCikis.getFaturaYukle())
                .aciklama(filodanCikis.getAciklama())
                .createdAt(filodanCikis.getCreatedAt())
                .updatedAt(filodanCikis.getUpdatedAt())
                .build();
    }

    public static FilodanCikis toFilodanCikis(FilodanCikisRequest request) {
        return FilodanCikis.builder()
                .aracFiloId(new AracFiloId(request.getAracFiloId()))
                .filodanCikisNedeni(request.getFilodanCikisNedeni())
                .filodanCikisTarihi(request.getFilodanCikisTarihi())
                .alici(request.getAlici())
                .anahtarTeslimFiyati(request.getAnahtarTeslimFiyati())
                .aracDevirGiderleri(request.getAracDevirGiderleri())
                .faturaYukle(request.getFaturaYukle())
                .aciklama(request.getAciklama())
                .build();
    }


    public static List<FilodanCikisResponse> toResponseList(List<FilodanCikis> filodanCikisList) {
        return filodanCikisList.stream()
                .map(FilodanCikisMapper::toResponse)
                .toList();
    }
}


