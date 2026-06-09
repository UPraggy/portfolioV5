import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'portfoliov5',
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/styles.css',
  taskQueue: 'async',
  sourceMap: true,
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'https://rafaelmr.com.br/',
      prerenderConfig: './prerender.config.ts',
      copy: [
        { src: 'llms.txt' },
        { src: 'CNAME' },
        // pagina extra NossoAmor (Tay) + seus assets, portada do V4
        { src: 'nossoamor.html', dest: 'nossoamor/index.html' },
        { src: 'static', dest: 'portifoliov4/static' },
      ],
    },
  ],
};
