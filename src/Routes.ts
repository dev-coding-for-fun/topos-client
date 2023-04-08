import { db } from './config/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export class Route {
  public id: number = 0;
  public name: string = "";
  public grade: string = "";
  public description: string = "";
  constructor(init?:Partial<Route>) {
    Object.assign(this, init);
  }
  toString() { return this.name + " (" + this.grade + ")"; }

}

export class Sector {
  public id: number = 0;
  public name: string = "";
  public routes: Route[] = [];
  public description: string = "";
  constructor(init?:Partial<Sector>) {
    Object.assign(this, init);
  }
  toString() { return this.name; }
}

export class Crag {
  public id: number = 0;
  public name: string = "";
  public sectors: Sector[] = [];
  public description: string = "";
  constructor(init?:Partial<Crag>) {
    Object.assign(this, init);
  }
  toString() { return this.name; }
}

export class Location {
  public id: number = 0;
  public name: string = "";
  public crags: Crag[] = [];
  constructor(init?:Partial<Location>) {
    Object.assign(this, init);
  }
  toString() { return this.name; }
}

export const routeConverter = {
  toFirestore: (route: Route) => {
    return {
      id: route.id,
      name: route.name,
      grade: route.grade,
      description: route.description
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Route({ id: data.id, name: data.name, grade: data.grade, description: data.description })
  }
}
/*
export const sectorConverter = {
  toFirestore: (sector: Sector) => {
    return {
      id: sector.id,
      name: sector.name,
      grade: sector.grade,
      description: sector.description
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Sector(data.id, data.name, null, data.description)
  }
}

export const cragConverter = {
  toFirestore: (route: Route) => {
    return {
      id: route.id,
      name: route.name,
      grade: route.grade,
      description: route.description
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Route(data.id, data.name, data.grade, data.description)
  }
}
export const locationConverter = {
  toFirestore: (route: Route) => {
    return {
      id: route.id,
      name: route.name,
      grade: route.grade,
      description: route.description
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Route(data.id, data.name, data.grade, data.description)
  }
}
*/

export async function getRoutesByCragAndSector(cragName: string, sectorName: string): Promise<Route[]> {
  const q = query(
    collection(db, 'routes'),
    where('cragName', '==', cragName),
    where('sectorName', '==', sectorName),
  );
  const querySnapshot = await getDocs(q);
  const routes: Route[] = [];
  querySnapshot.forEach((doc) => {
    routes.push(doc.data() as Route);
  });
  return routes;
}
export async function addRoute(cragName: string, sectorName: string, route: Route): Promise<void> {
  await addDoc(collection(db, 'routes'), {
    cragName,
    sectorName,
    ...route,
  });
}