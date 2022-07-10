import { GroupModule } from '../../groups';
import { StoreModule } from '../../store';

export async function initializeJibun(): Promise<void> {
    StoreModule.initialize();
    await GroupModule.initialize();
}
