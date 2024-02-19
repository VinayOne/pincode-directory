import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
// import mongoose from 'mongoose';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
// import { config } from './config/config';
// import apiRoutes from './routes/routes';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/pincode-directory/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    inlineCriticalCss: false
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);
  // server.use(express.urlencoded({extended: true}));
  // server.use(express.json());

  // /* Rules of API */

  // server.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control_Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  //   // if(req.method == 'OPTIONS') {
  //   //   res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  //   //   return res.status(200).json({});
  //   // }

  //   next();
  // });

  // /* Mongoose Connections */

  // mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  // .then(() => {
  //   console.log('DB Connected')
  // })
  // .catch((error) => {
  //   console.log(error);
  // })

  // Example Express Rest API endpoints
 // server.use('/api', apiRoutes);
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['SERVER_PORT'] || 3100;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';