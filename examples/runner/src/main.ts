import { GroupManager, initializeJibun, StoreManager, User } from '@jibun/core';

main().catch((error) => {
    console.error('Error while running test application:', error);
});

async function main() {
    initializeJibun();

    GroupManager.setGlobalMandatoryProperties(['firstName', 'lastName']);

    const store = StoreManager.getStore<User>('users');

    const user = new User();
    console.log('Created new user ::', user);

    console.log('> User in group ::', user.group);
    console.log('> Mandatory fields ::', user.mandatoryFields);
    console.log('> User is valid ::', user.check());

    console.log('Setting properties...');
    user.setProperty('firstName', 'Abraxas');
    user.setProperty('lastName', 'von Abrasax');
    user.setProperty('age', 365);
    console.log('Done.')

    console.log('> User is valid ::', user.check());

    await store.save(user);

    const stored = await store.get(user.id);
    console.log('User is stored ::', stored);
    console.log(`User properties for '${stored.id}' ::`, stored.properties);
}
