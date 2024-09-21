import { INestApplication, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { OpenApiConfig } from './openapi.config';
import { ConfigService } from '@nestjs/config';
import { ServiceException } from './models/http-exception.model';
import { ServiceUnprocessableEntityException } from './models/unprocessable-entity.model';

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

  constructor(
    private config: ConfigService<OpenApiConfig>
  ) { }

  setupFromApp(app: INestApplication) {
    const title = this.config.getOrThrow("name");
    const desc = this.config.getOrThrow('description');
    const maintainer = this.config.getOrThrow<OpenApiConfig['maintainer']>('maintainer')

    const swaggerDoc = new DocumentBuilder()
      .setTitle(title)
      .setDescription(
        `${desc} <br/><br />SDK Available at : <ul><li>NPM Is not available now</li><li><a href='/sdk/download/typescript'>Download SDK File</a></li></ul>`,
      )
      .setVersion("latest")
      .setContact(maintainer.name, maintainer.website, maintainer.website)
      .addBearerAuth()
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerName, methodName) => methodName,
      extraModels: [ServiceException, ServiceUnprocessableEntityException],
    };

    const document = SwaggerModule.createDocument(app, swaggerDoc, options);

    this.#spec = document;

    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: title,
      swaggerOptions: {
        docExpansion: 'none',
      },
      customfavIcon: '-',
    });

    app.use(
      '/reference',
      apiReference({ spec: { content: document } }),
    );
  }
}
