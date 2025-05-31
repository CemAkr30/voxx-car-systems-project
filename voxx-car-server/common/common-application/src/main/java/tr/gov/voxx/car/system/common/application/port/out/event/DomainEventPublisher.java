package tr.gov.voxx.car.system.common.application.port.out.event;

public interface DomainEventPublisher {
    void publish(String topic, Object event);
}
