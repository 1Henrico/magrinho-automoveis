import { useEffect, useState } from 'react';
import { loadVehicles, saveVehicles, Vehicle } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const emptyVehicle = (): Omit<Vehicle, 'id'> => ({
  name: '',
  price: '',
  year: '',
  km: '',
  fuel: '',
  location: '',
  images: [],
  description: '',
  featured: false,
});

const Admin = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<ReturnType<typeof emptyVehicle>>(emptyVehicle());

  useEffect(() => {
    setVehicles(loadVehicles());
  }, []);

  useEffect(() => {
    saveVehicles(vehicles);
  }, [vehicles]);

  function startCreate() {
    setEditing(null);
    setForm(emptyVehicle());
  }

  function startEdit(v: Vehicle) {
    setEditing(v.id);
    const { id, ...rest } = v as any;
    setForm({ ...rest, images: rest.images || [] });
  }

  function remove(id: number) {
    setVehicles((s) => s.filter((v) => v.id !== id));
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (editing == null) {
      const id = vehicles.length ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1;
      setVehicles((s) => [...s, { id, ...form } as Vehicle]);
    } else {
      setVehicles((s) => s.map((v) => (v.id === editing ? { ...v, ...form } : v)));
    }
    setEditing(null);
    setForm(emptyVehicle());
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Painel Admin — Veículos</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Lista de Veículos</h2>
              <Button onClick={startCreate}>Adicionar Veículo</Button>
            </div>

            <div className="space-y-4">
              {vehicles.map((v) => (
                <div key={v.id} className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-sm text-muted-foreground">{v.price} • {v.year} • {v.km}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => startEdit(v)}>Editar</Button>
                    <Button variant="destructive" onClick={() => remove(v.id)}>Remover</Button>
                  </div>
                </div>
              ))}
              {vehicles.length === 0 && <div className="text-sm text-muted-foreground">Nenhum veículo cadastrado.</div>}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{editing ? 'Editar Veículo' : 'Novo Veículo'}</h2>
            <form onSubmit={submit} className="space-y-3">
              <div>
                <Label>Nome</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Preço</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label>Ano</Label>
                <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              </div>
              <div>
                <Label>KM</Label>
                <Input value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value })} />
              </div>
              <div>
                <Label>Combustível</Label>
                <Input value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} />
              </div>
              <div>
                <Label>Localização</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <Label>Imagens (URL ou upload múltiplo)</Label>
                <Input value={(form.images && form.images[0]) || ''} onChange={(e) => setForm({ ...form, images: [e.target.value] })} />
                <input type="file" accept="image/*" multiple onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;
                  const readers = await Promise.all(
                    files.map((file) => new Promise<string | null>((resolve) => {
                      const r = new FileReader();
                      r.onload = () => resolve(r.result as string);
                      r.onerror = () => resolve(null);
                      r.readAsDataURL(file);
                    })),
                  );
                  const images = readers.filter(Boolean) as string[];
                  setForm((f) => ({ ...f, images: [...(f.images || []), ...images] }));
                }} />
                <div className="mt-2 flex flex-wrap gap-2">
                  {(form.images || []).map((img, i) => (
                    <div key={i} className="w-24 h-16 overflow-hidden rounded border">
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Descrição</Label>
                <textarea className="w-full p-3 rounded border border-luxury-red bg-black text-white" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Salvar</Button>
                <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm(emptyVehicle()); }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
