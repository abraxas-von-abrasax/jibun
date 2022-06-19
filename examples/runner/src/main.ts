import { initializeJibun, StoreManager, StoreType, User } from '@jibun/core';

main().catch((error) => {
    console.error('Error while running test application:', error);
});

async function main() {
    initializeJibun(StoreType.IN_MEMORY);

    const store = StoreManager.getStore<User>('users');

    const user = new User(['firstName', 'lastName']);
    console.log('New user with ID ::', user.id);

    const stored1 = await store.save(user);
    console.log('> 1: User is stored ::', stored1);

    user.setProperty('firstName', 'Abraxas');
    user.setProperty('lastName', 'von Abrasax');

    const validUser = user.check();
    console.log('User is valid ::', validUser);

    const stored2 = await store.save(user);
    console.log('> 2: User is stored ::', stored2);

    const stored = await store.get(user.id);
    console.log(`USER PROPERTIES for '${stored.id}' ::`, stored.properties);
}
