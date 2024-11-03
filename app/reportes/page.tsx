"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ChevronLeft,
  Search,
  Calendar as CalendarIcon,
  ThumbsUp,
  MessageSquare,
  Share2,
  Filter,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Report {
  id: number;
  username: string;
  type: string;
  location: string;
  description: string;
  timestamp: Date;
  likes: number;
  comments: number;
  userImage: string;
}

const MOCK_REPORTS: Report[] = [
  {
    id: 1,
    username: "María G.",
    type: "Lugar Sucio",
    location: "Av. 18 de Julio y Ejido",
    description: "Contenedores desbordados desde hace días. Necesita atención urgente.",
    timestamp: new Date('2024-03-20T10:00:00'),
    likes: 24,
    comments: 8,
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    username: "Carlos R.",
    type: "Ruidos Altos",
    location: "Pocitos, calle Gabriel Pereira",
    description: "Obras fuera de horario permitido generando molestias a vecinos.",
    timestamp: new Date('2024-03-20T11:30:00'),
    likes: 15,
    comments: 4,
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    username: "Ana M.",
    type: "Manifestaciones",
    location: "Plaza Independencia",
    description: "Manifestación pacífica programada para esta tarde.",
    timestamp: new Date('2024-03-19T15:20:00'),
    likes: 42,
    comments: 12,
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export default function ReportsPage() {
  const [date, setDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredReports = MOCK_REPORTS
    .filter(report => {
      const matchesSearch = report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.username.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === "all" || report.type === selectedType;
      
      const matchesDate = !date || format(report.timestamp, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      
      return matchesSearch && matchesType && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === "recent") return b.timestamp.getTime() - a.timestamp.getTime();
      if (sortBy === "popular") return b.likes - a.likes;
      if (sortBy === "discussed") return b.comments - a.comments;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Reportes de la Comunidad</h1>
        </div>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por descripción, ubicación o usuario..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : "Filtrar por fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipo de reporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Lugar Sucio">Lugar Sucio</SelectItem>
                  <SelectItem value="Ruidos Altos">Ruidos Altos</SelectItem>
                  <SelectItem value="Manifestaciones">Manifestaciones</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más recientes</SelectItem>
                  <SelectItem value="popular">Más populares</SelectItem>
                  <SelectItem value="discussed">Más comentados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-card rounded-lg shadow-sm border p-6 space-y-4"
              >
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={report.userImage}
                    alt={report.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{report.username}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(report.timestamp, "PPp", { locale: es })}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                      {report.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {report.location}
                    </span>
                  </div>
                  <p className="text-foreground">{report.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{report.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{report.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}