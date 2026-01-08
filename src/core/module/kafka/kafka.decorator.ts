// import { Logger } from '@nestjs/common';

// export interface Subscriber {
//   handler: (...args: any[]) => any;
//   context: any | null; // instance sẽ gán sau
//   prototype: any; // giữ prototype để map về instance
// }

// export const SUBSCRIBER_MAP = new Map<string, Subscriber[]>();

// /**
//  * Decorator đăng ký method làm Kafka subscriber cho topic
//  */
// export function SubscribeTo(topic: string) {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const originalMethod = descriptor.value as (...args: any[]) => any;

//     if (!SUBSCRIBER_MAP.has(topic)) {
//       SUBSCRIBER_MAP.set(topic, []);
//     }

//     SUBSCRIBER_MAP.get(topic)!.push({
//       handler: originalMethod,
//       context: null, // instance thực sẽ gán trong KafkaService
//       prototype: target, // lưu prototype
//     });

//     const logger = new Logger('KafkaDecorator');
//     logger.debug(`Registered subscriber for topic: ${topic} → ${target.constructor.name}.${propertyKey}`);

//     return descriptor;
//   };
// }
