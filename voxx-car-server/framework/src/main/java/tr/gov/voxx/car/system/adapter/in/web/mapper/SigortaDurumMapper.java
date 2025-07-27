package tr.gov.voxx.car.system.adapter.in.web.mapper;

import tr.gov.voxx.car.system.adapter.in.web.data.SigortaDurumResponse;
import tr.gov.voxx.car.system.adapter.in.web.data.SigortaDurumDetayResponse;
import tr.gov.voxx.car.system.domain.entity.AracFilo;
import tr.gov.voxx.car.system.domain.entity.SigortaKasko;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class SigortaDurumMapper {

    public static SigortaDurumResponse toResponse(List<SigortaKasko> sigortaList, Map<String, AracFilo> aracFiloMap, LocalDate kontrolTarihi) {
        Long toplamKayit = (long) sigortaList.size();

        SigortaDurumDetayResponse detay = null;
        if (!sigortaList.isEmpty()) {
            detay = SigortaDurumDetayMapper.toResponse(sigortaList.get(0), aracFiloMap, kontrolTarihi);
        }

        return new SigortaDurumResponse(
                toplamKayit,
                detay
        );
    }
} 