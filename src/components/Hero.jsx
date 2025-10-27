import { motion } from 'framer-motion';
import { Shield, Phone, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Defendemos tus
              <span className="text-amber-400"> Derechos</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Más de 20 años de experiencia en defensa legal. Estamos comprometidos con la justicia social y la protección de tus derechos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
              >
                Agenda tu Consulta
              </a>
              <a
                href="tel:+525555555555"
                className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg font-bold hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Llámanos
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-amber-500/20 to-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8 shadow-2xl">
              <Shield className="w-24 h-24 text-amber-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">¿Por qué elegirnos?</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <span>Experiencia comprobada en casos exitosos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <span>Atención personalizada las 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <span>Primera consulta sin costo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <span>Honorarios accesibles y planes de pago</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
