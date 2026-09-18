import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectTabButton } from '../ui/ProjectTabButton';
import {
  Layers,
  Search,
  CheckCircle,
  TrendingUp,
  ExternalLink,
  Check,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeProjectTab, setActiveProjectTab] = useState<'erp' | 'social'>('erp');
  const [erpActiveView, setErpActiveView] = useState<'dashboard' | 'inventario' | 'ventas'>('dashboard');
  const [inventorySearch, setInventorySearch] = useState('');

  const sampleProducts = [
    { id: 'PRD-01', name: 'Software Licencia Estándar', sku: 'DVS-LIC-01', stock: 45, price: '$450.000', status: 'En Stock' },
    { id: 'PRD-02', name: 'Módulo Facturación Electrónica', sku: 'DVS-FAC-02', stock: 12, price: '$280.000', status: 'Stock Bajo' },
    { id: 'PRD-03', name: 'Pack Crecimiento Redes 30 Días', sku: 'DVS-MED-03', stock: 8, price: '$620.000', status: 'Alta Demanda' },
    { id: 'PRD-04', name: 'Punto de Venta POS Hardware', sku: 'DVS-POS-04', stock: 24, price: '$1.150.000', status: 'En Stock' },
  ];

  const filteredProducts = sampleProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  return (
    <section id="proyectos" className="py-24 bg-slate-900/60 border-y border-slate-800/80 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chip="Casos de Éxito & Proyectos Realizados"
          chipClassName="bg-cyan-950/60 border-cyan-500/20 text-cyan-400"
          title="Tecnología probada en el mundo real"
          subtitle="No somos solo promesas teóricas: ya hemos construido plataformas que hoy están ayudando a empresas a organizar sus operaciones y multiplicar su impacto digital."
        />

        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 inline-flex">
            <ProjectTabButton
              active={activeProjectTab === 'erp'}
              icon={<Layers className="w-4 h-4" />}
              label="Sistema de Gestión Empresarial (ERP)"
              onClick={() => setActiveProjectTab('erp')}
            />
            <ProjectTabButton
              active={activeProjectTab === 'social'}
              icon={<TrendingUp className="w-4 h-4" />}
              label="Estrategia de Redes & Alcance Digital"
              onClick={() => setActiveProjectTab('social')}
            />
          </div>
        </div>

        {activeProjectTab === 'erp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Desarrollado y 100% Funcional</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Sistema de Gestión Empresarial Del Valle
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Diseñado desde cero para resolver el caos administrativo que experimentan negocios en
                crecimiento. Centraliza en una interfaz amigable el control de existencias, punto de venta,
                historial de clientes y analítica de rentabilidad.
              </p>

              <div className="space-y-3">
                {PROJECTS_DATA[0].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                {PROJECTS_DATA[0].metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                    <div className="text-lg font-extrabold text-sky-400">{metric.value}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Solicitar demostración guiada del software</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl overflow-hidden">
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                      app.delvallesw.com/gestion
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setErpActiveView('dashboard')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        erpActiveView === 'dashboard' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => setErpActiveView('inventario')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        erpActiveView === 'inventario' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Inventario
                    </button>
                    <button
                      onClick={() => setErpActiveView('ventas')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        erpActiveView === 'ventas' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Ventas POS
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 min-h-[360px] bg-slate-950/90 font-sans">
                  {erpActiveView === 'dashboard' && (
                    <div className="space-y-5 transition-opacity duration-200">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[11px] text-slate-400">Ventas Hoy</span>
                          <p className="text-base sm:text-lg font-bold text-white mt-1">$ 3.420.000</p>
                          <span className="text-[10px] text-emerald-400 font-semibold">+14.2% vs ayer</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[11px] text-slate-400">Órdenes Activas</span>
                          <p className="text-base sm:text-lg font-bold text-sky-400 mt-1">28 pedidos</p>
                          <span className="text-[10px] text-slate-400">4 en preparación</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[11px] text-slate-400">Stock Crítico</span>
                          <p className="text-base sm:text-lg font-bold text-amber-400 mt-1">2 alertas</p>
                          <span className="text-[10px] text-amber-400/80 font-semibold">Reponer pronto</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-white">Rendimiento Semanal de Ventas</span>
                          <span className="text-[11px] text-sky-400 font-medium">Actualizado en vivo</span>
                        </div>
                        <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2">
                          {[
                            { day: 'Lun', height: '40%', val: '$1.8M' },
                            { day: 'Mar', height: '65%', val: '$2.5M' },
                            { day: 'Mie', height: '55%', val: '$2.1M' },
                            { day: 'Jue', height: '80%', val: '$3.2M' },
                            { day: 'Vie', height: '95%', val: '$4.1M' },
                            { day: 'Sab', height: '70%', val: '$2.9M' },
                            { day: 'Dom', height: '30%', val: '$1.1M' },
                          ].map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                              <div
                                style={{ height: item.height }}
                                className="w-full bg-gradient-to-t from-sky-600 to-cyan-400 rounded-t-md opacity-85 hover:opacity-100 transition-opacity"
                                title={`${item.day}: ${item.val}`}
                              />
                              <span className="text-[10px] text-slate-400">{item.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {erpActiveView === 'inventario' && (
                    <div className="space-y-4 transition-opacity duration-200">
                      <div className="flex items-center justify-between gap-3">
                        <div className="relative flex-1">
                          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="Buscar producto o código SKU..."
                            value={inventorySearch}
                            onChange={(e) => setInventorySearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {filteredProducts.length} productos
                        </span>
                      </div>

                      <div className="divide-y divide-slate-800/80 rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
                        {filteredProducts.map((p) => (
                          <div key={p.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                            <div>
                              <p className="font-semibold text-white">{p.name}</p>
                              <span className="text-[10px] text-slate-400">{p.sku}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sky-400 font-semibold">{p.price}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  p.status === 'Stock Bajo'
                                    ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                    : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                }`}
                              >
                                {p.status} ({p.stock})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {erpActiveView === 'ventas' && (
                    <div className="space-y-4 transition-opacity duration-200">
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">Nueva Venta Directa</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Factura #00842</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-400">Cliente</span>
                            <p className="font-medium text-slate-200">Cliente Mostrador / Empresa</p>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-400">Método de Pago</span>
                            <p className="font-medium text-slate-200">Transferencia / Efectivo</p>
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-300">Total a Facturar:</span>
                          <span className="text-sm font-extrabold text-sky-400 font-mono">$ 1.430.000 COP</span>
                        </div>

                        <button className="w-full py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                          <Check className="w-3.5 h-3.5" />
                          <span>Registrar Venta & Emitir Comprobante</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeProjectTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-300">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/70 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Estrategia Integral de Alcance</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Crecimiento de Redes & Visibilidad Digital
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Ayudamos a marcas y profesionales a transformar sus perfiles sociales en un canal continuo de
                atracción de clientes potenciales. Creación de contenido relevante, identidad visual coherente y
                campañas que dirigen directo a tu WhatsApp.
              </p>

              <div className="space-y-3">
                {PROJECTS_DATA[1].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                {PROJECTS_DATA[1].metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                    <div className="text-lg font-extrabold text-cyan-400">{metric.value}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Solicitar plan de redes para tu empresa</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-950 border border-slate-700/80 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
                      DVS
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Estrategia Multicanal Del Valle</h4>
                      <p className="text-xs text-slate-400">Instagram, Facebook, LinkedIn & WhatsApp</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                    Crecimiento Activo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-sky-400 mb-1">1. Contenido de Valor</div>
                    <p className="text-xs text-slate-300">
                      Publicaciones educativas y demostraciones que despiertan el interés genuino de tu audiencia.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-cyan-400 mb-1">2. Alcance & Pauta</div>
                    <p className="text-xs text-slate-300">
                      Campañas segmentadas geográficamente para captar clientes en tu zona de influencia.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-emerald-400 mb-1">3. Cierre en WhatsApp</div>
                    <p className="text-xs text-slate-300">
                      Respuestas rápidas y enlaces directos para no perder prospectos interesados.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Embudo de Conversión Digital:</span>
                    <span className="text-emerald-400 font-semibold">+240% Visibilidad Total</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-sky-500 h-full w-[45%]" title="Impresiones y Alcance"></div>
                    <div className="bg-cyan-400 h-full w-[35%]" title="Interacciones"></div>
                    <div className="bg-emerald-400 h-full w-[20%]" title="Leads y Cierres"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                    <span>Alcance (45%)</span>
                    <span>Interacción (35%)</span>
                    <span className="text-emerald-300 font-semibold">Leads a WhatsApp (20%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
