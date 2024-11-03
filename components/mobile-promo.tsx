"use client";

import { Phone, Bell, MapPin, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

export function MobilePromo() {
  return (
    <section className="py-16 px-4 bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Próximamente en tu móvil</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mantente al tanto de las incidencias en Montevideo desde cualquier lugar.
            Descarga nuestra aplicación móvil próximamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Notificaciones</h3>
            <p className="text-sm text-muted-foreground">
              Recibe alertas en tiempo real sobre incidencias cercanas
            </p>
          </Card>

          <Card className="p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Geolocalización</h3>
            <p className="text-sm text-muted-foreground">
              Encuentra incidencias cercanas a tu ubicación
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Reportes Verificados</h3>
            <p className="text-sm text-muted-foreground">
              Sistema de verificación comunitaria
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Modo Offline</h3>
            <p className="text-sm text-muted-foreground">
              Accede a la información incluso sin conexión
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}