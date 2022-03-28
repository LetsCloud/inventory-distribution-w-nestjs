import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SagasModule } from './sagas/sagas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SagasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
