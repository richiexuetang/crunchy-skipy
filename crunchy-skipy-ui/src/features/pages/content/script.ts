import { error, log } from '../../../common/utils/log';
import { initCrunchyParent } from './services/parent';

try {
  initCrunchyParent();
  log('init crunchy parent successful');
} catch (err) {
  error('error init crunchy parent', err);
}