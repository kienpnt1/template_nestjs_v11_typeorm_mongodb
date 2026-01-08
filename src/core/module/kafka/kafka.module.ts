// import { Module, DynamicModule, Global } from '@nestjs/common';
// import { KafkaService } from './kafka.service';
// import { KafkaConfig } from './kafka.interface';
// import { ModuleRef } from '@nestjs/core';

// @Global()
// @Module({})
// export class KafkaModule {
//   static registerKafkaPayment(kafkaConfig: KafkaConfig): DynamicModule {
//     return {
//       global: true,
//       module: KafkaModule,
//       providers: [
//         {
//           provide: KafkaService,
//           inject: [ModuleRef],
//           useFactory: (moduleRef: ModuleRef) => {
//             return new KafkaService(moduleRef, kafkaConfig);
//           },
//         },
//       ],
//       exports: [KafkaService],
//     };
//   }
// }
