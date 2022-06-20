import { GroupModule } from '../../groups';
import { StoreModule } from '../../store';

export function initializeJibun() {
    StoreModule.initialize();
    GroupModule.initialize();
}
