import app from './libs/express';
import sequelize, { checkConnection } from './libs/sequelize';
import './models/loadModels';

const port = app.get('port');

const setServer = async () => {
  await sequelize.sync(
    //{force: true}
  );

}

setServer().then(() => {
  app.listen(port, () => {
    console.log('stay-uncle:server:' +  `Listening on ${port}`);
  });
});


