import { HttpException, INestApplication, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { OpenApiConfig } from './openapi.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenapiService {
  #spec?: OpenAPIObject;

  get spec() {
    return this.#spec
  }

  get specOrThrow() {
    if (!this.#spec) {
      throw new InternalServerErrorException("expected has spec from open api");
    }

    return this.#spec;
  }

  constructor(private config: ConfigService<OpenApiConfig>) {}

  setupFromApp(app: INestApplication) {
    const title = this.config.getOrThrow("name");
    const desc = this.config.getOrThrow('description');

    const swaggerDoc = new DocumentBuilder()
      .setTitle(title)
      .setDescription(
        `${desc} <br/><br />SDK Available at : <ul><li>NPM Is not available now</li><li><a href='/sdk/download/typescript'>Download SDK File</a></li></ul>`,
      )
      .setVersion("latest")
      .setContact('Abdul Aziz Al Basyir', "claritate.work/author", "abdulazizalbasyir119@gmail.com")
      .addBearerAuth()
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerName: string, methodName: string) =>
        methodName,
      extraModels: [],
    };

    const document = SwaggerModule.createDocument(app, swaggerDoc, options);

    const schemas = document?.components?.schemas;

    // TODO: must be extraModels
    if (schemas) {
      schemas['BadRequestError'] = {
        type: 'object',
        properties: {
          property: {
            type: 'string',
            description: 'information which data failed',
          },
          concern: {
            type: 'string',
            description: 'data problem that was facing',
          },
        },
      };

      schemas['HttpException'] = {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            description: 'normal HTTP status code that reflected with our header',
          },
          message: {
            type: 'string',
            description: 'message from service',
          },
          errors: {
            type: 'object',
            description:
              '<b>maybe</b> contains error(s) detail description for spesifict error content(s) ex. bad request',
            oneOf: [
              {
                type: 'array',
                items: schemas['BadRequestError'],
              },
            ],
          },
        },
        required: ['statusCode', 'message'],
      };
    };

    this.#spec = document;

    SwaggerModule.setup('docs', app, document, {
      customCss: '.topbar { display: none !important; }',
      customSiteTitle: title,
      swaggerOptions: {
        docExpansion: 'none',
      },
      customfavIcon: '-',
    });

    // TODO : Scalar bug at import & upload endpoint
    app.use(
      '/',
      apiReference({
        spec: {
          content: document,
        },
      }),
    );
  }
}
