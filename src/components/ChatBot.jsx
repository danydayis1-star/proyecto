import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ChatBot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    { text: '¡Hola! Soy tu asistente virtual del Despacho Justicia Social. ¿En qué puedo ayudarte?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('hola') || msg.includes('buenos días') || msg.includes('buenas tardes')) {
      return '¡Hola! ¿En qué área legal necesitas asesoría? Ofrecemos servicios en Derecho Laboral, Penal, Familiar, Civil, Mercantil y Amparos.';
    }
    
    if (msg.includes('laboral') || msg.includes('trabajo') || msg.includes('despido')) {
      return 'Nuestro equipo especializado en Derecho Laboral puede ayudarte con despidos injustificados, demandas laborales y contratos. ¿Te gustaría agendar una consulta?';
    }
    
    if (msg.includes('penal') || msg.includes('delito') || msg.includes('defensa')) {
      return 'En materia penal, ofrecemos defensa integral en todo tipo de delitos. Te representamos en todas las etapas del proceso. ¿Necesitas asesoría urgente?';
    }
    
    if (msg.includes('familiar') || msg.includes('divorcio') || msg.includes('pensión')) {
      return 'Atendemos casos de Derecho Familiar: divorcios, pensiones alimenticias, custodia de menores y sucesiones. La primera consulta es gratuita.';
    }
    
    if (msg.includes('precio') || msg.includes('costo') || msg.includes('honorarios')) {
      return 'Nuestros honorarios son accesibles y ofrecemos planes de pago. La primera consulta es gratuita. ¿Te gustaría agendar una cita para evaluar tu caso?';
    }
    
    if (msg.includes('cita') || msg.includes('agendar') || msg.includes('consulta')) {
      return 'Puedes agendar tu cita directamente desde nuestro calendario en la sección de Contacto, o llamarnos al 55 5555 5555. ¿Necesitas ayuda con algo más?';
    }
    
    if (msg.includes('horario') || msg.includes('hora') || msg.includes('cuando')) {
      return 'Nuestro horario es: Lunes a Viernes de 9:00 AM a 7:00 PM, y Sábados de 9:00 AM a 2:00 PM. ¿Te gustaría agendar una cita?';
    }
    
    if (msg.includes('ubicación') || msg.includes('dirección') || msg.includes('dónde')) {
      return 'Estamos ubicados en Av. Juárez #123, Col. Centro, CDMX. También ofrecemos consultas virtuales. ¿Prefieres una cita presencial o en línea?';
    }
    
    if (msg.includes('gracias') || msg.includes('thank')) {
      return '¡De nada! Estamos aquí para ayudarte. Si tienes más preguntas, no dudes en contactarnos.';
    }

    return 'Gracias por tu mensaje. Para brindarte una mejor atención sobre tu caso específico, te recomiendo agendar una consulta o llamarnos al 55 5555 5555. ¿En qué más puedo ayudarte?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Guardar mensaje del usuario
    await supabase.from('chat_messages').insert([{
      session_id: sessionId,
      message: input,
      sender: 'user'
    }]);

    const botResponse = getBotResponse(input);
    
    setTimeout(() => {
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

      // Guardar respuesta del bot
      supabase.from('chat_messages').insert([{
        session_id: sessionId,
        message: botResponse,
        sender: 'bot'
      }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 p-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 z-50"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-2xl shadow-2xl z-50 flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 3rem)' }}
          >
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-slate-900" />
                <div>
                  <h3 className="font-bold text-slate-900">Asistente Virtual</h3>
                  <p className="text-xs text-slate-800">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-900 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-amber-500/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-slate-900 border border-amber-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 p-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
