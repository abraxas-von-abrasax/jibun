import { initializeJibun, StoreManager, User } from '@jibun/core';

main().catch((error) => {
    console.error('Error while running test application:', error);
});

async function main() {
    initializeJibun();

    const store = StoreManager.getStore<User>('users');

    const user = new User();
    console.log('Created new user ::', user);

    await store.save(user);

    const stored = await store.get(user.id);
    console.log('User is stored ::', stored);
    console.log(`User properties for '${stored.id}' ::`, stored.properties);
}
