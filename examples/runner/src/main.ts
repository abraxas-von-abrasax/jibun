import { GroupManager, initializeJibun, User } from '@jibun/core';

main().catch((error) => {
    console.error('Error while running test application:', error);
});

async function main() {
    await initializeJibun();

    GroupManager.setGlobalMandatoryProperties(['firstName', 'lastName']);

    await addGlobalUser();
    await addStudent();
}

async function addGlobalUser() {
    const user = new User();
    console.log('Created new user ::', user);

    console.log('> User in group ::', user.group);
    console.log('> Mandatory fields ::', user.mandatoryFields);
    console.log('> User is valid ::', user.check());

    console.log('Setting properties...');
    user.setProperty('firstName', 'Abraxas');
    user.setProperty('lastName', 'von Abrasax');
    user.setProperty('age', 365);
    console.log('Done.');

    console.log('> User is valid ::', user.check());

    await user.save();

    const stored = await User.get(user.id);
    console.log('User is stored ::', stored);
    console.log(`User properties for '${stored.id}' ::`, stored.properties);
}

async function addStudent() {
    const studentGroupID = 'students';

    const studentsGroup = await GroupManager.createGroup(studentGroupID, {
        mandatoryFields: ['studentID', 'enrollmentDate'],
    });

    const user = new User(studentsGroup);
    console.log('> Created new user ::', user);
    console.log('> User in group ::', user.group);
    console.log('> Mandatory fields ::', user.mandatoryFields);

    console.log('> User is valid before setting any properties ::', user.check());

    user.setProperty('firstName', 'Bob');
    user.setProperty('lastName', 'McGreen');
    user.setProperty('age', 21);

    console.log('> User is valid before setting student properties ::', user.check());

    user.setProperty('studentID', 1234);
    user.setProperty('enrollmentDate', new Date(2021, 5, 15).toISOString());

    console.log('> User is valid after setting student properties ::', user.check());

    await user.save();

    const stored = await User.get(user.id);
    console.log('User is stored ::', stored);

    if (stored) {
        console.log(`User properties for '${stored.id}' ::`, stored.properties);
    } else {
        console.log('User is not stored!');
    }
}
