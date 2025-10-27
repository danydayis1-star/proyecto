import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: 'Lic. Carlos Ramírez',
      position: 'Director General',
      specialization: 'Derecho Penal',
      email: 'ndramirez93@outlook.com',
      phone: '55 5555 5555'
    },
    {
      name: 'Lic. Ana María López',
      position: 'Socia Principal',
      specialization: 'Derecho Laboral',
      email: 'ndramirez93@outlook.com',
      phone: '55 5555 5556'
    },
    {
      name: 'Lic. Roberto González',
      position: 'Abogado Senior',
      specialization: 'Derecho Civil',
      email: 'ndramirez93@outlook.com',
      phone: '55 5555 5557'
    }
  ];

  return (
    <section id="equipo" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro <span className="text-amber-400">Equipo</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Profesionales altamente capacitados comprometidos con tu defensa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-slate-900">
                {member.name.split(' ')[1].charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">{member.name}</h3>
              <p className="text-amber-400 text-center mb-2">{member.position}</p>
              <p className="text-slate-300 text-center mb-6">{member.specialization}</p>
              <div className="space-y-3">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{member.email}</span>
                </a>
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{member.phone}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
