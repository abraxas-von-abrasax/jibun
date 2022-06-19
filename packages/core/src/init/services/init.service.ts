import { StoreManager, StoreType } from '../../store';

export function initializeJibun(storeType: StoreType) {
    StoreManager.initialize(storeType);
}
