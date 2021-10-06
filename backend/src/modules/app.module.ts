import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './user.module';
import { PetPostModule } from './pet-post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    MongooseModule.forRoot(String(process.env['DB_URI']), {
      useUnifiedTopology: true,
      autoIndex: true,
      keepAlive: true,
    }),
    UserModule,
    PetPostModule,
  ],
})
export class AppModule {}
