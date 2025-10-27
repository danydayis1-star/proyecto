import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, X, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    
    const subscription = supabase
      .channel('appointments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteAppointment = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta cita?')) return;
    
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
            <p className="text-slate-300">Gestión de Citas - Despacho Justicia Social</p>
          </div>

          {/* Filters */}
          <div className="border-b border-slate-200 px-8 py-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas ({appointments.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'pending'
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                }`}
              >
                Pendientes ({appointments.filter(a => a.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'confirmed'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                Confirmadas ({appointments.filter(a => a.status === 'confirmed').length})
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'cancelled'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                Canceladas ({appointments.filter(a => a.status === 'cancelled').length})
              </button>
            </div>
          </div>

          {/* Appointments List */}
          <div className="p-8">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No hay citas en esta categoría</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Status Badge */}
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>

                        {/* Client Info */}
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-slate-700">
                            <User className="w-5 h-5 text-slate-400" />
                            <span className="font-semibold">{appointment.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <span className="text-sm">{appointment.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-5 h-5 text-slate-400" />
                            <span className="text-sm">{appointment.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            <span className="text-sm font-medium">
                              {new Date(appointment.date).toLocaleDateString('es-MX', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-5 h-5 text-slate-400" />
                            <span className="text-sm font-medium">{appointment.time}</span>
                          </div>
                        </div>

                        {/* Message */}
                        {appointment.message && (
                          <div className="flex gap-2 mt-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <MessageSquare className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-600">{appointment.message}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2">
                        {appointment.status !== 'confirmed' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'confirmed')}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                          >
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Confirmar</span>
                          </button>
                        )}
                        {appointment.status !== 'cancelled' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'cancelled')}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                          >
                            <X className="w-4 h-4" />
                            <span className="text-sm">Cancelar</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                        >
                          <X className="w-4 h-4" />
                          <span className="text-sm">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}