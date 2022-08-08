import { error, loadedLog } from '../../utils/log';
import { initMessenger } from './messenger';
import { initAction } from './action';

try {
    loadedLog('background/script.ts');
    initMessenger();
    initAction();
} catch (err) {
    error(err);
}