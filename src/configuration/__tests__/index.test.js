import { config } from '../index';
import * as fromDev from '../dev';
import * as fromLocal from '../local';
import * as fromProd from '../prod';
import * as fromStaging from '../staging';

describe('configuration/index', () => {
  let value;
  const OLD_ENV = process.env;

  const setup = () => {
    jest.resetModules()
    process.env = { ...OLD_ENV, REACT_APP_ENV: value };
  }
  beforeEach(() => {
    value = 'dev';
  });
  it('should take right config based on environment variable', () => {
    setup();
    expect(config()).toBe(fromDev);
  });
  it('should take local config', () => {
    value = 'local';
    setup();
    expect(config()).toBe(fromLocal);
  });
  it('should take prod config', () => {
    value = 'prod';
    setup();
    expect(config()).toBe(fromProd);
  });
  it('should take staging config', () => {
    value = 'staging';
    setup();
    expect(config()).toBe(fromStaging);
  });
})
