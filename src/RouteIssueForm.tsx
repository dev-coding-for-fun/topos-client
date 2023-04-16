import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

interface Crag {
  crag_name: string;
  crag_id: string;
}

interface Sector {
  sector_name: string;
  sector_id: string;
  crag_id: string;
}

interface Route {
  route_name: string;
  route_id: string;
  sector_id: string;
}

interface Issue {
  route_id: string;
  sector_id: string;
  crag_id: string;
  description: string;
}

const RouteIssueForm: React.FC = () => {
  const [crags, setCrags] = useState<Crag[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedCrag, setSelectedCrag] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchCrags = async () => {
      const cragsCollection = await getDocs(collection(db, 'crags'));
      const cragsData = cragsCollection.docs.map((doc) => doc.data()) as Crag[];
      setCrags(cragsData);
    };
    fetchCrags();
  }, []);

  useEffect(() => {
    const fetchSectors = async () => {
      if (selectedCrag) {
        const sectorsCollection = await getDocs(query(collection(db, 'sectors'), where('crag_id', '==', selectedCrag)));
        const sectorsData = sectorsCollection.docs.map((doc) => doc.data()) as Sector[];
        setSectors(sectorsData);
      }
    };
    fetchSectors();
  }, [selectedCrag]);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (selectedSector) {
        const routesCollection = await getDocs(query(collection(db, 'routes'), where('sector_id', '==', selectedSector)));
        const routesData = routesCollection.docs.map((doc) => doc.data()) as Route[];
        setRoutes(routesData);
      }
    };
    fetchRoutes();
  }, [selectedSector]);

  const handleCragChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrag(event.target.value);
    setSelectedSector('');
    setSelectedRoute('');
  };

  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSector(event.target.value);
    setSelectedRoute('');
  };

  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoute(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issue: Issue = {
      route_id: selectedRoute,
      sector_id: selectedSector,
      crag_id: selectedCrag,
      description: description,
    };
    await addDoc(collection(db, 'issues'), issue);
    setSelectedCrag('');
    setSelectedSector('');
    setSelectedRoute('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Crag:
        <select value={selectedCrag} onChange={handleCragChange}>
          <option value="">Select a crag</option>
          {crags.map((crag) => (
            <option key={crag.crag_id} value={crag.crag_id}>
              {crag.crag_name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Sector:
        <select value={selectedSector} onChange={handleSectorChange} disabled={!selectedCrag}>
          <option value="">Select a sector</option>
          {sectors.map((sector) => (
            <option key={sector.sector_id} value={sector.sector_id}>
              {sector.sector_name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Route:
        <select value={selectedRoute} onChange={handleRouteChange} disabled={!selectedSector}>
          <option value="">Select a route</option>
          {routes.map((route) => (
            <option key={route.route_id} value={route.route_id}>
              {route.route_name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Problem Description:
        <br />
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <button type="submit" disabled={!selectedRoute}>
        Submit Issue
      </button>
    </form>
  );
};

export default RouteIssueForm;