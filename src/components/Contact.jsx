import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AppointmentCalendar from './AppointmentCalendar';

export default function Contact() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contáctanos <span className="text-amber-400">Hoy</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Estamos listos para escuchar tu caso y ofrecerte la mejor solución legal
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Dirección</p>
                    <p className="text-slate-300">Av. Juárez #123, Col. Centro, CDMX, México</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Teléfono</p>
                    <a href="tel:+525555555555" className="text-slate-300 hover:text-amber-400 transition-colors">
                      +52 55 5555 5555
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Email</p>
                    <a href="mailto:ndramirez93@outlook.com" className="text-slate-300 hover:text-amber-400 transition-colors">
                      ndramirez93@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Horario</p>
                    <p className="text-slate-300">Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                    <p className="text-slate-300">Sábados: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCalendar(true)}
                className="w-full mt-8 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar Cita
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h3>
              
              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6">
                  ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="55 5555 5555"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Asunto</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Consulta sobre..."
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Mensaje</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="5"
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    placeholder="Describe tu caso..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Enviando...' : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {showCalendar && (
        <AppointmentCalendar onClose={() => setShowCalendar(false)} />
      )}
    </section>
  );
}
