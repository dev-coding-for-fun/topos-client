import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { Route, Sector, Crag } from './Routes';

function generateSampleData() {
    const routes: Route[] = [
        {
            id: 1,
            name: 'Monkey Face',
            grade: '5.12',
            description: 'A classic testpiece',
        },
        {
            id: 2,
            name: 'Olympia',
            grade: '5.13',
            description: 'A steep and pumpy tufa climb',
        },
        {
            id: 3,
            name: 'The Buttress',
            grade: '5.10b',
            description: 'A long and classic granite route',
        },
        {
            id: 4,
            name: 'Tallyho',
            grade: '5.10a',
            description: 'Good Fun',
        },
        {
            id: 5,
            name: 'Hard Stuff',
            grade: '5.15c',
            description: 'Really hard',
        },
        {
            id: 6,
            name: 'Easy Stuff',
            grade: '5.8',
            description: 'Really easy',
        },
        {
            id: 7,
            name: 'Magic',
            grade: '5.12c',
            description: 'magical climbing',
        },
        {
            id: 8,
            name: 'Pump city',
            grade: '5.11b',
            description: 'Really pumpy',
        },
    ];


    const sectors: Sector[] = [
        {
            id: 1,
            name: 'First Wall',
            description: 'the first wall',
            routes: [routes[0], routes[1]],
        },
        {
            id: 2,
            name: 'Second Wall',
            description: 'the second wall',
            routes: [routes[2], routes[3]],
        },
        {
            id: 3,
            name: 'North Wall',
            description: 'the North wall',
            routes: [routes[4], routes[5]],
        },
        {
            id: 4,
            name: 'East Wall',
            description: 'the East wall',
            routes: [routes[6], routes[7]],
        },
    ];


    const crags: Crag[] = [
        {
            id: 1,
            name: 'Stoneworks',
            description: 'One of the most famous climbing destinations in the world',
            sectors: [sectors[0], sectors[1]],
        },
        {
            id: 2,
            name: 'Heart Creek',
            description: 'An island paradise with endless limestone crags',
            sectors: [sectors[2], sectors[3]],
        },
    ];

    return { routes, sectors, crags }
}


/*
// Populate the Firestore database with sample data, but only if not already defined
async function populateDatabase() {

    // Generate sample data
    const sampleData = generateSampleData();




    // Add crags to Firestore
    const cragsPromise = Promise.all(
        sampleData.crags.map(async (crag) => {
            const cragDocRef = await addDoc(cragsRef, crag);
            console.log(`Added crag '${crag.name}' with ID: ${cragDocRef.id}`);

            // Add sectors to crag
            const sectorsPromise = Promise.all(
                crag.sectors.map(async (sector) => {
                    const sectorDocRef = await addDoc(collection(cragDocRef, "sectors"), sector);
                    console.log(`  Added sector '${sector.name}' with ID: ${sectorDocRef.id}`);

                    // Add routes to sector
                    const routesPromise = Promise.all(
                        sector.routes.map(async (route) => {
                            await addDoc(collection(sectorDocRef, "routes"), route);
                            console.log(`    Added route '${route.name}'`);
                        })
                    );

                    return routesPromise;
                })
            );

            return sectorsPromise;
        })
    );

    await cragsPromise;

    console.log("Firestore population complete!");
}
*/