import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('RESERVATION_MONGODB_URL'),
      //      useNewUrlParser: true,
      //      useFindAndModify: false,
      //      useCreateIndex: true,
      //      useUnifiedTopology: true,
      //      replicaSet: this.configService.get<string>('MONGO_REPL_SET'),
      //      authSource: this.configService.get<string>('MONGO_AUTH_SOURCE'),
    };
  }
}
