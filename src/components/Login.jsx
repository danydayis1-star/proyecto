import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Mail, Lock, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email)
        .eq('password', formData.password)
        .single();

      if (error || !data) {
        alert('Credenciales incorrectas');
        setLoading(false);
        return;
      }

      if (data.role !== 'admin') {
        alert('No tienes permisos de administrador');
        setLoading(false);
        return;
      }

      localStorage.setItem('admin_user', JSON.stringify(data));
      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-2xl">
            <Scale className="w-12 h-12 text-slate-900" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">Panel Administrativo</h1>
        <p className="text-slate-400 text-center mb-8">Despacho Justicia Social</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="admin@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              Contraseña
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-4 rounded-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Iniciando sesión...' : (
              <>
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
          >
            Volver al sitio web
          </button>
        </div>

        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-xs text-amber-400 text-center">
            Demo: admin@admin.com / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
