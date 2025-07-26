package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.MuayeneDurumResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.Muayene;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class MuayeneDurumMapper {

    public static MuayeneDurumResponse toResponse(List<Muayene> muayeneList, Map<String, AracFilo> aracFiloMap, LocalDate kontrolTarihi) {
        Long toplamKayit = (long) muayeneList.size();
        Double toplamTutar = muayeneList.stream()
                .mapToDouble(muayene -> muayene.getMiktar() != null ? muayene.getMiktar() : 0.0)
                .sum();

        return new MuayeneDurumResponse(
                toplamKayit,
                toplamTutar,
                MuayeneDurumDetayMapper.toResponseList(muayeneList, aracFiloMap, kontrolTarihi)
        );
    }
} 