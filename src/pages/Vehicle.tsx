import { useParams, Link } from 'react-router-dom';
import { loadVehicles } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Calendar, Gauge, Fuel, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const VehiclePage = () => {
  const { id } = useParams();
  const vehicles = loadVehicles();
  const vehicle = vehicles.find((v) => String(v.id) === String(id));

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Veículo não encontrado</h2>
          <Link to="/" className="text-luxury-red underline">Voltar ao catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm text-muted-foreground">← Voltar</Link>
          <span className="text-sm text-muted-foreground">ID #{vehicle.id}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Image */}
          <div>
            <div className="w-full bg-muted rounded-lg overflow-hidden shadow relative">
              {vehicle.images && vehicle.images.length > 0 ? (
                <Carousel>
                  <CarouselContent>
                    {vehicle.images.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <img src={img} alt={`${vehicle.name} ${idx + 1}`} className="w-full h-80 md:h-[520px] object-cover" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              ) : (
                <div className="w-full h-80 md:h-[520px] bg-gray-200 flex items-center justify-center">Sem imagem</div>
              )}
            </div>

            {/* thumbnails */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {vehicle.images.map((img, i) => (
                  <img key={i} src={img} className="w-20 h-14 object-cover rounded border" />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{vehicle.name}</h1>
            <div className="mb-4">
              <div className="text-2xl md:text-3xl font-extrabold text-luxury-red">{vehicle.price}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{vehicle.year}</div>
              <div className="flex items-center gap-2"><Gauge className="w-4 h-4" />{vehicle.km}</div>
              <div className="flex items-center gap-2"><Fuel className="w-4 h-4" />{vehicle.fuel}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{vehicle.location}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="https://l.instagram.com/?u=http%3A%2F%2Fwa.me%2F5574999677420%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAacXFdQgMc1BIxRObETVd7fbq5q_oWd2DM7HzBTaZhFIcMirH4BHILxOmgyIfw_aem_kTyfF29xk3-f84egSC4Xyg&e=AT0Dy5fknXO0iMt2T4oZr86FkPg4TM7nvVowwYpv2ljqVgqxT9K4ceozwCgh8goET50z7pC8yUQuElLr2r7YCPJ89gYU5x9dm7TNCxowZg" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="w-full sm:w-auto">Entrar em Contato</Button>
              </a>
              <a href="https://l.instagram.com/?u=http%3A%2F%2Fwa.me%2F5574999677420%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAacXFdQgMc1BIxRObETVd7fbq5q_oWd2DM7HzBTaZhFIcMirH4BHILxOmgyIfw_aem_kTyfF29xk3-f84egSC4Xyg&e=AT0Dy5fknXO0iMt2T4oZr86FkPg4TM7nvVowwYpv2ljqVgqxT9K4ceozwCgh8goET50z7pC8yUQuElLr2r7YCPJ89gYU5x9dm7TNCxowZg" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button variant="outline" className="w-full sm:w-auto">Agendar Test Drive</Button>
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Descrição</h3>
              <div className="p-4 rounded border border-border bg-card text-sm text-foreground" style={{ whiteSpace: 'pre-wrap' }}>
                {vehicle.description || 'Sem descrição fornecida.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePage;
