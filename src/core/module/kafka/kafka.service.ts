// import { APP_CONFIG } from '@configs/app.config';
// import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
// import { Consumer, Kafka, Producer } from 'kafkajs';
// import { ModuleRef } from '@nestjs/core';
// import { SUBSCRIBER_MAP } from './kafka.decorator';
// import { KafkaConfig, KafkaPayload } from './kafka.interface';

// @Injectable()
// export class KafkaService implements OnModuleInit, OnApplicationShutdown {
//   private readonly logger = new Logger(KafkaService.name);

//   private kafka: Kafka;
//   private producer: Producer;
//   private consumers: Map<string, Consumer> = new Map();
//   private isDev = !APP_CONFIG.IS_PRODUCTION;

//   constructor(
//     private moduleRef: ModuleRef,
//     private kafkaConfig: KafkaConfig,
//   ) {
//     this.kafka = new Kafka({
//       clientId: this.kafkaConfig.clientId,
//       brokers: this.kafkaConfig.brokers,
//     });
//     this.producer = this.kafka.producer();
//   }

//   async onModuleInit() {
//     // Map prototype -> instance từ DI container
//     for (const subscribers of SUBSCRIBER_MAP.values()) {
//       for (const sub of subscribers) {
//         if (!sub.context && sub.prototype) {
//           sub.context = this.moduleRef.get(sub.prototype.constructor, {
//             strict: false,
//           });
//         }
//       }
//     }

//     await this.connectProducer();
//     await this.initTopics();

//     if (this.isDev) {
//       this.logger.warn('KAFKA MODE DEVELOPMENT');
//       await this.createSingleConsumerForAllTopics();
//     } else {
//       this.logger.warn('KAFKA MODE PRODUCTION');
//       for (const topic of SUBSCRIBER_MAP.keys()) {
//         await this.createConsumerForTopic(topic);
//       }
//     }
//   }

//   async onApplicationShutdown(signal?: string) {
//     this.logger.log(`App shutting down due to signal: ${signal}`);
//     await this.shutdownKafka();
//   }

//   private async initTopics() {
//     const admin = this.kafka.admin();
//     await admin.connect();

//     const topics = this.kafkaConfig.topics.map((topic) => ({
//       topic: topic.toString(),
//       numPartitions: 1,
//       replicationFactor: 1,
//     }));

//     try {
//       const created = await admin.createTopics({
//         waitForLeaders: true,
//         topics,
//       });
//       this.logger.log(`Topics created: ${created}`);
//     } catch (err) {
//       this.logger.error('Error creating topics', err);
//     } finally {
//       await admin.disconnect();
//     }
//   }

//   private async shutdownKafka() {
//     await Promise.all([
//       ...Array.from(this.consumers.values()).map((c) =>
//         c.disconnect().catch((e) => {
//           this.logger.error('Consumer disconnect error', e.stack);
//         }),
//       ),
//       this.producer.disconnect().catch((e) => {
//         this.logger.error('Producer disconnect error', e.stack);
//       }),
//     ]);
//   }

//   private async connectProducer() {
//     await this.producer.connect();
//   }

//   async sendBatchMessages(topic: string, kafkaMessages: KafkaPayload | KafkaPayload[]): Promise<void> {
//     try {
//       const arrayMessage = Array.isArray(kafkaMessages) ? kafkaMessages : [kafkaMessages];

//       const messages = arrayMessage
//         .filter((item) => item.message !== undefined)
//         .map((item) => ({
//           key: item.key !== undefined ? String(item.key) : undefined,
//           value: JSON.stringify(item.message),
//         }));

//       const payload = { topic, messages };
//       this.logger.debug(`Send Kafka Message: ${JSON.stringify(payload)}`);
//       await this.producer.send(payload);
//     } catch (err) {
//       this.logger.error('Error sending Kafka message', err);
//       this.logger.error(`Failed messages: ${JSON.stringify(kafkaMessages)}`);
//     }
//   }

//   /** PROD MODE: Mỗi topic một consumer */
//   private async createConsumerForTopic(topic: string) {
//     const consumer = this.kafka.consumer({
//       groupId: `${this.kafkaConfig.groupId}-${topic}`,
//       sessionTimeout: 600000,
//       heartbeatInterval: 3000,
//     });

//     await consumer.connect();
//     await consumer.subscribe({ topic, fromBeginning: false });

//     await consumer.run({
//       partitionsConsumedConcurrently: 1,
//       eachMessage: async ({ topic, partition, message }) => {
//         try {
//           const subscribers = SUBSCRIBER_MAP.get(topic) || [];
//           const value = message.value?.toString();

//           for (const { handler, context } of subscribers) {
//             await handler.apply(context, [value]);
//           }

//           this.logger.debug(`[${topic}] partition ${partition} offset ${message.offset}`);
//         } catch (err) {
//           this.logger.error(`Error handling message from ${topic}`, err);
//         }
//       },
//     });

//     this.consumers.set(topic, consumer);
//     this.logger.log(`Consumer created for topic: ${topic}`);
//   }

//   /** DEV MODE: 1 consumer cho tất cả topic */
//   private async createSingleConsumerForAllTopics() {
//     const consumer = this.kafka.consumer({
//       groupId: `${this.kafkaConfig.groupId}-dev`,
//       sessionTimeout: 10000,
//       heartbeatInterval: 3000,
//     });

//     await consumer.connect();

//     const topics = Array.from(SUBSCRIBER_MAP.keys());
//     for (const topic of topics) {
//       await consumer.subscribe({ topic, fromBeginning: false });
//     }

//     await consumer.run({
//       partitionsConsumedConcurrently: 1,
//       eachMessage: async ({ topic, partition, message }) => {
//         try {
//           const subscribers = SUBSCRIBER_MAP.get(topic) || [];
//           const value = message.value?.toString();

//           for (const { handler, context } of subscribers) {
//             await handler.apply(context, [value]);
//           }

//           this.logger.debug(`[${topic}] partition ${partition} offset ${message.offset}`);
//         } catch (err) {
//           this.logger.error(`Error handling message from ${topic}`, err);
//         }
//       },
//     });

//     this.consumers.set('dev', consumer);
//     this.logger.log(`Single consumer created for topics: ${topics.join(', ')}`);
//   }
// }
