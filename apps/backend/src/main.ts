/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';

/* eslint @typescript-eslint/no-var-requires: "off" */
const processRequest = require('graphql-upload/processRequest.js')

function fastifyGraphQLUpload(fastify) {
  fastify.addContentTypeParser('multipart', (req, body, done) => {
    req.isMultipart = true
    done()
  })

  fastify.addHook('preValidation', async function(request, reply) {
    if (!request.isMultipart) {
      return
    }
    request.body = await processRequest(request.raw, reply.raw)
  })
}

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  fastifyGraphQLUpload(fastifyAdapter.getInstance());

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
