import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const writeRoutes = functions.https.onRequest(async (request, response) => {
  try {
    const sectorsUrl = "https://tabvar-topos.web.app/sectors.json";
    const sectorRes = await fetch(sectorsUrl);
    const sectorJson = await sectorRes.json();

    const db = admin.firestore();
    let batch = db.batch();
    const sectorMap = new Map<number, boolean>();

    for (const sectorObj of sectorJson.data) {
      const sector = sectorObj.TSECTOR;
      const { sector_name, latitude, longitude, sector_id, crag_id } = sector;
      /* only proceed if sector is within the bounding box of TABVAR's area
      (loosely defined as saskatchewan crossing in the NW, to the southern extent of Kananaskis and just east of Calgary) */
      if (sector.latitude < 51.953 && sector.latitude > 50.35 &&
        sector.longitude < -113.76 && sector.longitude > -116.74) {
        sectorMap.set(sector.sector_id, true);
        // write sector data to Firestore
        // eslint-disable-next-line camelcase
        const sectorDocRef = db.collection("sectors").doc(`${sector_id}`);
        // eslint-disable-next-line camelcase
        batch.set(sectorDocRef, { sector_name, latitude, longitude, sector_id, crag_id });

        // write crag data to Firestore
        const crag = sectorObj.TCRAG;
        const { crag_name } = crag;
        // eslint-disable-next-line camelcase
        const cragDocRef = db.collection("crags").doc(`${crag_id}`);
        // eslint-disable-next-line camelcase
        batch.set(cragDocRef, { crag_name, crag_id }, { merge: true });
      }
    }
    await batch.commit();
    batch = db.batch();

    const routesUrl = "https://tabvar-topos.web.app/routes.json";
    const routesRes = await fetch(routesUrl);
    const text = await routesRes.text();
    // eslint-disable-next-line no-control-regex
    const cleanedText = text.replace(/[\u0000-\u001F]/g, "");
    const routesJson = JSON.parse(cleanedText);
    let batchCount = 0;

    for (const routeObj of routesJson.data) {
      const route = routeObj.TROUTE;
      const { route_name, route_id, sort_order, sector_id } = route;
      const grade = routeObj.TTECH_GRADE.tech_grade;
      // only proceed if route is in a known in-bounds sector
      if (sectorMap.has(route.sector_id)) {
        // write route data to Firestore
        // eslint-disable-next-line camelcase
        const sectorDocRef = db.collection("routes").doc(`${route_id}`);
        // eslint-disable-next-line camelcase
        batch.set(sectorDocRef, { route_name, route_id, sort_order, sector_id, grade });
        batchCount++;
      }
      if (batchCount == 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
    }
    await batch.commit();

    response.status(200).send("Data successfully written to Firestore");
  } catch (error) {
    functions.logger.error(error);
    response.status(500).send("An error occurred while processing the data:" + error);
  }
});

export const helloWorld2 = functions.https.onRequest((req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});
