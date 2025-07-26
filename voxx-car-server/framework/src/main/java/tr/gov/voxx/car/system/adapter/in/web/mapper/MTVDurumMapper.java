package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.MTVDurumResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.Mtv;

import java.util.List;
import java.util.Map;

public class MTVDurumMapper {

    public static MTVDurumResponse toResponse(List<Mtv> mtvList, Map<String, AracFilo> aracFiloMap) {
        Long toplamKayit = (long) mtvList.size();
        Double toplamTutar = mtvList.stream()
                .mapToDouble(mtv -> mtv.getMiktar() != null ? mtv.getMiktar() : 0.0)
                .sum();

        return new MTVDurumResponse(
                toplamKayit,
                toplamTutar,
                MTVDurumDetayMapper.toResponseList(mtvList, aracFiloMap)
        );
    }
} 