import React, { useState, useMemo, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Zap,
  BookOpen,
  HelpCircle,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
  Layers,
  Search,
  Check,
  Award,
  Terminal,
  Database,
  ShieldCheck,
  Server,
  Cpu,
  Radio,
  Clock,
  Activity,
  Bot,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  X,
  Maximize2,
  ImageIcon
} from 'lucide-react';

// ============================================================================
// 1. DATOS (DATA) - Array de objetos con analogías en criollo y dependencias
// ============================================================================
const DATA = [
  {
    id: 1,
    categoria: "Herramientas de Desarrollo",
    leyenda: "El pasante que te escribe el código aburrido. Le ponés una etiqueta y el pibe te genera todos los getters, setters y constructores por atrás para que no ensucies el archivo.",
    respuesta: "lombok",
    aliases: ["lombok", "project lombok"]
  },
  {
    id: 2,
    categoria: "Herramientas de Desarrollo",
    leyenda: "El F5 automático. Guardás el código y reinicia la app al toque por atrás sin que tengas que parar y levantar el servidor a mano.",
    respuesta: "spring boot devtools",
    aliases: ["devtools", "spring devtools", "dev tools", "spring boot devtools", "spring-boot-devtools", "boot devtools"]
  },
  {
    id: 3,
    categoria: "Herramientas de Desarrollo",
    leyenda: "El archivo .bat mágico. Le das play y te levanta la base de datos, el Redis y el Kafka en contenedores, todo de una para que no instales nada en tu PC.",
    respuesta: "docker compose support",
    aliases: ["docker", "compose", "docker compose", "docker-compose", "docker compose support", "docker-compose-support"]
  },
  {
    id: 4,
    categoria: "Web & APIs",
    leyenda: "La ventanilla de atención al público. Recibe las URLs que pone el usuario en el navegador y le devuelve la info. Sin esto, tu app está desconectada de internet.",
    respuesta: "spring web",
    aliases: ["web", "spring web", "spring-web", "starter web", "spring boot starter web", "mvc", "spring mvc"]
  },
  {
    id: 5,
    categoria: "Web & APIs",
    leyenda: "La ventanilla VIP asincrónica. En vez de hacer cola, el usuario deja su pedido y se va; cuando la respuesta está lista, el sistema lo llama. Ideal para apps que manejan miles de usuarios a la vez.",
    respuesta: "spring reactive web",
    aliases: ["webflux", "reactive web", "spring webflux", "reactive", "spring reactive", "spring reactive web"]
  },
  {
    id: 6,
    categoria: "Web & APIs",
    leyenda: "El manual de instrucciones automático. Te genera una paginita web (Swagger) con todos los botones para probar tu API sin tener que usar Postman.",
    respuesta: "springdoc openapi",
    aliases: ["swagger", "openapi", "springdoc", "springdoc openapi", "springdoc-openapi", "swagger ui", "swagger-ui"]
  },
  {
    id: 7,
    categoria: "Web & APIs",
    leyenda: "El menú a la carta. En vez de que el servidor te mande el plato armado, el front-end pide exactamente qué datos quiere (ej: 'dame solo el nombre y el email') y esto se lo sirve.",
    respuesta: "spring for graphql",
    aliases: ["graphql", "spring graphql", "spring for graphql", "graph ql"]
  },
  {
    id: 8,
    categoria: "Web & APIs",
    leyenda: "El tubo directo de chat. Mantiene una conexión abierta todo el tiempo entre tu PC y el server para cosas en tiempo real, como un chat o un mapa en vivo.",
    respuesta: "websocket",
    aliases: ["websocket", "websockets", "spring websocket", "ws", "sockjs", "stomp"]
  },
  {
    id: 9,
    categoria: "Seguridad",
    leyenda: "La pantalla de bloqueo de Windows. Te pide usuario y contraseña. Si no tenés permisos de Administrador, no te deja entrar a ciertas carpetas de la app.",
    respuesta: "spring security",
    aliases: ["security", "spring security", "spring-security", "spring boot security"]
  },
  {
    id: 10,
    categoria: "Seguridad",
    leyenda: "El 'Iniciar sesión con Google'. Te ahorra hacer el sistema de usuarios y delega la seguridad en un tercero.",
    respuesta: "oauth2 client",
    aliases: ["oauth2 client", "oauth client", "oauth2", "oauth", "oauth 2", "oauth 2 client", "google login", "login google"]
  },
  {
    id: 11,
    categoria: "Seguridad",
    leyenda: "El patovica que lee códigos QR. Tu app no valida contraseñas, solo recibe un token (el QR), se fija si es válido y te deja pasar.",
    respuesta: "oauth2 resource server",
    aliases: ["oauth2 resource server", "resource server", "oauth2 resource", "jwt", "resource-server", "oauth resource"]
  },
  {
    id: 12,
    categoria: "Bases de Datos (SQL)",
    leyenda: "El oficinista del Excel. Vos le decís 'traeme al usuario 5' y él se pelea con la base de datos para traerte los datos armaditos en un Objeto de Java.",
    respuesta: "spring data jpa",
    aliases: ["jpa", "data jpa", "spring data jpa", "spring jpa", "hibernate", "spring hibernate", "orm"]
  },
  {
    id: 13,
    categoria: "Bases de Datos (SQL)",
    leyenda: "La consola de comandos (CMD). Cuando el oficinista es muy lento, usás esto para tirar consultas SQL a mano, crudas y rapidísimas.",
    respuesta: "jdbc api",
    aliases: ["jdbc", "jdbc api", "spring jdbc", "spring-jdbc", "jdbc template", "jdbctemplate"]
  },
  {
    id: 14,
    categoria: "Bases de Datos (SQL)",
    leyenda: "El sistema de autoguardado de la base de datos. Guarda el historial de todas las tablas que creaste para que en producción nadie rompa nada.",
    respuesta: "flyway migration",
    aliases: ["flyway", "flyway migration", "flyway-core", "migrations", "db migration"]
  },
  {
    id: 15,
    categoria: "Bases de Datos (SQL)",
    leyenda: "El cable USB. Es el driver físico que permite que tu programa de Java se pueda enchufar a una base de datos PostgreSQL.",
    respuesta: "postgresql driver",
    aliases: ["postgresql", "postgres", "postgresql driver", "postgres driver", "psql", "postgresql-driver"]
  },
  {
    id: 16,
    categoria: "Bases de Datos (SQL)",
    leyenda: "El pendrive temporal. Una base de datos que vive en la memoria RAM y se borra cuando apagás la app. Ideal para testing.",
    respuesta: "h2 database",
    aliases: ["h2", "h2 database", "h2 db", "h2 database driver", "h2db"]
  },
  {
    id: 17,
    categoria: "Bases de Datos (NoSQL) y Caché",
    leyenda: "La memoria RAM de tu app. Guarda cosas que se consultan todo el tiempo rapidísimo, para no tener que ir a buscar al disco duro (base de datos) a cada rato.",
    respuesta: "spring data redis",
    aliases: ["redis", "data redis", "spring redis", "spring data redis", "jedis", "lettuce"]
  },
  {
    id: 18,
    categoria: "Bases de Datos (NoSQL) y Caché",
    leyenda: "La carpeta de archivos sueltos. En vez de guardar datos en tablas estrictas, guarda documentos JSON sueltos. Excelente si tu información cambia de forma todo el tiempo.",
    respuesta: "spring data mongodb",
    aliases: ["mongodb", "mongo", "data mongo", "data mongodb", "spring mongo", "spring data mongodb", "spring mongodb"]
  },
  {
    id: 19,
    categoria: "Bases de Datos (NoSQL) y Caché",
    leyenda: "El buscador de Windows súper vitaminado. Indexa textos gigantes para que puedas buscar palabras clave en milisegundos, tipo el buscador de MercadoLibre.",
    respuesta: "spring data elasticsearch",
    aliases: ["elasticsearch", "elastic", "data elasticsearch", "spring elasticsearch", "spring data elasticsearch", "elastic search"]
  },
  {
    id: 20,
    categoria: "Mensajería (Asincronismo)",
    leyenda: "El Correo Argentino. Vos le dejás un paquete (mensaje) y te olvidás. Él se encarga de que le llegue a otro sistema cuando el otro sistema esté libre para procesarlo.",
    respuesta: "spring for rabbitmq",
    aliases: ["rabbitmq", "rabbit", "rabbit mq", "spring rabbitmq", "spring for rabbitmq", "amqp", "spring amqp"]
  },
  {
    id: 21,
    categoria: "Mensajería (Asincronismo)",
    leyenda: "El canal de Twitch. Tu app transmite eventos (ej: 'alguien compró algo') y otras 50 apps pueden estar 'suscriptas' escuchando eso para reaccionar al mismo tiempo.",
    respuesta: "spring for apache kafka",
    aliases: ["kafka", "apache kafka", "spring kafka", "spring for kafka", "spring for apache kafka", "apache-kafka"]
  },
  {
    id: 22,
    categoria: "Tareas y Utilidades",
    leyenda: "El control de aduana. Revisa que el formulario que mandó el usuario no venga con un email falso o con el campo de DNI vacío antes de dejarlo entrar al sistema.",
    respuesta: "validation",
    aliases: ["validation", "bean validation", "spring validation", "hibernate validator", "validator", "jakarta validation"]
  },
  {
    id: 23,
    categoria: "Tareas y Utilidades",
    leyenda: "La Tarea Programada de Windows. Un proceso pesado que corre a la madrugada sin que nadie lo vea (ej: generar los recibos de sueldo de 10.000 empleados).",
    respuesta: "spring batch",
    aliases: ["batch", "spring batch", "spring-batch"]
  },
  {
    id: 24,
    categoria: "Tareas y Utilidades",
    leyenda: "El despertador. Le decís 'ejecutá este código todos los martes a las 15:00' y el loco se encarga de dispararlo a esa hora exacta.",
    respuesta: "quartz scheduler",
    aliases: ["quartz", "scheduler", "quartz scheduler", "cron", "quartz-scheduler"]
  },
  {
    id: 25,
    categoria: "Tareas y Utilidades",
    leyenda: "El historial del navegador. Anota las respuestas a las preguntas frecuentes para que la próxima vez que pregunten lo mismo, responda al toque sin calcular nada.",
    respuesta: "spring cache abstraction",
    aliases: ["cache", "spring cache", "cache abstraction", "caching", "spring caching", "spring cache abstraction"]
  },
  {
    id: 26,
    categoria: "Tareas y Utilidades",
    leyenda: "El Outlook integrado. Literalmente lo que necesitás para que tu sistema mande correos de 'Recuperar contraseña' o facturas.",
    respuesta: "java mail sender",
    aliases: ["mail", "java mail", "spring mail", "java mail sender", "mail sender", "email", "smtp", "javamail"]
  },
  {
    id: 27,
    categoria: "Tareas y Utilidades",
    leyenda: "Una máquina virtual descartable. Levanta una base de datos real en Docker solo para correr los tests automáticos, y cuando termina, la destruye.",
    respuesta: "testcontainers",
    aliases: ["testcontainers", "test containers", "test container", "test-containers"]
  },
  {
    id: 28,
    categoria: "Observabilidad y Monitoreo",
    leyenda: "El Administrador de Tareas (Ctrl+Alt+Supr). Te da URLs secretas para ver cuánta RAM usa tu app, si la base de datos está caída o cómo viene de CPU.",
    respuesta: "spring boot actuator",
    aliases: ["actuator", "spring actuator", "spring boot actuator", "metrics", "health check"]
  },
  {
    id: 29,
    categoria: "Observabilidad y Monitoreo",
    leyenda: "El grabador de las cámaras de seguridad. Chupa todas las métricas de monitoreo y las guarda en un historial para que veas si ayer a las 3 AM hubo un pico de uso.",
    respuesta: "prometheus",
    aliases: ["prometheus", "prometheus metrics", "micrometer prometheus", "micrometer-registry-prometheus"]
  },
  {
    id: 30,
    categoria: "Observabilidad y Monitoreo",
    leyenda: "El número de seguimiento del correo. Si un usuario hace un clic y eso viaja por 5 microservicios distintos, esto le pone un ID para que sepas en cuál de los 5 falló.",
    respuesta: "distributed tracing",
    aliases: ["tracing", "distributed tracing", "zipkin", "micrometer tracing", "distributed-tracing", "sleuth", "opentelemetry"]
  },
  {
    id: 31,
    categoria: "Microservicios (Spring Cloud)",
    leyenda: "La guía telefónica (Páginas Amarillas). En un sistema con 30 microservicios que cambian de IP todo el tiempo, se anotan acá para encontrarse entre ellos.",
    respuesta: "eureka discovery client",
    aliases: ["eureka", "eureka discovery", "eureka client", "eureka discovery client", "discovery client", "netflix eureka"]
  },
  {
    id: 32,
    categoria: "Microservicios (Spring Cloud)",
    leyenda: "El disco compartido en red (Disco Z:). Un solo lugar central donde guardás las contraseñas y configuraciones de todos tus microservicios.",
    respuesta: "config client",
    aliases: ["config client", "spring cloud config", "config server", "cloud config", "spring cloud config client", "config"]
  },
  {
    id: 33,
    categoria: "Microservicios (Spring Cloud)",
    leyenda: "El recepcionista del edificio. Todo el tráfico de internet entra por acá, y este chabón decide a qué microservicio (departamento) derivar la consulta.",
    respuesta: "gateway",
    aliases: ["gateway", "spring cloud gateway", "cloud gateway", "api gateway", "spring gateway"]
  },
  {
    id: 34,
    categoria: "Microservicios (Spring Cloud)",
    leyenda: "El teléfono directo. Te permite llamar a la API de otro microservicio escribiendo una simple interfaz en Java, como si estuvieras llamando a una función local.",
    respuesta: "openfeign",
    aliases: ["openfeign", "feign", "spring cloud openfeign", "feign client", "open feign", "spring feign"]
  },
  {
    id: 35,
    categoria: "Microservicios (Spring Cloud)",
    leyenda: "La llave térmica de la casa (Circuit Breaker). Si un microservicio externo se cae, esto corta la conexión para que tu app no se quede colgada esperando y no explote todo.",
    respuesta: "resilience4j",
    aliases: ["resilience4j", "resilience 4j", "circuit breaker", "circuitbreaker", "resilience", "hystrix"]
  },
  {
    id: 36,
    categoria: "Inteligencia Artificial",
    leyenda: "El enchufe directo a ChatGPT. Te da las herramientas para mandarle prompts al modelo desde tu código Java de forma nativa.",
    respuesta: "openai",
    aliases: ["openai", "open ai", "spring ai openai", "chatgpt", "gpt"]
  },
  {
    id: 37,
    categoria: "Inteligencia Artificial",
    leyenda: "El ChatGPT offline. Te permite correr modelos de inteligencia artificial de forma local en tu propia PC sin gastar plata en APIs externas.",
    respuesta: "ollama",
    aliases: ["ollama", "spring ai ollama", "local ai", "llama"]
  },
  {
    id: 38,
    categoria: "Inteligencia Artificial",
    leyenda: "La memoria del bot. Es un parche para PostgreSQL que le permite entender similitudes (ej: saber que 'perro' y 'gato' están cerca) para darle contexto a la IA.",
    respuesta: "pgvector vector database",
    aliases: ["pgvector", "vector database", "pg vector", "pgvector database", "vector db", "vectors", "embeddings"]
  }
];

// ============================================================================
// 2. UTILIDADES (UTILITIES) - Funciones puras fuera del componente
// ============================================================================

/**
 * Normaliza cualquier texto ignorando mayúsculas, minúsculas, tildes/acentos,
 * espacios en blanco, guiones (-), barras y símbolos de puntuación.
 */
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s\-_.,/\\()\[\]'"`]/g, '')
    .trim();
};

/**
 * Función de coincidencia inteligente y flexible:
 * - Coincidencia exacta con la respuesta normalizada
 * - Coincidencia con cualquiera de los alias técnicos y variantes abreviadas
 * - Coincidencia por palabra clave significativa (ej: 'docker', 'kafka', 'postgres', 'jpa', etc.)
 */
const checkMatch = (rawInput, card) => {
  const normInput = normalizeText(rawInput);
  if (!normInput || normInput.length < 2) return false;

  // 1. Coincidencia directa con respuesta normalizada
  if (normalizeText(card.respuesta) === normInput) return true;

  // 2. Coincidencia con lista de alias
  if (card.aliases && Array.isArray(card.aliases)) {
    if (card.aliases.some((alias) => normalizeText(alias) === normInput)) {
      return true;
    }
  }

  // 3. Coincidencia por tokens significativos de la respuesta o sus alias
  const genericStopWords = new Set(['spring', 'boot', 'starter', 'for', 'the', 'and', 'support', 'database', 'driver', 'server', 'client']);
  const allPhrases = [card.respuesta, ...(card.aliases || [])];

  for (const phrase of allPhrases) {
    const rawTokens = phrase.toLowerCase().split(/[\s\-_.,/\\()\[\]'"`]+/);
    for (const token of rawTokens) {
      const normToken = normalizeText(token);
      if (
        normToken.length >= 2 &&
        !genericStopWords.has(normToken) &&
        normToken === normInput
      ) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Agrupa una lista de items según su propiedad 'categoria'.
 */
const groupByCategory = (items) => {
  return items.reduce((accumulator, item) => {
    const categoryName = item.categoria || 'Sin Categoría';
    if (!accumulator[categoryName]) {
      accumulator[categoryName] = [];
    }
    accumulator[categoryName].push(item);
    return accumulator;
  }, {});
};

/**
 * Sintetizador de efectos de sonido vía Web Audio API nativo (cero dependencias de archivos de audio).
 */
const playAudioFeedback = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'match') {
      // Tono de acierto alegre y cristalino (arpegio de dos notas)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.08); // A5
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.22); // D6

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.35);
    } else if (type === 'reset') {
      // Tono sutil descendente de reinicio
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      // Fanfarria triunfal
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const time = ctx.currentTime + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.45);
      });
    }
  } catch (e) {
    // Si el navegador restringe el audio context sin interacción, ignorar silenciosamente
  }
};

/**
 * Dispara una ráfaga de confeti estético.
 */
const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#4ade80', '#10b981', '#38bdf8', '#fbbf24']
    });
  } catch (e) {
    // fallback seguro
  }
};

// ============================================================================
// 3. SUB-COMPONENTES AUXILIARES (En el mismo archivo para no saturar)
// ============================================================================

/**
 * Ícono representativo para cada categoría técnica
 */
const CategoryIcon = ({ categoria, className = "w-5 h-5" }) => {
  switch (categoria) {
    case "Herramientas de Desarrollo":
      return <Terminal className={className} />;
    case "Web & APIs":
      return <Server className={className} />;
    case "Seguridad":
      return <ShieldCheck className={className} />;
    case "Bases de Datos (SQL)":
      return <Database className={className} />;
    case "Bases de Datos (NoSQL) y Caché":
      return <Cpu className={className} />;
    case "Mensajería (Asincronismo)":
      return <Radio className={className} />;
    case "Tareas y Utilidades":
      return <Layers className={className} />;
    case "Observabilidad y Monitoreo":
      return <Activity className={className} />;
    case "Microservicios (Spring Cloud)":
      return <Zap className={className} />;
    case "Inteligencia Artificial":
      return <Bot className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

/**
 * Modal para previsualizar la imagen en pantalla completa
 */
const ImagePreviewModal = ({ imageItem, onClose }) => {
  if (!imageItem) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-pop"
      >
        <div className="relative aspect-video sm:aspect-[16/10] bg-zinc-950 flex items-center justify-center overflow-hidden">
          <img
            src={`/images/${imageItem.id}.jpg`}
            alt={imageItem.respuesta}
            className="w-full h-full object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 bg-zinc-900 border-t border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              #{imageItem.id < 10 ? `0${imageItem.id}` : imageItem.id}
            </span>
            <span className="text-xs text-zinc-400 font-medium">{imageItem.categoria}</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed mb-3">{imageItem.leyenda}</p>
          <div className="flex items-center gap-2 text-emerald-300 font-mono text-sm font-bold bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{imageItem.respuesta}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Card individual con imagen de fondo bien visible, brillante y adaptada (fitteada)
 */
const Card = ({ item, isGuessed, mode, onPreviewImage }) => {
  const [imgError, setImgError] = useState(false);
  const imageSrc = `/images/${item.id}.jpg`;

  return (
    <div
      id={`card-${item.id}`}
      className={`relative group rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[240px] shadow-lg ${
        isGuessed
          ? 'bg-zinc-900 border-2 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)] scale-[1.01] animate-pop ring-2 ring-emerald-400/60'
          : 'bg-zinc-900 border border-zinc-700/70 hover:border-emerald-500/50 hover:shadow-2xl'
      }`}
    >
      {/* ====================================================================
          IMAGEN DE FONDO BRILLANTE Y FITTEADA
      ==================================================================== */}
      {!imgError && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              isGuessed
                ? 'opacity-85 filter brightness-110 saturate-125 contrast-105'
                : 'opacity-70 group-hover:opacity-85 filter brightness-105 saturate-115 contrast-105'
            }`}
          />
          {/* Overlay suave y traslúcido para no apagar la imagen */}
          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              isGuessed
                ? 'bg-gradient-to-t from-zinc-950/80 via-emerald-950/20 to-zinc-950/50'
                : 'bg-gradient-to-t from-zinc-950/85 via-zinc-950/30 to-zinc-950/55'
            }`}
          />
        </div>
      )}

      {/* ====================================================================
          CONTENIDO DE LA CARD EN PRIMER PLANO (z-10)
      ==================================================================== */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-3">
        {/* Cabecera de la Card */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg shadow-md backdrop-blur-md ${
                  isGuessed
                    ? 'bg-emerald-500/90 text-zinc-950 border border-emerald-300'
                    : 'bg-zinc-950/85 text-zinc-100 border border-zinc-700/80'
                }`}
              >
                #{item.id < 10 ? `0${item.id}` : item.id}
              </span>
              <span className="text-xs text-zinc-100 font-semibold px-2 py-0.5 rounded-lg bg-zinc-950/70 backdrop-blur-md border border-zinc-800/80 truncate max-w-[130px] sm:max-w-[180px] drop-shadow-sm">
                {item.categoria}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Botón para ver imagen grande */}
              {!imgError && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewImage(item);
                  }}
                  className="p-1.5 rounded-lg text-zinc-200 hover:text-white bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700/80 shadow-md backdrop-blur-md transition-all active:scale-95"
                  title="Ver imagen completa"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Badge de estado */}
              {isGuessed && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-300 bg-emerald-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-400 shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ADIVINADA
                </span>
              )}
            </div>
          </div>

          {/* Leyenda / Analogía en Criollo dentro de panel frosted para perfecta lectura */}
          <div className="bg-zinc-950/80 backdrop-blur-md rounded-xl p-3.5 border border-zinc-700/60 shadow-xl">
            <p className="text-zinc-100 text-sm leading-relaxed font-medium drop-shadow-sm">
              {item.leyenda}
            </p>
          </div>
        </div>

        {/* Pie de la Card con la Respuesta */}
        <div className="mt-auto">
          {isGuessed ? (
            // Estado: Adivinada (Brillante y claro)
            <div className="flex items-center justify-between gap-2 bg-emerald-950/90 backdrop-blur-md border-2 border-emerald-400 rounded-xl px-3.5 py-2 text-emerald-200 shadow-xl">
              <div className="flex items-center gap-2 overflow-hidden">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-sm font-black tracking-wide truncate">
                  {item.respuesta}
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-300 shrink-0 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md">
                Correcto
              </span>
            </div>
          ) : mode === 'learning' ? (
            // Modo Aprendizaje: Respuesta visible pero en tono tenue
            <div className="flex items-center justify-between gap-2 bg-zinc-950/85 backdrop-blur-md border border-zinc-700/80 rounded-xl px-3.5 py-2 text-zinc-200 shadow-lg">
              <div className="flex items-center gap-2 overflow-hidden">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-xs text-zinc-200 truncate tracking-wide font-medium">
                  {item.respuesta}
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 shrink-0 font-bold bg-zinc-900 px-1.5 py-0.5 rounded">
                Pista
              </span>
            </div>
          ) : (
            // Modo Prueba: Respuesta 100% oculta
            <div className="flex items-center justify-between gap-2 bg-zinc-950/75 backdrop-blur-md border border-dashed border-zinc-700/80 rounded-xl px-3.5 py-2 text-zinc-400 shadow-md">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="font-mono text-xs tracking-widest text-zinc-400">
                  •••••••••••••••••
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 shrink-0 font-medium">
                Oculto
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Sección de Categoría con Título, Ícono, Contador y Grilla de Cards
 */
const CategoryGroup = ({ categoria, items, guessedIds, mode, onPreviewImage }) => {
  const categoryTotal = items.length;
  const categoryGuessed = items.filter((item) => guessedIds.has(item.id)).length;
  const isAllGuessed = categoryGuessed === categoryTotal;

  return (
    <section className="mb-12 scroll-mt-28" id={`cat-${normalizeText(categoria)}`}>
      {/* Cabecera de Categoría */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-5 border-b border-zinc-800/90">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border transition-colors ${
              isAllGuessed
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800'
            }`}
          >
            <CategoryIcon categoria={categoria} className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              {categoria}
              {isAllGuessed && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Completada
                </span>
              )}
            </h2>
            <p className="text-xs text-zinc-400">
              {categoryGuessed} de {categoryTotal} dependencias dominadas
            </p>
          </div>
        </div>

        {/* Mini Barra de Progreso de Categoría */}
        <div className="flex items-center gap-3">
          <div className="w-28 sm:w-36 bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
            <div
              className={`h-full transition-all duration-500 ${
                isAllGuessed ? 'bg-emerald-500' : 'bg-emerald-500/70'
              }`}
              style={{ width: `${(categoryGuessed / categoryTotal) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-medium text-zinc-400">
            {Math.round((categoryGuessed / categoryTotal) * 100)}%
          </span>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            isGuessed={guessedIds.has(item.id)}
            mode={mode}
            onPreviewImage={onPreviewImage}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * Modal de Victoria al completar el 100% de las dependencias
 */
const VictoryModal = ({ isOpen, onClose, onRestart, timeElapsed, totalCount, maxStreak }) => {
  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-zinc-900 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center">
        {/* Glow de fondo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 animate-bounce">
          <Trophy className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight mb-1">
          ¡Ecosistema Spring Dominado!
        </h3>
        <p className="text-sm text-zinc-400 mb-6">
          Completaste todas las {totalCount} dependencias con sus analogías en criollo.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-3.5">
            <span className="text-xs text-zinc-400 font-medium block mb-1">Tiempo Total</span>
            <span className="text-xl font-black font-mono text-emerald-400">{formatTime(timeElapsed)}</span>
          </div>
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-3.5">
            <span className="text-xs text-zinc-400 font-medium block mb-1">Mayor Racha</span>
            <span className="text-xl font-black font-mono text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              {maxStreak}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Jugar de Nuevo
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-all"
          >
            Ver Tablero
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. COMPONENTE PRINCIPAL (App)
// ============================================================================
export default function App() {
  // Estados principales
  const [inputValue, setInputValue] = useState('');
  const [guessedIds, setGuessedIds] = useState(() => new Set());
  const [gameMode, setGameMode] = useState('learning'); // 'learning' | 'quiz'
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastMatchName, setLastMatchName] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [previewImageItem, setPreviewImageItem] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Referencias
  const inputRef = useRef(null);
  const lastMatchTimeoutRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Agrupación memorizada por categoría
  const groupedData = useMemo(() => {
    return groupByCategory(DATA);
  }, []);

  const categoriesList = useMemo(() => {
    return Object.keys(groupedData);
  }, [groupedData]);

  // Lista filtrada si el usuario usa la barra de búsqueda o filtro rápido por categoría
  const filteredData = useMemo(() => {
    return DATA.filter((item) => {
      const matchesCategory =
        activeCategoryFilter === 'ALL' || item.categoria === activeCategoryFilter;
      const matchesSearch =
        !searchFilter ||
        normalizeText(item.leyenda).includes(normalizeText(searchFilter)) ||
        normalizeText(item.respuesta).includes(normalizeText(searchFilter)) ||
        normalizeText(item.categoria).includes(normalizeText(searchFilter));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryFilter, searchFilter]);

  const filteredGroupedData = useMemo(() => {
    return groupByCategory(filteredData);
  }, [filteredData]);

  // Progreso global
  const totalCards = DATA.length;
  const totalGuessed = guessedIds.size;
  const progressPercentage = Math.round((totalGuessed / totalCards) * 100);

  // Mostrar mensaje toast temporal
  const triggerToast = (message) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Temporizador
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && totalGuessed < totalCards) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, totalGuessed, totalCards]);

  // Auto-foco en el input al cargar la página
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Manejador de victoria al llegar a 38
  useEffect(() => {
    if (totalGuessed === totalCards && totalCards > 0 && !hasCelebrated) {
      setHasCelebrated(true);
      setIsTimerRunning(false);
      setShowVictoryModal(true);
      triggerConfetti();
      setTimeout(() => triggerConfetti(), 400);
      if (soundEnabled) {
        playAudioFeedback('victory');
      }
    }
  }, [totalGuessed, totalCards, hasCelebrated, soundEnabled]);

  /**
   * Manejador del Input de Tipeo Inteligente con Detección en Tiempo Real
   */
  const handleInputChange = (e) => {
    const rawInput = e.target.value;
    setInputValue(rawInput);

    // Iniciar temporizador al primer tipeo
    if (!isTimerRunning && rawInput.trim().length > 0 && totalGuessed < totalCards) {
      setIsTimerRunning(true);
    }

    const normalizedInput = normalizeText(rawInput);
    if (!normalizedInput) return;

    // Buscar si coincide con la respuesta, alias o palabra clave de ALGUNA card NO adivinada
    const matchedItem = DATA.find((item) => {
      if (guessedIds.has(item.id)) return false;
      return checkMatch(rawInput, item);
    });

    if (matchedItem) {
      // 1. Marcar como adivinada
      setGuessedIds((prev) => {
        const next = new Set(prev);
        next.add(matchedItem.id);
        return next;
      });

      // 2. Limpiar input automáticamente
      setInputValue('');

      // 3. Incrementar racha
      setCurrentStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });

      // 4. Feedback sonoro
      if (soundEnabled) {
        playAudioFeedback('match');
      }

      // 5. Feedback visual efímero (Nombre de la card acertada)
      setLastMatchName(matchedItem.respuesta);
      if (lastMatchTimeoutRef.current) {
        clearTimeout(lastMatchTimeoutRef.current);
      }
      lastMatchTimeoutRef.current = setTimeout(() => {
        setLastMatchName(null);
      }, 2500);

      // 6. Si la card no está en pantalla, hacer scroll suave hacia ella
      const cardElement = document.getElementById(`card-${matchedItem.id}`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  /**
   * Reiniciar partida de forma inmediata y confiable
   */
  const handleResetGame = () => {
    setGuessedIds(new Set());
    setInputValue('');
    setCurrentStreak(0);
    setTimeElapsed(0);
    setIsTimerRunning(false);
    setShowVictoryModal(false);
    setHasCelebrated(false);
    setLastMatchName(null);
    if (soundEnabled) {
      playAudioFeedback('reset');
    }
    triggerToast('🔄 ¡Progreso reiniciado correctamente!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col text-zinc-100 pb-36">
      {/* ====================================================================
          HEADER PRINCIPAL / BARRA SUPERIOR
      ==================================================================== */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 px-4 py-3 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Título & Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    Spring Speed Typer
                  </h1>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    CRIOLLO ED.
                  </span>
                </div>
                <p className="text-xs text-zinc-400 hidden sm:block">
                  Flashcards de tipeo rápido con analogías ilustradas
                </p>
              </div>
            </div>

            {/* Acciones Rápidas (Mobile) */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-900 border border-zinc-800"
                title={soundEnabled ? "Silenciar audio" : "Activar audio"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>
              <button
                type="button"
                onClick={handleResetGame}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 active:scale-95 transition-all"
                title="Reiniciar progreso de estudio"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Switch de Modos de Juego (Aprendizaje vs Prueba) */}
          <div className="flex items-center bg-zinc-900/90 p-1 rounded-2xl border border-zinc-800 shadow-inner">
            <button
              type="button"
              onClick={() => setGameMode('learning')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                gameMode === 'learning'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Modo Aprendizaje
            </button>
            <button
              type="button"
              onClick={() => setGameMode('quiz')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                gameMode === 'quiz'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Modo Prueba
            </button>
          </div>

          {/* Estadísticas de Cabecera (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Racha */}
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <Flame className={`w-4 h-4 ${currentStreak > 0 ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-zinc-500'}`} />
              <div className="text-left">
                <span className="text-[10px] text-zinc-400 uppercase font-mono block leading-none">Racha</span>
                <span className="text-sm font-bold font-mono text-zinc-200 leading-none">{currentStreak}</span>
              </div>
            </div>

            {/* Temporizador */}
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <span className="text-[10px] text-zinc-400 uppercase font-mono block leading-none">Tiempo</span>
                <span className="text-sm font-bold font-mono text-zinc-200 leading-none">
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Sonido */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-zinc-400 hover:text-zinc-200 rounded-xl hover:bg-zinc-900 border border-zinc-800 transition-colors"
              title={soundEnabled ? "Silenciar audio" : "Activar audio"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </button>

            {/* Botón Reiniciar Progreso Destacado */}
            <button
              type="button"
              onClick={handleResetGame}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all shadow-sm active:scale-95"
              title="Reiniciar todo el progreso"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          BARRA DE PROGRESO GLOBAL & FILTROS
      ==================================================================== */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 mt-6">
        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 mb-8 shadow-lg backdrop-blur-md">
          {/* Fila superior de progreso */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Progreso Total de Estudio
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  ({totalGuessed} / {totalCards} dominadas)
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {gameMode === 'learning'
                  ? 'Lee las analogías en criollo, observa la respuesta sugerida y escríbela en el input.'
                  : 'Modo desafío: Respuestas ocultas. Escribe la dependencia correcta basándote únicamente en la analogía.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {totalGuessed > 0 && (
                <button
                  type="button"
                  onClick={handleResetGame}
                  className="text-xs font-medium text-zinc-400 hover:text-emerald-400 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reiniciar
                </button>
              )}
              <span className="text-2xl font-black font-mono text-emerald-400">
                {progressPercentage}%
              </span>
            </div>
          </div>

          {/* Barra de progreso animada */}
          <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800/90 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-300 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Filtros rápidos por categoría */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2 border-t border-zinc-800/60 no-scrollbar text-xs">
            <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider shrink-0 mr-1">
              Filtro:
            </span>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('ALL')}
              className={`px-3 py-1 rounded-xl whitespace-nowrap font-medium transition-all ${
                activeCategoryFilter === 'ALL'
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              Todas ({totalCards})
            </button>
            {categoriesList.map((cat) => {
              const catCount = groupedData[cat].length;
              const catGuessedCount = groupedData[cat].filter((i) => guessedIds.has(i.id)).length;
              const isFinished = catGuessedCount === catCount;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-xl whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                    activeCategoryFilter === cat
                      ? 'bg-emerald-500 text-zinc-950 font-bold'
                      : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                      isFinished
                        ? 'bg-emerald-950/80 text-emerald-300'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {catGuessedCount}/{catCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            LISTA SCROLLEABLE DE CATEGORÍAS Y CARDS CON FONDOS
        ==================================================================== */}
        <main className="w-full">
          {Object.keys(filteredGroupedData).length > 0 ? (
            Object.entries(filteredGroupedData).map(([categoria, items]) => (
              <CategoryGroup
                key={categoria}
                categoria={categoria}
                items={items}
                guessedIds={guessedIds}
                mode={gameMode}
                onPreviewImage={setPreviewImageItem}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-zinc-300">No se encontraron dependencias</h3>
              <p className="text-sm text-zinc-500 mt-1">Prueba cambiando el filtro de categoría.</p>
            </div>
          )}
        </main>
      </div>

      {/* ====================================================================
          INPUT GLOBAL FIJO (STICKY / FIXED BOTTOM CON FEEDBACK EN VIVO)
      ==================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-5 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          {/* Toast de acierto o mensaje de reinicio flotante */}
          {lastMatchName && (
            <div className="flex items-center justify-center mb-2 animate-bounce">
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-zinc-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>¡Acertaste: <span className="font-mono underline">{lastMatchName}</span>!</span>
                {currentStreak > 1 && (
                  <span className="bg-zinc-950 text-amber-400 px-2 py-0.5 rounded-full text-xs font-mono">
                    🔥 {currentStreak}x Racha
                  </span>
                )}
              </div>
            </div>
          )}

          {toastMessage && (
            <div className="flex items-center justify-center mb-2 animate-pop">
              <div className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                <span>{toastMessage}</span>
              </div>
            </div>
          )}

          {/* Caja del Input Grande y Llamativo */}
          <div className="relative group">
            {/* Resplandor animado alrededor del input */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm group-focus-within:opacity-100 group-focus-within:blur-md" />

            <div className="relative flex items-center bg-zinc-950 border-2 border-emerald-500/80 rounded-2xl px-4 py-3 shadow-2xl">
              {/* Prompt terminal */}
              <div className="flex items-center gap-2 text-emerald-400 shrink-0 mr-3">
                <Terminal className="w-6 h-6 animate-pulse" />
                <span className="font-mono font-bold text-lg hidden sm:inline">&gt;</span>
              </div>

              {/* Input principal */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setInputValue('');
                  }
                }}
                placeholder="Escribe la dependencia aquí... (Ej: spring data jpa, lombok, devtools)"
                className="w-full bg-transparent text-white placeholder-zinc-500 font-mono text-base sm:text-lg focus:outline-none tracking-wide"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />

              {/* Indicador de teclas o botón limpiar texto del input */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {inputValue ? (
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue('');
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                    title="Borrar texto del input (Escape)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
                    ESC para limpiar
                  </kbd>
                )}

                <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-xs font-mono font-bold">
                  {totalGuessed}/{totalCards}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MODAL DE PREVISUALIZACIÓN DE IMAGEN
      ==================================================================== */}
      <ImagePreviewModal
        imageItem={previewImageItem}
        onClose={() => setPreviewImageItem(null)}
      />

      {/* ====================================================================
          MODAL DE VICTORIA
      ==================================================================== */}
      <VictoryModal
        isOpen={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        onRestart={handleResetGame}
        timeElapsed={timeElapsed}
        totalCount={totalCards}
        maxStreak={maxStreak}
      />
    </div>
  );
}
