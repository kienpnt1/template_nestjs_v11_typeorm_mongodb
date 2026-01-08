import { registerExtensionMethods } from '@core/extend-method';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';
import { APP_CONFIG } from '@configs/app.config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { XssSanitizerPipe } from './pipes';
import { AdminDemoModule } from '@modules-admin/demo/demo.module';
import { GuestDemoModule } from '@modules-guest/demo/demo.module';

async function bootstrap() {
  const port = APP_CONFIG.ENV.APP.PORT || 9999;
  const debugLogs: any[] = ['warn', 'error', 'debug', 'log', 'verbose'];
  const logger = debugLogs;
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  registerExtensionMethods({ response: true });
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        let message: string = '';
        errors.map((item, index) => {
          message = message + Object.values(item.constraints).join(', ');
          if (index !== errors.length - 1) {
            message = message + ', ';
          }
        });
        return new BadRequestException(errors, message);
      },
    }),
    new XssSanitizerPipe(),
  );
  app.setGlobalPrefix(`api/${APP_CONFIG.ENV.VERSION}`);
  
  // Swagger Setup
  if (!APP_CONFIG.IS_PRODUCTION) {
    // Admin Document
    const adminConfig = new DocumentBuilder()
      .setTitle('Admin API Service')
      .setDescription('API documentation for Admin modules')
      .setVersion(APP_CONFIG.ENV.VERSION)
      .addBearerAuth() // Security definition for Bearer Token
      .addTag('Admin - Demo')
      .build();
    const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
      include: [AdminDemoModule],
    });
    SwaggerModule.setup('docs/admin', app, adminDocument);

    // Guest Document
    const guestConfig = new DocumentBuilder()
      .setTitle('Guest API Service')
      .setDescription('API documentation for Guest modules')
      .setVersion(APP_CONFIG.ENV.VERSION)
      .addTag('Guest - Demo')
      .build();
    const guestDocument = SwaggerModule.createDocument(app, guestConfig, {
      include: [GuestDemoModule],
    });
    SwaggerModule.setup('docs/guest', app, guestDocument);
  }

  app.enableShutdownHooks();
  await app.listen(port, () => {
    new Logger('Main').verbose(`Application listening on port ${port}`);
    new Logger('Main').verbose(`Swagger Admin UI: http://localhost:${port}/docs/admin`);
    new Logger('Main').verbose(`Swagger Guest UI: http://localhost:${port}/docs/guest`);
  });
}
bootstrap();
