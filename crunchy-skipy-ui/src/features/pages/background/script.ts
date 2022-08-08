import { initMessenger } from './messenger';
import { initAction } from './action';
import { error, loadedLog } from '../../../common/utils/log';

try {
    loadedLog('background/script.ts');
    initMessenger();
    initAction();
} catch (err) {
    error(err);
}