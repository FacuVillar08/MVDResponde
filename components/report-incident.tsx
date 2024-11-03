"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

export function ReportIncident() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Incidencia reportada correctamente');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Reportar Incidencia</span>
          <span className="sm:hidden">Reportar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reportar Nueva Incidencia</DialogTitle>
          <DialogDescription>
            Ayuda a mantener informada a la comunidad sobre incidencias en la ciudad.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Incidencia</label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lugar-sucio">Lugar Sucio</SelectItem>
                <SelectItem value="ruidos">Ruidos Altos</SelectItem>
                <SelectItem value="manifestacion">Manifestaciones</SelectItem>
                <SelectItem value="aire">Aire Contaminado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Ubicación</label>
            <Input placeholder="Buscar ubicación..." />
            <span className="text-xs text-muted-foreground">
              O haz clic en el mapa para seleccionar la ubicación
            </span>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea
              placeholder="Describe la incidencia..."
              className="resize-none"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Reportar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}