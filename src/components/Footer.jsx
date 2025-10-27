import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-amber-500/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-slate-900" />
              </div>
              <span className="font-bold text-white">Despacho Justicia Social</span>
            </div>
            <p className="text-slate-400 text-sm">
              Defendiendo tus derechos con profesionalismo y compromiso desde hace más de 20 años.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Servicios</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Derecho Laboral</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Derecho Penal</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Derecho Familiar</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Derecho Civil</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Av. Juárez #123, CDMX</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href="tel:+525555555555" className="hover:text-amber-400 transition-colors">+52 55 5555 5555</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href="mailto:ndramirez93@outlook.com" className="hover:text-amber-400 transition-colors">ndramirez93@outlook.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-500/20 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Despacho Justicia Social. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
