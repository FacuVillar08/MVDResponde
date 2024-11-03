"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Filter, ChevronUp, ChevronDown, MousePointer, MousePointerClick } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MONTEVIDEO_CENTER = [-34.9011, -56.1645];

interface Incident {
  id: number;
  type: string;
  description: string;
  location: [number, number];
  timestamp: Date;
}

const MOCK_INCIDENTS: Incident[] = [
  {
    id: 1,
    type: 'Lugar Sucio',
    description: 'Acumulación de basura en la esquina',
    location: [-34.9059, -56.1913],
    timestamp: new Date('2024-03-20T10:00:00'),
  },
  {
    id: 2,
    type: 'Ruidos Altos',
    description: 'Obras de construcción fuera de horario',
    location: [-34.9001, -56.1632],
    timestamp: new Date('2024-03-20T11:30:00'),
  },
  {
    id: 3,
    type: 'Manifestaciones',
    description: 'Corte de calle por manifestación',
    location: [-34.8952, -56.1768],
    timestamp: new Date('2024-03-20T09:15:00'),
  },
];

function MapController({ scrollEnabled }: { scrollEnabled: boolean }) {
  const map = useMap();
  
  useEffect(() => {
    if (scrollEnabled) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
  }, [map, scrollEnabled]);
  
  return null;
}

export function IncidentMap() {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isMapInteractionEnabled, setIsMapInteractionEnabled] = useState(false);

  const filteredIncidents = selectedType
    ? incidents.filter((incident) => incident.type === selectedType)
    : incidents;

  const incidentTypes = Array.from(new Set(incidents.map((i) => i.type)));

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filtrar por tipo</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
        >
          {isFilterExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isFilterExpanded && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              Todos
            </Button>
            {incidentTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {filteredIncidents.length} incidencias activas
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full h-full relative">
      {/* Desktop Filters */}
      <div className="absolute left-4 right-4 top-4 hidden md:block md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-[40]">
        <Card className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <FilterContent />
        </Card>
      </div>

      {/* Map Interaction Toggle */}
      <div className="absolute bottom-4 left-4 z-[40]">
        <Card className="p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant={isMapInteractionEnabled ? "default" : "outline"}
            size="icon"
            onClick={() => setIsMapInteractionEnabled(!isMapInteractionEnabled)}
            className="h-10 w-10"
            title={isMapInteractionEnabled ? "Desactivar zoom del mapa" : "Activar zoom del mapa"}
          >
            {isMapInteractionEnabled ? (
              <MousePointerClick className="h-5 w-5" />
            ) : (
              <MousePointer className="h-5 w-5" />
            )}
          </Button>
        </Card>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden absolute bottom-4 right-4 z-[40]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
              <Filter className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[40vh]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <MapContainer
        center={MONTEVIDEO_CENTER}
        zoom={13}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <MapController scrollEnabled={isMapInteractionEnabled} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredIncidents.map((incident) => (
          <Marker key={incident.id} position={incident.location}>
            <Popup>
              <div className="p-2">
                <Badge className="mb-2 bg-primary hover:bg-primary/90">{incident.type}</Badge>
                <p className="text-sm mb-2">{incident.description}</p>
                <p className="text-xs text-muted-foreground">
                  Hace {formatDistanceToNow(incident.timestamp, { locale: es })}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}