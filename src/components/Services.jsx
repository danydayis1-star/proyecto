import { motion } from 'framer-motion';
import { Briefcase, Users, Home, FileText, Gavel, Scale } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: 'Derecho Laboral',
      description: 'Defensa de trabajadores, despidos injustificados, demandas laborales y asesoría en contratos.'
    },
    {
      icon: <Gavel className="w-12 h-12" />,
      title: 'Derecho Penal',
      description: 'Defensa penal integral, representación en juicios y protección de garantías individuales.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Derecho Familiar',
      description: 'Divorcios, pensiones alimenticias, custodia de menores y asuntos sucesorios.'
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: 'Derecho Civil',
      description: 'Contratos, arrendamientos, compraventa de inmuebles y resolución de conflictos.'
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Derecho Mercantil',
      description: 'Constitución de empresas, contratos comerciales y asesoría corporativa.'
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: 'Amparos',
      description: 'Tramitación de juicios de amparo para proteger tus derechos constitucionales.'
    }
  ];

  return (
    <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros <span className="text-amber-400">Servicios</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ofrecemos asesoría legal integral en diversas áreas del derecho
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <div className="text-amber-400 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
