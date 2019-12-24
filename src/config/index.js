import * as fromDev from './dev';
import * as fromLocal from './local';
import * as fromProd from './prod';
import * as fromStaging from './staging';

const config = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'dev':
      return fromDev;
    case 'local':
      return fromLocal;
    case 'prod':
      return fromProd;
    case 'staging':
      return fromStaging;
    default:
      return fromDev;
  }
}

export default { ...config() };
