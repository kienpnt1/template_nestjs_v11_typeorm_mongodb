import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { CompressionMiddleware } from '@nest-middlewares/compression';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@databases/typeorm-config/typeorm-config.module';
import { APP_CONFIG } from '@configs/app.config';

import { LoggerModule } from '@core/module/logger/logger.module';
import { CommonModule } from '@modules/common/common.module';
import { AdminDemoModule } from '@modules-admin/demo/demo.module';
import { GuestDemoModule } from '@modules-guest/demo/demo.module';
import { JwtStrategy } from '@strategies/jwt.strategy';


//#region Open when using Redis
// import { RedisCustomModule } from '@core/module/redis';
//#endregion

//#region Open when using message bus kafka
// import { ProducerModule } from '@modules-internal/queues/producer/producer.module';
// import { ConsumerModule } from '@modules-internal/queues/consumer/consumer.module';
// import { KafkaModule } from '@core/module/kafka';
//#endregion

//#region Open when using event sourcing
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { EventStoreModule } from '@modules-internal/events-store/event-store.module';
//#endregion

@Module({
  imports: [
    LoggerModule.register({
      path: APP_CONFIG.ENV.LOGS.PATH,
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    CommonModule,
    //#region Modules Admin
    AdminDemoModule,
    //#endregion

    //#region Modules Guest
    GuestDemoModule,
    //#endregion
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    CompressionMiddleware.configure({});
    CorsMiddleware.configure({});
    consumer.apply(MorganMiddleware, CompressionMiddleware, CorsMiddleware).forRoutes('*');
  }
}
