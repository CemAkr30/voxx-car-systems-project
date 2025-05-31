package tr.gov.voxx.car.system.common.domain.core;

import lombok.experimental.UtilityClass;

import java.util.UUID;

@UtilityClass
public class IdFactory {

    /**
     * Benzersiz UUID oluşturur. (36 karakter)
     */
    public static String create() {
        return UUID.randomUUID().toString();
    }

    /**
     * Tire olmadan kısa UUID oluşturur. (32 karakter)
     */
    public static String createCompact() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * Timestamp ve rastgele sayı kombinasyonu ile özel bir ID üretir.
     * Örn: 20250531104523-1a2b3c
     */
    public static String createWithTimestamp() {
        return System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 6);
    }
}

