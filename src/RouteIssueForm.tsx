import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { Button, Stack, Box, Select, SelectChangeEvent, TextField, InputLabel, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles'


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
        const sectorsRef = collection(db, "sectors");
        const q = query(sectorsRef, where("crag_id", "==", parseInt(selectedCrag)));
        const sectorsSnapshot = await getDocs(q);
        const sectorsData = sectorsSnapshot.docs.map((doc) => doc.data()) as Sector[];
        setSectors(sectorsData);
      }
    };
    fetchSectors();
  }, [selectedCrag]);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (selectedSector) {
        const routesCollection = await getDocs(query(collection(db, 'routes'), where('sector_id', '==', parseInt(selectedSector))));
        const routesData = routesCollection.docs.map((doc) => doc.data()) as Route[];
        setRoutes(routesData);
      }
    };
    fetchRoutes();
  }, [selectedSector]);

  const handleCragChange = (event: SelectChangeEvent<typeof selectedCrag>) => {
    setSelectedCrag(event.target.value);
    setSelectedSector('');
    setSelectedRoute('');
  };

  const handleSectorChange = (event: SelectChangeEvent<typeof selectedSector>) => {
    setSelectedSector(event.target.value);
    setSelectedRoute('');
  };

  const handleRouteChange = (event: SelectChangeEvent<typeof selectedRoute>) => {
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
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Box sx={{ m: 2, width: '100%' }}>
          <Stack spacing={0}>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 360 }}>
              <InputLabel id="crag-label">Crag</InputLabel>
              <Select labelId="crag-label" label="Crag" value={selectedCrag} onChange={handleCragChange}>
                {crags.map((crag) => (
                  <MenuItem key={crag.crag_id} value={crag.crag_id}>
                    {crag.crag_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 360 }}>
              <InputLabel id="sector-label">Sector</InputLabel>
              <Select labelId="sector-label" value={selectedSector} onChange={handleSectorChange} disabled={!selectedCrag}>
                {sectors.map((sector) => (
                  <MenuItem key={sector.sector_id} value={sector.sector_id}>
                    {sector.sector_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 360 }}>
              <InputLabel id="route-label">Route</InputLabel>
              <Select labelId="route-label" value={selectedRoute} onChange={handleRouteChange} disabled={!selectedSector}>
                {routes.map((route) => (
                  <MenuItem key={route.route_id} value={route.route_id}>
                    {route.route_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200, maxWidth: '80%' }}>
              <TextField label="Issue Description" placeholder="3rd bolt is loose" multiline rows={4} maxRows={10} value={description} onChange={handleDescriptionChange} />
            </FormControl>
            <FormControl sx={{ m:1, maxWidth: 200 }}>
              <Button variant="contained" type="submit" disabled={!selectedRoute}>
                Submit Issue
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default RouteIssueForm;