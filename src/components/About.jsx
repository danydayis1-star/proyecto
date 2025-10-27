import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: <Award className="w-8 h-8" />, value: '20+', label: 'Años de Experiencia' },
    { icon: <Users className="w-8 h-8" />, value: '500+', label: 'Casos Exitosos' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '95%', label: 'Tasa de Éxito' },
    { icon: <Heart className="w-8 h-8" />, value: '100%', label: 'Clientes Satisfechos' }
  ];

  return (
    <section id="nosotros" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sobre <span className="text-amber-400">Nosotros</span>
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              Somos un despacho comprometido con la justicia social y la defensa de los derechos de nuestros clientes. Con más de 20 años de experiencia, hemos consolidado nuestra reputación como uno de los despachos más confiables en el país.
            </p>
            <p className="text-lg text-slate-300 mb-6">
              Nuestro equipo de abogados especializados trabaja incansablemente para garantizar que cada cliente reciba la mejor representación legal posible.
            </p>
            <p className="text-lg text-slate-300">
              Creemos en la justicia accesible para todos, por eso ofrecemos opciones de pago flexibles y primera consulta gratuita.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-amber-500/20 to-slate-800/50 backdrop-blur-sm border border-amber-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-amber-400 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
