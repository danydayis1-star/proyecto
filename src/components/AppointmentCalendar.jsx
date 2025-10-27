import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AppointmentCalendar({ onClose }) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_type: 'Consulta General',
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const services = [
    'Consulta General',
    'Derecho Laboral',
    'Derecho Penal',
    'Derecho Familiar',
    'Derecho Civil',
    'Derecho Mercantil',
    'Amparos'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agendar la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-8 h-8 text-amber-400" />
              Agendar Cita
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {success ? (
            <div className="text-center py-12">
              <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg mb-4">
                <h3 className="text-2xl font-bold mb-2">¡Cita Agendada!</h3>
                <p>Te contactaremos pronto para confirmar tu cita.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="55 5555 5555"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Tipo de Servicio
                  </label>
                  <select
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Hora
                  </label>
                  <select
                    required
                    value={formData.appointment_time}
                    onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="">Selecciona una hora</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 font-medium">Notas adicionales</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="4"
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Describe brevemente el motivo de tu consulta..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 disabled:opacity-50"
              >
                {loading ? 'Agendando...' : 'Confirmar Cita'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
