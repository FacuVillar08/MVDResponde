"use client";

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Report {
  id: number;
  username: string;
  type: string;
  location: string;
  description: string;
  timestamp: Date;
}

const MOCK_REPORTS: Report[] = [
  {
    id: 1,
    username: "María G.",
    type: "Lugar Sucio",
    location: "Av. 18 de Julio y Ejido",
    description: "Contenedores desbordados desde hace días. Necesita atención urgente.",
    timestamp: new Date('2024-03-20T10:00:00'),
  },
  {
    id: 2,
    username: "Carlos R.",
    type: "Ruidos Altos",
    location: "Pocitos, calle Gabriel Pereira",
    description: "Obras fuera de horario permitido generando molestias a vecinos.",
    timestamp: new Date('2024-03-20T11:30:00'),
  },
  // Add more mock reports...
];

export function RecentReports() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Últimos Reportes</h2>
          <Link href="/reportes">
            <Button variant="outline">Ver todos los reportes</Button>
          </Link>
        </div>

        <div className="space-y-6">
          {MOCK_REPORTS.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary p-2 rounded-lg shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold truncate">
                        {report.username}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground truncate">
                        {formatDistanceToNow(report.timestamp, { 
                          locale: es,
                          addSuffix: true 
                        })}
                      </span>
                    </div>
                    <Badge className="bg-primary hover:bg-primary/90 shrink-0">
                      {report.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {report.location}
                  </p>
                  
                  <p className="text-sm">
                    {report.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/reportes">
            <Button>Ver más reportes</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}