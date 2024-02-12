import { App } from './app';

const createSingleNodeApp = () => {
  const app = new App();

  return app.createServer();
};

const listenSingleNodeApp = (port: number) => {
  createSingleNodeApp().listen(port);
  console.log(`Server started on port: ${port}`);
};

export { createSingleNodeApp, listenSingleNodeApp };
