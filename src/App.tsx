import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  ShieldAlert,
  Maximize,
  RotateCcw,
  ChevronRight,
  Cpu,
  Layers,
  FileText,
  Calculator,
  Layout,
  Camera,
  Play,
  Video,
  Image as ImageIcon,
  Rotate3d,
  Search,
  Car,
  ChevronLeft,
  Settings,
  User,
  Info,
  Maximize2,
  Gauge,
  ShieldCheck,
  Thermometer,
  Wifi,
  Palette,
  Expand,
  Navigation,
  Zap,
  Disc,
  CarFront,
  PaintBucket,
  Pocket,
  Grip,
  Dna,
  X,
  ArrowLeft,
  Download,
  Hand,
  ChevronDown,
  Wrench,
} from "lucide-react";

const VWLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/3840px-Volkswagen_logo_2019.svg.png"
    alt="VW Logo"
    className="h-[2.60rem] w-auto"
    referrerPolicy="no-referrer"
  />
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 448 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.5-16.4-14.7-27.5-32.8-30.7-38.3-3.2-5.6-.4-8.6 2.4-11.4 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.3 3.7-5.6 5.6-8.3 1.9-2.8.9-5.1-.5-8.3-1.4-3.3-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.8 0-9.8 1.4-15 7.1-5.1 5.6-19.6 19.2-19.6 46.7s20.1 54.1 22.8 57.9c2.8 3.7 39.5 60.3 95.6 84.6 13.4 5.8 23.8 9.3 31.9 11.9 13.5 4.3 25.7 3.7 35.5 2.3 10.9-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  // Inactivity Timer (3 minutes)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);

      // Only set timer if splash screen is NOT showing
      if (!showSplashScreen) {
        timeoutId = setTimeout(
          () => {
            setShowSplashScreen(true);
          },
          3 * 60 * 1000,
        ); // 180,000 ms = 3 minutes
      }
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [showSplashScreen]);

  useEffect(() => {
    if (!showSplashScreen) {
      setActiveAssetView("INTERIOR");
      setShowVideo(true);
    }
  }, [showSplashScreen]);

  const [selectedVersion, setSelectedVersion] = useState("Trendline");
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [current360Index, setCurrent360Index] = useState(0);
  const [activeAssetView, setActiveAssetView] = useState<
    "PHOTO" | "360" | "INTERIOR" | "VIDEO"
  >("PHOTO");
  const [dragStartIndex, setDragStartIndex] = useState(0);
  const [expandedTechnicalSection, setExpandedTechnicalSection] = useState<
    string | null
  >(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppModalType, setWhatsAppModalType] = useState<"ficha_tecnica" | "catalogo_digital">("ficha_tecnica");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendWhatsApp = async () => {
    if (!formName.trim()) {
      setSendStatus("error");
      setErrorMessage("Por favor, ingresa tu nombre.");
      return;
    }
    if (!formPhone.trim()) {
      setSendStatus("error");
      setErrorMessage("Por favor, ingresa tu número de WhatsApp.");
      return;
    }

    // Normalize phone number to international format
    const cleanedDigits = formPhone.replace(/\D/g, "");
    if (cleanedDigits.length < 10) {
      setSendStatus("error");
      setErrorMessage("Por favor, ingresa un número válido (mínimo 10 dígitos).");
      return;
    }

    const formattedPhone = cleanedDigits.length === 10 ? `52${cleanedDigits}` : cleanedDigits;

    setSendStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: formattedPhone,
          nombre: formName.trim(),
          type: whatsAppModalType
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Error en el servidor: ${response.status}`);
      }

      setSendStatus("success");
      // Clean states after success and close the modal after a short delay
      setTimeout(() => {
        setShowWhatsAppModal(false);
        setSendStatus("idle");
        setFormName("");
        setFormPhone("");
      }, 3000);

    } catch (error: any) {
      console.error("Error sending WhatsApp:", error);
      setSendStatus("error");
      const failedDocStr = whatsAppModalType === "catalogo_digital" ? "el Catálogo Digital" : "la Ficha Técnica";
      setErrorMessage(error.message || `No se pudo enviar ${failedDocStr}. Intenta de nuevo.`);
    }
  };

  const [showCatalogFull, setShowCatalogFull] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(
    null,
  );
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;

      if (width < 500) {
        setDeviceType("mobile");
      } else if (width <= 1100) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);

    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const tipsDetails: { [key: string]: { title: string; description: string; icon: React.ReactNode; image: string; videoUrl?: string } } = {
    Cielo: {
      title: "El cielo es el límite",
      description: "Explora la libertad y tecnología que Taos te ofrece.",
      icon: <Maximize size={24} />,
      image: "https://lh3.googleusercontent.com/d/1X0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/El%20cielo%20es%20el%20l%C3%ADmite.mp4",
    },
    Conduccion: {
      title: "Comodidad y seguridad en conducción",
      description: "Descubre cómo Taos hace cada viaje más cómodo y seguro.",
      icon: <ShieldCheck size={24} />,
      image: "https://lh3.googleusercontent.com/d/1X0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Comodidad%20y%20seguridad%20en%20conducci%C3%B3n.mp4",
    },
  };

  const techDetails: { [key: string]: { title: string; description: string; icon: React.ReactNode; image: string; videoUrl?: string } } = {
    ControlCrucero: {
      title: "Control de velocidad crucero adaptativo (ACC)",
      description: "Despídanse de los pedales porque este asistente ajusta automáticamente la velocidad para mantener una distancia segura con el vehículo de adelante y la retoma cuando desaceleran.",
      icon: <Gauge size={24} />,
      image: "https://lh3.googleusercontent.com/d/1X0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Oct_ACC.mp4"
    },
    CamaraReversa: {
      title: "Cámara de visión trasera",
      description: "Seguridad en todo momento. Cada vez que activen la reversa, la pantalla les mostrará qué hay detrás de Taos con una calidad y resolución increíbles.",
      icon: <Camera size={24} />,
      image: "https://lh3.googleusercontent.com/d/1Y5X0W6n7-8_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Oct_Camara.mp4"
    },
    FrenoMulticolision: {
      title: "Asistente de colisión frontal con freno de emergencia.",
      description: "Que nada frene tus planes. Asegúrate de llegar a dónde vas con esta tecnología de última generación, que detecta las reducciones súbitas de velocidad del vehículo que va adelante, emitiendo alertas visuales y sonoras para que tomes una acción. Si no frenas o maniobras, el sistema emplea a fondo el freno para evitar o mitigar impactos.",
      icon: <ShieldAlert size={24} />,
      image: "https://lh3.googleusercontent.com/d/1Z0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Oct_Frenado%20Multicolisi%C3%B3n.mp4"
    },
    LaneAssist: {
      title: "Sistema Lane Assist",
      description: "El plan es no salirse del carril. A veces nos distraemos al volante o cabeceamos por el sueño… son cosas que pasan. Pero para reducir los malos ratos, cuentan con un asistente que detecta las líneas entrecortadas de la calle: si tu SUVW nota una anomalía en su manejo o que se están desviando sin querer, los redirige para que sigan en el carril correcto.",
      icon: <CarFront size={24} />,
      image: "https://lh3.googleusercontent.com/d/1A0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Oct_Lane%20assist.mp4"
    },
    LightAssist: {
      title: "Light Assist",
      description: "Ni más ni menos luz. Este asistente de conducción protege la visión de los otros conductores: si estás viajando con luces altas, cuando Taos detecta los vehículos a distancia, automáticamente se cambia a bajas, y cuando detecta una oscuridad considerable a tu alrededor, activa las altas.",
      icon: <Zap size={24} />,
      image: "https://lh3.googleusercontent.com/d/1B0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Oct_Light%20assist.mp4"
    },
    MonitorPuntoCiego: {
      title: "Monitoreo de punto ciego",
      description: "Taos 2026 los cuida en cada maniobra que hacen, gracias al monitoreo de punto ciego con alerta de tráfico trasero, el cual te indica si hay vehículos circulando fuera de tu visión. Cuando manejas en reversa, también te advierte la presencia de personas, objetos o vehículos cruzando detrás de ti.",
      icon: <Search size={24} />,
      image: "https://lh3.googleusercontent.com/d/1C0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Oct_Monitoreo%20de%20punto%20ciego.mp4"
    },
    SensorPuntoCiego: {
      title: "Sensores de estacionamiento traseros y delanteros.",
      description: "¿El plan? Estacionar muy fácil. Con los sensores de estacionamiento delanteros y traseros van a poder medir cada maniobra con precisión milimétrica porque les avisará si hay vehículos, objetos o personas cada vez que salgan o entren en espacios de estacionamiento.",
      icon: <Grip size={24} />,
      image: "https://lh3.googleusercontent.com/d/1D0r7n9r8f7-7_y5z9QxQ-4G9X0V1S7v4",
      videoUrl: "https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/Taos/Taos_MY25_Sensores%20de%20estacionamiento.mp4"
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const container = galleryRef.current;
      const scrollAmount = direction === "right" ? 344 : -344;
      
      // Check if we are at the end when scrolling right
      if (direction === "right" && Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } 
      // Check if we are at the beginning when scrolling left
      else if (direction === "left" && container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      }
      else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Auto-scrolling Gallery
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-scroll if the gallery is not being manually interacted with (too simple to detect, so we just run it)
      // And only if there's no modal open (selectedGalleryImage is null)
      if (!selectedGalleryImage) {
        scrollGallery("right");
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [selectedGalleryImage]);

  // Using the green Taos image specifically for the main hero view
  const heroImage =
    "https://drive.google.com/thumbnail?id=1nJh6go-a1-kRsH1Vo83tdp3Jmp3dxW1f&sz=w1600";

  const trendline360Images = [
    "https://drive.google.com/thumbnail?id=1YMWpcHn5rpZMZAQWxalJXRzDBe5XbAQX&sz=w1600",
    "https://drive.google.com/thumbnail?id=1fAQHGw2XkuQT4AaFaQNijHlBIYSwYokk&sz=w1600",
    "https://drive.google.com/thumbnail?id=1l7C6EJtXN-6R8vXMGVkMSG1iNbZsJKET&sz=w1600",
    "https://drive.google.com/thumbnail?id=1Q3dF_earHgv58QMBkOd3aTNHUaxwtMdl&sz=w1600",
    "https://drive.google.com/thumbnail?id=1yGYCd1BEWBKvgE9FoZalyNrkll_77qX3&sz=w1600",
    "https://drive.google.com/thumbnail?id=1fANn9iWzZD6Dv2MzRJSjr1xL0km8TkED&sz=w1600",
    "https://drive.google.com/thumbnail?id=1kqxTJnz61CTffBECtSV1-ieH9oBx-a9A&sz=w1600",
  ];

  const comfortline360Images = [
    "https://drive.google.com/thumbnail?id=1pUwoCp3vU7m7qR5DhOBMkDsiQ-ercVha&sz=w1600",
    "https://drive.google.com/thumbnail?id=1xvm9U0ORc4YWW6vJccl0fN1N7Mk4TRvO&sz=w1600",
    "https://drive.google.com/thumbnail?id=1_wL2BB8P7KfRhkbBCx-jpMjoW78Baq9l&sz=w1600",
    "https://drive.google.com/thumbnail?id=1BEiAVuaXl_dNas4s1G0YmjN7ZFuHp43a&sz=w1600",
    "https://drive.google.com/thumbnail?id=1GEhUzHF5pZcnOXl1t9RgLhKq_e_6UlkS&sz=w1600",
    "https://drive.google.com/thumbnail?id=1zwZO-KMyx3LjuCCobaNvdayjh7wLeMdC&sz=w1600",
    "https://drive.google.com/thumbnail?id=1GLBfngofLG6Xp7-dryaFPNJVYW0e1oTs&sz=w1600",
  ];

  const highline360Images = [
    "https://drive.google.com/thumbnail?id=1tK4lZAx00WxyXirtgU8WinhlzRhCgwaK&sz=w1600",
    "https://drive.google.com/thumbnail?id=1LD38jNYFmrM2ynz4zmHsFwcPFZn8fwoj&sz=w1600",
    "https://drive.google.com/thumbnail?id=1vJG-Blnd93YTvikP7OT6CL5MgQmdc6hO&sz=w1600",
    "https://drive.google.com/thumbnail?id=1vypa_bjb6PCT3kW4Px9-k4Yp8RHASuW1&sz=w1600",
    "https://drive.google.com/thumbnail?id=1SIGVh_wj6PQbV2lFY6sX-jac0gDBD1b2&sz=w1600",
    "https://drive.google.com/thumbnail?id=1JnrtXJ6BVnyXEN3plJPAOahDV6V316a0&sz=w1600",
    "https://drive.google.com/thumbnail?id=15TXQU-z8VY3K10MNqrgdEhP_bdT4XPsM&sz=w1600",
  ];

  const extraTrendlineImages = [
    "https://www.volkswagen.com.mx/content/dam/vw-ngw/vw_p_la/mexico/modelos/taos-2023/taos-2023-exterior-7.jpg",
  ];



  const baseGalleryImages = [
    "https://drive.google.com/thumbnail?id=1a48wPxjdxW10NGSrGO0KxZjTils3nnsI&sz=w1600",
    "https://drive.google.com/thumbnail?id=1wSjTnaWr7y4YWA-H-BJhD95VszIGM8hr&sz=w1600",
    "https://drive.google.com/thumbnail?id=1EwaV3dcM2etGkB7dkDXein8ciKZBV36m&sz=w1600",
    "https://drive.google.com/thumbnail?id=1oJZ-tfJD8e6Ib0zsu64aDiLUXl4sYM-X&sz=w1600",
    "https://drive.google.com/thumbnail?id=1Xd0G5WU8_CSjN07QVvS-Kt7_bjvYa6uJ&sz=w1600",
    "https://drive.google.com/thumbnail?id=1fZStJUSo4QRyGHA22Y7Y33UFT--SCEpy&sz=w1600",
    "https://drive.google.com/thumbnail?id=1oybYSfeemb0EibpSnALAuIhaxI8UDWhE&sz=w1600",
    "https://drive.google.com/thumbnail?id=1VYd2jZKYcI3bt4Z5bzNKhKX0H1nBxCC6&sz=w1600",
    "https://drive.google.com/thumbnail?id=1eVGJcR3QiCUoiawbkiHjx5FSu-wsO7Rz&sz=w1600",
    "https://drive.google.com/thumbnail?id=1WZnNWX6N1o2bGliEaDe2fQQwgXdoTnIU&sz=w1600",
    "https://drive.google.com/thumbnail?id=1TIxr5ySvt1TU0eaSO5x9-SYcyOU4Y7UZ&sz=w1600",
  ];

  const galleryImages = baseGalleryImages;

  useEffect(() => {
    if (showVideo && activeAssetView === "INTERIOR") {
      const timeout = setTimeout(() => {
        setShowVideo(false);
        setActiveAssetView("PHOTO");
      }, 12000); // 12 segundos

      return () => clearTimeout(timeout);
    }
  }, [showVideo, activeAssetView]);

  const versions = ["Trendline", "Comfortline", "Highline"];

  const handle360Pan = (event: any, info: any) => {
    if (activeAssetView !== "360") return;
    const sensitivity = 30; // Lower = faster rotation
    const currentImages =
      selectedVersion === "Trendline"
        ? trendline360Images
        : selectedVersion === "Comfortline"
          ? comfortline360Images
          : highline360Images;

    const framesToMove = Math.floor(info.offset.x / sensitivity);
    const newIndex =
      (dragStartIndex - framesToMove + currentImages.length * 100) %
      currentImages.length;

    if (newIndex !== current360Index) {
      setCurrent360Index(newIndex);
    }
  };

  const infoContent: Record<
    string,
    {
      title: string;
      description: string;
      details: string[];
      pdfImages?: string[];
      mainImage?: string;
      downloadUrl?: string;
      externalUrl?: string;
      iframeUrl?: string;
      icon?: React.ReactNode;
    }
  > = {
    TRENDLINE: {
      title: "Taos Trendline",
      description:
        "La puerta de entrada al mundo SUVW con toda la seguridad y espacio que necesitas.",
      details: [
        "Motor 1.4 TSI",
        "6 Airbags",
        'Pantalla de 10"',
        "360° View Available",
      ],
    },
    COMFORTLINE: {
      title: "Taos Comfortline",
      description:
        "El equilibrio perfecto entre tecnología y confort para toda la familia.",
      details: ['Llantas de 18"', "Sensores de estacionamiento", "Climatronic"],
    },
    HIGHLINE: {
      title: "Taos Highline",
      description:
        "La máxima expresión de sofisticación y tecnología en un SUV.",
      details: ["Techo panorámico", "IQ.Light", "Asistentes de conducción"],
    },
    Catalogo: {
      title: "Catálogo Digital",
      description:
        "Explora todas las especificaciones y opciones de personalización.",
      details: [
        "Ficha técnica completa",
        "Gama de colores",
        "Accesorios originales",
      ],
      iframeUrl: "https://drive.google.com/file/d/1sQOOApgDiijKseRDzSn1pwviCHo2B922/preview",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1sQOOApgDiijKseRDzSn1pwviCHo2B922",
      pdfImages: [
        "https://drive.google.com/thumbnail?id=1sQOOApgDiijKseRDzSn1pwviCHo2B922&sz=w1600",
      ],
      icon: <FileText size={24} className="text-[#001E50]" />,
    },
    Tecnologias: {
      title: "Tecnologías del vehículo",
      description:
        "Descubre las innovaciones tecnológicas que hacen de Taos una SUV líder en seguridad y conectividad.",
      details: [
        "Digital Cockpit de 10\"",
        "VW Play con pantalla de 10\"",
        "Asistentes IQ.Drive",
      ],
      icon: <Cpu size={24} className="text-[#001E50]" />,
    },
    Infografia: {
      title: "Infografía Producto",
      description: "",
      details: [],
      mainImage:
        "https://lh3.googleusercontent.com/d/1kqORTv3J8Ko1v9EA8DX4IV2lkYW1-cAz",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1kqORTv3J8Ko1v9EA8DX4IV2lkYW1-cAz",
      icon: <ImageIcon size={24} className="text-[#001E50]" />,
    },
    Cotizador: {
      title: "Infografía Financiera",
      description:
        "Conoce nuestras opciones de financiamiento y elige la que mejor se adapte a tus necesidades.",
      details: ["Planes a medida", "Tasas preferenciales", "Seguro incluido"],
      mainImage: "https://lh3.googleusercontent.com/d/1dYrTjbU9SlfaILcbsK8U9XWsqOfrKHWE",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1dYrTjbU9SlfaILcbsK8U9XWsqOfrKHWE",
      icon: <Calculator size={24} className="text-[#001E50]" />,
    },
    Tips: {
      title: "Volkswagen Tips",
      description:
        "Consejos útiles para tu Volkswagen.",
      details: [
        "El cielo es el límite",
        "Comodidad y seguridad en conducción",
      ],
      icon: <Info size={24} className="text-[#001E50]" />,
    },
    FichaTecnica: {
      title: "Ficha Técnica",
      description:
        "Especificaciones técnicas detalladas del nuevo Volkswagen Taos 2026.",
      details: [
        "Motor 1.4 TSI 150 CV",
        "Transmisión Tiptronic 6 vel.",
        "Capacidad de cajuela 498L",
        "Tanque de combustible 50L",
      ],
      downloadUrl: "https://drive.google.com/uc?export=download&id=1iP0Z-AUjIzht6vokvjt7PxZC9pHJND9J",
      pdfImages: [
        "https://drive.google.com/thumbnail?id=1iP0Z-AUjIzht6vokvjt7PxZC9pHJND9J&sz=w1600",
      ],
      icon: <FileText size={24} className="text-[#001E50]" />,
    },
  };

  return (
    <div className="min-h-screen bg-[#f6f5f2] font-sans text-gray-900 flex justify-center py-0 shadow-none">
      {/* Phone Container */}
      <div className="main-phone-container w-full max-w-[820px] bg-[#f6f5f2] relative flex flex-col overflow-x-hidden min-h-screen sm:min-h-0 sm:rounded-b-3xl border-x border-gray-100">
        {/* Splash Screen */}
        <AnimatePresence>
          {showSplashScreen && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setShowSplashScreen(false)}
              className="absolute inset-0 z-[200] cursor-pointer"
            >
              <div className="relative w-full h-full bg-black overflow-hidden sm:rounded-none">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Retail%20Marketing/TAOS%2030_Master%20Digital_actualizado.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40"></div>
                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center p-6 pb-40 sm:pb-6 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: [0.7, 1, 0.7], y: 0 }}
                    transition={{ 
                      opacity: { duration: 2, repeat: Infinity },
                      y: { duration: 0.8 }
                    }}
                    className="flex flex-col items-center gap-6 sm:gap-8 text-white w-full max-w-lg"
                  >
                    <span className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] px-4 text-center leading-tight">
                      Da click aquí <br className="sm:hidden" /> para comenzar
                    </span>
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-2 sm:mt-0"
                    >
                      <Hand size={deviceType === 'mobile' ? 48 : 64} strokeWidth={1} className="text-white drop-shadow-lg" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <header className="h-[4.40rem] bg-white flex items-center justify-center px-8 border-b border-gray-100 z-50">
          <VWLogo />
        </header>

        {/* Hero Area */}
        <div className="relative h-[300px] sm:h-[420px] w-full overflow-hidden hero-container-mobile">
          {/* Floating Sidebar */}
          <motion.div
            initial={{ x: "calc(-100% + 32px)" }}
            whileHover={{ x: 0 }}
            whileTap={{ x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="absolute bottom-10 sm:bottom-32 left-0 h-[100px] sm:h-[140px] flex items-center transition-all duration-300 z-20 bg-[#001E50]/80 backdrop-blur-xl border border-white/10 rounded-r-3xl overflow-hidden shadow-2xl w-[160px] sm:w-[220px] cursor-pointer group/video"
            onClick={() => setActiveAssetView("VIDEO")}
          >
            <div className="flex h-full w-full items-center flex-row-reverse">
              {/* Tab Handle */}
              <div className="w-[32px] h-full flex flex-col items-center justify-center border-l border-white/10 shrink-0 bg-[#001E50]">
                <span className="rotate-90 text-[10px] font-black text-white/90 whitespace-nowrap tracking-[0.2em] origin-center translate-y-1">
                  Video
                </span>
                <Play size={12} className="text-white fill-white mt-8 mb-2" />
              </div>

              {/* Expandable Content */}
              <div className="flex-1 h-full relative overflow-hidden bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60 group-hover/video:opacity-100 transition-opacity duration-500 scale-110"
                >
                  <source src="https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Retail%20Marketing/TAOS%2030_Master%20Digital_actualizado.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 mb-2 group-hover/video:scale-110 transition-transform">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/40 px-2 py-1 rounded"></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Hero Image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              {activeAssetView === "360" ? (
                <motion.div
                  key="360"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onPanStart={() => setDragStartIndex(current360Index)}
                  onPan={handle360Pan}
                  className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing bg-[#f6f5f2] touch-none"
                >
                  <img
                    src={
                      selectedVersion === "Trendline"
                        ? trendline360Images[current360Index]
                        : selectedVersion === "Comfortline"
                          ? comfortline360Images[current360Index]
                          : highline360Images[current360Index]
                    }
                    alt="Taos 360"
                    className="w-full h-full object-contain pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Invisible Overlay to nudge people to drag */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <Rotate3d size={80} className="text-[#001E50] animate-pulse" />
                  </div>
                </motion.div>
              ) : activeAssetView === "INTERIOR" ? (
                <motion.div
                  key="interior"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-black relative z-10 overflow-hidden"
                >
                  {showVideo ? (
                   <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
  <video
    className="absolute inset-0 w-full h-full object-cover scale-[1.00] pointer-events-none interior-video-mobile"
    style={{ objectPosition: "center 12%" }}
    autoPlay
    muted
    loop
    playsInline
  >
    <source
      src="https://d2kg4fq77jkz6q.cloudfront.net/19_Volky.mp4"
      type="video/mp4"
    />
  </video>
</div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black p-8 text-center">
                      <div className="z-10">
                        <h2 className="text-white text-4xl font-display mb-4">Interior Taos</h2>
                        <p className="text-white/60 max-w-sm mx-auto">Explora el confort y la tecnología de última generación en cada detalle de la cabina.</p>
                        <button 
                          onClick={() => setShowVideo(true)}
                          className="mt-6 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full text-sm font-medium backdrop-blur-md transition-all border border-white/20 pointer-events-auto flex items-center gap-2 mx-auto"
                        >
                          Ver Interior <Play size={16} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Removed duplicate close button that overlapped with Ficha Técnica */}
                </motion.div>
              ) : activeAssetView === "VIDEO" ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-black relative z-10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
                    <video
                      autoPlay
                      muted
                      onEnded={() => setActiveAssetView("PHOTO")}
                      playsInline
                      className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover hero-video-mobile"
                    >
                      <source src="https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Retail%20Marketing/TAOS%2030_Master%20Digital_actualizado.mp4" type="video/mp4" />
                    </video>
                  </div>
                  {/* Removed redundant close button that overlapped with Ficha Técnica */}
                </motion.div>
              ) : (
                <motion.img
                  key="photo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={heroImage}
                  alt="Taos Hero"
                  className="w-full h-full object-cover object-right hero-photo-mobile"
                  referrerPolicy="no-referrer"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Top Right Version Slider - Only visible in 360 view */}
          {activeAssetView === "360" && (
            <div className="absolute top-8 right-8 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 flex shadow-lg border border-gray-100">
                {versions.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVersion(v)}
                    className={`px-5 py-1.5 rounded-full text-[12px] font-bold tracking-tight transition-all ${
                      selectedVersion === v
                        ? "bg-[#001E50] text-white shadow-md"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="asset-icons-container absolute bottom-4 sm:bottom-20 left-12 sm:left-auto sm:right-8 z-20 flex flex-col gap-2 scale-90 sm:scale-100 origin-left sm:origin-right">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-0.5 sm:p-1.5 flex gap-0.5 sm:gap-1.5 shadow-xl border border-white">
              <AssetIcon
                active={activeAssetView === "PHOTO"}
                onClick={() => setActiveAssetView("PHOTO")}
                icon={<ImageIcon size={18} />}
              />
              <AssetIcon
                active={activeAssetView === "360"}
                onClick={() => setActiveAssetView("360")}
                icon={<Rotate3d size={18} />}
              />
              <AssetIcon
                active={activeAssetView === "INTERIOR"}
                onClick={() => {
                  setActiveAssetView("INTERIOR");
                  setShowVideo(true);
                }}
                icon={<Layout size={18} />}
              />
              <AssetIcon
                active={activeAssetView === "VIDEO"}
                onClick={() => setActiveAssetView("VIDEO")}
                icon={<Video size={18} />}
              />
            </div>
          </div>

          {/* Bottom Content: Name & Button */}
          <div className="ficha-tecnica-container absolute bottom-4 sm:bottom-6 left-4 right-4 flex justify-end z-10 pointer-events-none">
            <button
              onClick={() => setSelectedInfo("FichaTecnica")}
              className="bg-[#001E50] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-[13px] font-display font-extrabold tracking-widest hover:bg-black transition-all shadow-2xl pointer-events-auto flex items-center gap-2 group"
            >
              Ficha Técnica
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Badges Section */}
        <div className="badges-section px-4 sm:px-10 py-3 sm:py-6 bg-[#f6f5f2] flex flex-row items-center justify-between gap-1 sm:gap-4 overflow-x-hidden border-b border-gray-100">
          <div className="flex-shrink-0 text-left">
            <span className="text-[#001E50] text-xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight whitespace-nowrap">
              Taos 2026
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-6 flex-1 min-w-0">
            {/* Latin NCAP */}
            <div className="flex flex-col items-center gap-1 sm:gap-3">
              <img
                src="https://lh3.googleusercontent.com/d/1uiAho3z7JAVgvEz_Ja3y03dDus_O5pf8"
                alt="Latin NCAP"
                className="h-7 sm:h-14 object-contain"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setActiveBadge('ncap')}
                className="text-[6px] sm:text-[9px] tracking-widest font-bold text-[#001E50] border border-[#001E50]/20 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full hover:bg-[#001E50] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                Conocer más
              </button>
            </div>

            {/* Premio */}
            <div className="flex flex-col items-center gap-1 sm:gap-3">
              <img
                src="https://lh3.googleusercontent.com/d/1G-mWpURqzSBrY8gn5GJF8_TI9fw_Tr5u"
                alt="Premio"
                className="h-8 sm:h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setActiveBadge('award')}
                className="text-[6px] sm:text-[9px] tracking-widest font-bold text-[#001E50] border border-[#001E50]/20 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full hover:bg-[#001E50] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                Conocer más
              </button>
            </div>

            {/* Garantía */}
            <div className="flex flex-col items-center gap-1 sm:gap-3 border-l border-gray-200 pl-2 lg:pl-6">
              <img
                src="https://lh3.googleusercontent.com/d/1YOLtshTux5-q5R3ghhgcBlYAyPpi5s74"
                alt="Garantía"
                className="h-8 sm:h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Badge Info Modal */}
        <AnimatePresence>
          {activeBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setActiveBadge(null)}
            >
              <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveBadge(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={24} className="text-gray-500" />
              </button>

              <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
                {activeBadge === 'ncap' && (
                  <>
                    <img src="https://lh3.googleusercontent.com/d/1uiAho3z7JAVgvEz_Ja3y03dDus_O5pf8" className="h-20 sm:h-24 object-contain" alt="NCAP" />
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#001E50] tracking-tight px-2">Tu plan es disfrutar. El nuestro, cuidarte en el camino</h3>
                    
                    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                      <video 
                        src="https://qrvwp.s3.dualstack.us-west-2.amazonaws.com/Tecnologias%20del%20Vehiculo/LatinNCAP%20Taos.mp4" 
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      El mejor plan es el que se improvisa con tu persona favorita y con ese amigo fiel que mueve la cola al escuchar la palabra "vamos". Porque sabemos que en tu auto viaja lo que más quieres, Taos consiguió 5 estrellas de seguridad de Latin NCAP en las pruebas con los protocolos válidos hasta 2025 y demostró su gran nivel de protección.
                    </p>
                  </>
                )}
                {activeBadge === 'award' && (
                  <>
                    <img src="https://lh3.googleusercontent.com/d/1G-mWpURqzSBrY8gn5GJF8_TI9fw_Tr5u" className="h-20 sm:h-24 object-contain" alt="Award" />
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#001E50] tracking-tight">Taos es reconocido por sus clientes</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Volkswagen Polo, Taos y Taigun fueron reconocidos como los modelos mejor evaluados de su segmento en 2025, de acuerdo con el Estudio de Calidad y Confiabilidad del Vehículo (VDS) México 2025 de J.D. Power México *.
                      <br /><br />
                      El Estudio de Calidad y Confiabilidad del Vehículo México 2025 se basa en las respuestas de 9,027 propietarios originales de vehículos de año modelo 2022 a 2024. El levantamiento de información se llevó a cabo de noviembre de 2024 a agosto 2025.
                      <br /><br />
                      Con esto la marca Volkswagen en México refuerza una vez más el compromiso con sus clientes y con uno de sus pilares más importantes, crear productos de calidad y confiables que permiten a la marca construir relaciones para toda la vida.
                      <br /><br />
                      <span className="text-[10px] leading-tight block mt-2 italic">
                        * Volkswagen Taos recibió la menor cantidad de problemas reportados en su segmento en el Estudio de Confiabilidad de Vehículos México 2025 de J.D. Power, basado en modelos 2022 a 2024. Se pueden mostrar modelos más recientes. Para obtener información sobre los premios J.D. Power 2025, visita jdpower.com/awards
                      </span>
                    </p>
                  </>
                )}
                {activeBadge === 'warranty' && (
                  <>
                    <img src="https://lh3.googleusercontent.com/d/1YOLtshTux5-q5R3ghhgcBlYAyPpi5s74" className="h-20 sm:h-24 object-contain" alt="Warranty" />
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#001E50] tracking-tight">Garantía Volkswagen</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      Disfruta de la tranquilidad total con nuestra garantía de 5 años o 100,000 km. Incluye asistencia vial, seguro de robo de autopartes y protección de llantas para que tu única preocupación sea el camino.
                    </p>
                  </>
                )}
                
                <button 
                  onClick={() => setActiveBadge(null)}
                  className="mt-2 sm:mt-4 bg-[#001E50] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold tracking-widest hover:bg-[#002d72] transition-colors"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Section */}
        <div className="gallery-section bg-[#f6f5f2] pb-6 relative group/gallery overflow-hidden">
          <div
            ref={galleryRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-hidden snap-x px-4 sm:px-8 select-none no-scrollbar"
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryImage(img)}
                className="gallery_item flex-shrink-0 w-[260px] sm:w-[320px] aspect-[16/10] bg-[#f6f5f2] rounded-2xl overflow-hidden snap-center relative shadow-md cursor-pointer group/item"
              >
                <img
                  src={img}
                  alt={`Taos ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-md transition-all group-hover/item:scale-110">
                  <Maximize2 size={20} className="text-[#001E50]" />
                </div>
              </div>
            ))}
          </div>
          {/* Nav Arrows */}
          <div
            onClick={() => scrollGallery("right")}
            className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 z-10"
          >
            <div className="bg-[#001E50] text-white p-2 rounded-full shadow-lg opacity-80 cursor-pointer hover:opacity-100 transition-opacity active:scale-95">
              <ChevronRight size={20} />
            </div>
          </div>
          <div
            onClick={() => scrollGallery("left")}
            className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 z-10"
          >
            <div className="bg-[#001E50] text-white p-2 rounded-full shadow-lg opacity-80 cursor-pointer hover:opacity-100 transition-opacity active:scale-95">
              <ChevronLeft size={20} />
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="action-row-container bg-[#f6f5f2] py-4">
          <div className="grid grid-cols-5 sm:flex sm:justify-between gap-1.5 sm:gap-3 px-3 sm:px-8">
            <ActionCard
              label="Catálogo Digital"
              onClick={() => setShowCatalogFull(true)}
              icon={<Car size={deviceType === 'mobile' ? 20 : 24} className="text-[#001E50]" />}
            />
            <ActionCard
              label="Infografía Producto"
              onClick={() => setSelectedInfo("Infografia")}
              icon={<FileText size={deviceType === 'mobile' ? 20 : 24} className="text-[#001E50]" />}
            />
            <ActionCard
              label="Tecnologías del vehículo"
              onClick={() => setSelectedInfo("Tecnologias")}
              icon={<Cpu size={deviceType === 'mobile' ? 20 : 24} className="text-[#001E50]" />}
            />
            <ActionCard
              label="Volkswagen Tips"
              onClick={() => {
                setSelectedInfo("Tips");
              }}
              icon={<User size={deviceType === 'mobile' ? 20 : 24} className="text-[#001E50]" />}
            />
            <ActionCard
              label="Infografía Financiera"
              onClick={() => setSelectedInfo("Cotizador")}
              icon={<Calculator size={deviceType === 'mobile' ? 20 : 24} className="text-[#001E50]" />}
            />
          </div>
        </div>

        {/* Mini Footer */}
        <footer className="bg-[#f6f5f2] py-4 flex justify-center gap-6 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-500 tracking-widest cursor-pointer hover:text-black">
            Aviso de Privacidad
          </span>
          <span className="text-[10px] font-bold text-gray-500 tracking-widest cursor-pointer hover:text-black">
            Legales
          </span>
        </footer>

        {/* Modal Overlay / Categories Modal */}
        <AnimatePresence>
          {selectedInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              onClick={() => setSelectedInfo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#f6f5f2] rounded-[2.5rem] w-full max-w-[95vw] max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-white/20"
              >
                <div
                  className="px-8 py-6 flex justify-end items-center gap-3 bg-white border-b border-gray-100"
                >
                  {(selectedInfo === "Catalogo" || selectedInfo === "Infografia" || selectedInfo === "Cotizador") && (
                    <button
                      onClick={() => {
                        if (deviceType === "mobile") {
                          const assetUrl = infoContent[selectedInfo].downloadUrl || infoContent[selectedInfo].mainImage;
                          if (assetUrl) {
                            const link = document.createElement('a');
                            link.href = assetUrl;
                            link.setAttribute('download', `${selectedInfo}_Taos_2026`);
                            link.setAttribute('target', '_blank');
                            link.setAttribute('rel', 'noopener noreferrer');
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }
                        } else {
                          setWhatsAppModalType(selectedInfo === "Catalogo" ? "catalogo_digital" : "ficha_tecnica");
                          setShowWhatsAppModal(true);
                        }
                      }}
                      className={`text-white px-6 py-2.5 rounded-xl flex items-center gap-3 font-bold text-xs shadow-xl transition-all active:scale-95 ${
                        deviceType === "mobile" ? "bg-[#001E50] hover:bg-black" : "bg-[#25D366] hover:bg-[#128C7E]"
                      }`}
                    >
                      {deviceType === "mobile" ? "Descargar" : "Enviar por WhatsApp"}{" "}
                      {deviceType === "mobile" ? <Download size={16} /> : <WhatsAppIcon size={16} />}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedInfo(null)}
                    className="bg-gray-100 text-gray-500 p-2.5 rounded-full transition-all hover:bg-gray-200 hover:text-black active:scale-95"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {selectedInfo === "Tecnologias" ? (
                    <div className="px-4 sm:px-8 py-6 sm:py-8">
                      <div className="flex flex-col items-center gap-3">
                        {Object.keys(techDetails).map((key) => (
                          <button
                            key={key}
                            onClick={() => setSelectedTech(key)}
                            className="flex items-center gap-3 bg-[#001E50] p-2 pr-6 rounded-full text-white hover:bg-black transition-all group active:scale-[0.98] shadow-xl w-full max-w-[440px]"
                          >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#001E50] shrink-0 shadow-inner group-hover:rotate-6 transition-transform">
                              {techDetails[key].icon}
                            </div>
                            <span className="font-display text-xs tracking-tight text-left whitespace-nowrap">
                              {techDetails[key].title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : selectedInfo === "Tips" ? (
                    <div className="px-4 sm:px-8 py-6 sm:py-8">
                      <div className="flex flex-col items-center gap-3">
                        {Object.keys(tipsDetails).map((key) => (
                          <button
                            key={key}
                            onClick={() => setSelectedTip(key)}
                            className="flex items-center gap-3 bg-[#001E50] p-2 pr-6 rounded-full text-white hover:bg-black transition-all group active:scale-[0.98] shadow-xl w-full max-w-[440px]"
                          >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#001E50] shrink-0 shadow-inner group-hover:rotate-6 transition-transform">
                              {tipsDetails[key].icon}
                            </div>
                            <span className="font-display text-xs tracking-tight text-left whitespace-nowrap">
                              {tipsDetails[key].title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : selectedInfo === "FichaTecnica" ? (
                    <div className="px-10 py-12">
                      <div className="flex flex-col border-t border-gray-200">
                        {[
                          "Motor",
                          "Tren Motriz",
                          "Capacidades y Dimensiones",
                          "Rendimientos",
                          "Equipo Seguridad",
                          "Asistentes de manejo",
                          "Equipo Funcional",
                          "Infotainment y conectividad",
                          "Equipo Interior",
                          "Equipo Exterior",
                        ].map((item, idx) => (
                          <div key={idx} className="flex flex-col border-b border-gray-200">
                            <div
                              onClick={() =>
                                setExpandedTechnicalSection(
                                  expandedTechnicalSection === item ? null : item
                                )
                              }
                              className="flex justify-between items-center py-5 group cursor-pointer hover:bg-black/5 transition-colors px-2"
                            >
                              <span className="text-[#1A2138] font-display text-lg tracking-tight">
                                {item}
                              </span>
                              <ChevronDown
                                size={22}
                                className={`text-gray-400 group-hover:text-[#1A2138] transition-transform ${
                                  expandedTechnicalSection === item
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </div>
                            {expandedTechnicalSection === item && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="px-1 shadow-inner bg-gray-50/50 rounded-xl mb-4"
                              >
                                <TechnicalDataTable section={item} />
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-16 flex justify-center">
                        <button
                          onClick={() => {
                            if (deviceType === "mobile") {
                              const assetUrl = infoContent["FichaTecnica"]?.downloadUrl;
                              if (assetUrl) {
                                const link = document.createElement('a');
                                link.href = assetUrl;
                                link.setAttribute('download', 'Ficha_Tecnica_Taos_2026.pdf');
                                link.setAttribute('target', '_blank');
                                link.setAttribute('rel', 'noopener noreferrer');
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }
                            } else {
                              setWhatsAppModalType("ficha_tecnica");
                              setShowWhatsAppModal(true);
                            }
                          }}
                          className={`text-white px-10 py-3.5 rounded-full flex items-center gap-3 shadow-2xl transition active:scale-95 group ${
                            deviceType === "mobile" ? "bg-[#001E50] hover:bg-black" : "bg-[#25D366] hover:bg-[#128C7E]"
                          }`}
                        >
                          <span className="font-display text-[13px] tracking-tight">
                            {deviceType === "mobile" ? "Descargar PDF" : "Enviar por WhatsApp"}
                          </span>
                          {deviceType === "mobile" ? (
                            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                          ) : (
                            <WhatsAppIcon size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : selectedInfo === "Catalogo" ? (
                    <div className="flex flex-col h-full">
                      {infoContent[selectedInfo]?.iframeUrl ? (
                        <div className="aspect-[9/16] md:aspect-video w-full bg-white relative overflow-hidden">
                          <iframe
                            src={infoContent[selectedInfo].iframeUrl}
                            className="absolute w-full h-[calc(100%+60px)] -top-[60px] border-none"
                            title="Catalogo Digital"
                            allow="autoplay"
                          />
                        </div>
                      ) : infoContent[selectedInfo]?.pdfImages ? (
                        <div className="p-4 md:p-8 space-y-6 bg-white overflow-y-auto flex-1">
                          {infoContent[selectedInfo].pdfImages?.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="Preview"
                              className="w-full h-auto rounded-xl shadow-xl border border-gray-100"
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (selectedInfo === "Infografia" || selectedInfo === "Cotizador") && infoContent[selectedInfo]?.mainImage ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
                      <img
                        src={infoContent[selectedInfo].mainImage}
                        alt={selectedInfo}
                        className="max-h-[80vh] w-auto object-contain mx-auto rounded-2xl shadow-xl border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      {/* Removed duplicate mobile download button as per user request */}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-400">
                      Contenido en desarrollo
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub-modal for Tech/Tips Details */}
        <AnimatePresence>
          {(selectedTech || selectedTip) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
              onClick={() => {
                setSelectedTech(null);
                setSelectedTip(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[32px] p-8 max-w-4xl w-full shadow-2xl relative"
              >
                <button
                  onClick={() => {
                    setSelectedTech(null);
                    setSelectedTip(null);
                  }}
                  className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <div className="flex flex-col items-center text-center">
                  {! (selectedTech ? techDetails[selectedTech].videoUrl : tipsDetails[selectedTip!].videoUrl) && (
                    <div className="w-16 h-16 rounded-2xl bg-[#001E50] text-white flex items-center justify-center mb-6 shadow-xl">
                      {selectedTech ? techDetails[selectedTech].icon : tipsDetails[selectedTip!].icon}
                    </div>
                  )}
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-[#001E50] mb-6 tracking-tight">
                    {selectedTech ? techDetails[selectedTech].title : tipsDetails[selectedTip!].title}
                  </h3>

                  {(selectedTech ? techDetails[selectedTech].videoUrl : tipsDetails[selectedTip!].videoUrl) ? (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-black shadow-xl border border-gray-100">
                      <video
                        src={selectedTech ? techDetails[selectedTech].videoUrl : tipsDetails[selectedTip!].videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (selectedTech && techDetails[selectedTech].image) ? (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl border border-gray-100">
                      <img
                        src={techDetails[selectedTech].image}
                        alt="Feature preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  <p className="text-gray-600 leading-relaxed font-medium text-lg max-w-3xl">
                    {selectedTech ? techDetails[selectedTech].description : tipsDetails[selectedTip!].description}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTech(null);
                      setSelectedTip(null);
                    }}
                    className="mt-10 w-full md:max-w-xs bg-[#001E50] text-white py-4 rounded-xl font-bold tracking-widest text-xs hover:bg-black transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Image Overlay */}
        <AnimatePresence>
          {selectedGalleryImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#001E50]/40 flex items-center justify-center p-12 md:p-24"
              onClick={() => setSelectedGalleryImage(null)}
            >
              <div className="absolute top-8 right-8 z-[110]">
                <button
                  onClick={() => setSelectedGalleryImage(null)}
                  className="text-white bg-[#001E50] p-3 rounded-full hover:bg-black transition-all active:scale-95 shadow-xl"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[110]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = galleryImages.indexOf(selectedGalleryImage);
                    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                    setSelectedGalleryImage(galleryImages[prevIndex]);
                  }}
                  className="pointer-events-auto bg-white/10 hover:bg-[#001E50] text-white p-3 md:p-5 rounded-full transition-all backdrop-blur-sm active:scale-90 shadow-2xl"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = galleryImages.indexOf(selectedGalleryImage);
                    const nextIndex = (currentIndex + 1) % galleryImages.length;
                    setSelectedGalleryImage(galleryImages[nextIndex]);
                  }}
                  className="pointer-events-auto bg-white/10 hover:bg-[#001E50] text-white p-3 md:p-5 rounded-full transition-all backdrop-blur-sm active:scale-90 shadow-2xl"
                >
                  <ChevronRight size={36} />
                </button>
              </div>

              <motion.img
                key={selectedGalleryImage}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                src={selectedGalleryImage}
                alt="Fullscreen View"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-white p-2"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Modal */}
        <AnimatePresence>
          {showWhatsAppModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  if (sendStatus !== "sending") {
                    setShowWhatsAppModal(false);
                  }
                }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-[#f6f5f2] w-[90%] max-w-[450px] rounded-[40px] p-10 relative shadow-2xl flex flex-col items-center text-center overflow-hidden"
              >
                {/* Close button X */}
                <button
                  onClick={() => {
                    if (sendStatus !== "sending") {
                      setShowWhatsAppModal(false);
                    }
                  }}
                  disabled={sendStatus === "sending"}
                  className="absolute top-6 right-6 w-12 h-12 bg-[#001E50] rounded-full flex items-center justify-center text-white shadow-lg transition hover:bg-black group disabled:opacity-50"
                >
                  <X
                    size={24}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>

                <div className="mt-4 mb-8">
                  <h2 className="text-[#001E50] text-3xl font-black tracking-tight leading-tight">
                    Enviar por WhatsApp
                  </h2>
                  <p className="text-gray-500 font-bold text-sm mt-1">
                    Compartir archivo de Taos 2026
                  </p>
                </div>

                {sendStatus === "success" ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-8 flex flex-col items-center gap-4 w-full"
                  >
                    <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg">
                      <ShieldCheck size={36} />
                    </div>
                    <span className="text-[#001E50] font-bold text-xl">
                      ¡Enviado con éxito!
                    </span>
                    <p className="text-gray-500 text-sm">
                      {whatsAppModalType === "catalogo_digital"
                        ? "El Catálogo Digital se envió a tu WhatsApp."
                        : "La Ficha Técnica se envió a tu WhatsApp."}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="w-full space-y-6">
                      <div className="flex flex-col items-center">
                        <label className="text-[#001E50] font-bold text-lg mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          placeholder="María Aguirre"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          disabled={sendStatus === "sending"}
                          className="w-full sm:max-w-[320px] h-14 bg-white border border-gray-200 rounded-xl px-4 text-center font-bold text-gray-700 outline-none focus:border-[#001E50] shadow-sm transition-all disabled:opacity-50"
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <label className="text-[#001E50] font-bold text-lg mb-2">
                          Número de WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="5513413289"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          disabled={sendStatus === "sending"}
                          className="w-full sm:max-w-[320px] h-14 bg-white border border-gray-200 rounded-xl px-4 text-center font-bold text-gray-700 outline-none focus:border-[#001E50] shadow-sm transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {sendStatus === "error" && (
                      <div className="mt-4 text-red-600 font-bold text-xs bg-red-50 border border-red-200 rounded-lg p-2.5 w-full sm:max-w-[320px]">
                        {errorMessage}
                      </div>
                    )}

                    <div className="mt-10 w-full flex flex-col items-center gap-6">
                      <button
                        onClick={handleSendWhatsApp}
                        disabled={sendStatus === "sending"}
                        className="bg-[#25D366] text-white w-full sm:max-w-[200px] h-14 rounded-2xl font-black text-sm tracking-widest shadow-xl transition hover:bg-[#128C7E] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 cursor-pointer"
                      >
                        {sendStatus === "sending" ? "Enviando..." : "Enviar"}
                        <WhatsAppIcon size={20} />
                      </button>

                      <button
                        onClick={() => {
                          if (sendStatus !== "sending") {
                            setShowWhatsAppModal(false);
                          }
                        }}
                        disabled={sendStatus === "sending"}
                        className="flex items-center gap-3 text-[#001E50] font-bold group disabled:opacity-50"
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-[#001E50] flex items-center justify-center group-hover:bg-[#001E50] group-hover:text-white transition-all text-[#001E50]">
                          <ArrowLeft size={16} />
                        </div>
                        <span className="text-sm">Regresar</span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Fullscreen Catalog View */}
        <AnimatePresence>
          {showCatalogFull && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-[150] bg-white flex flex-col"
            >
              {/* Header */}
              <div className="h-[4.40rem] bg-white flex items-center justify-between px-6 border-b border-gray-100 shadow-sm z-[160]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowCatalogFull(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-[#001E50]" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (deviceType === "mobile") {
                        const assetUrl = infoContent["Catalogo"].downloadUrl;
                        if (assetUrl) {
                          const link = document.createElement('a');
                          link.href = assetUrl;
                          link.setAttribute('download', 'Catalogo_Taos_2026');
                          link.setAttribute('target', '_blank');
                          link.setAttribute('rel', 'noopener noreferrer');
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
                      } else {
                        setWhatsAppModalType("catalogo_digital");
                        setShowWhatsAppModal(true);
                      }
                    }}
                    className={`text-white px-5 py-2 rounded-xl flex items-center gap-2 font-bold text-xs shadow-md transition-all active:scale-95 ${
                      deviceType === "mobile" ? "bg-[#001E50] hover:bg-black" : "bg-[#25D366] hover:bg-[#128C7E]"
                    }`}
                  >
                    {deviceType === "mobile" ? "Descargar" : "Enviar"}{" "}
                    {deviceType === "mobile" ? <Download size={16} /> : <WhatsAppIcon size={16} />}
                  </button>
                  <button
                    onClick={() => setShowCatalogFull(false)}
                    className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 w-full h-full bg-gray-50 overflow-hidden relative">
                <iframe
                  src={infoContent["Catalogo"].iframeUrl}
                  title="Catálogo Digital"
                  className="absolute w-full h-[calc(100%+64px)] -top-[64px] border-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const TechnicalDataTable = ({ section }: { section: string }) => {
  const motorRows = [
    {
      label: "Alimentación de combustible",
      values: [
        "Inyección Electrónica Directa TSI",
        "Inyección Electrónica Directa TSI",
        "Inyección Electrónica Directa TSI",
      ],
    },
    { label: "Compresor", values: ["Turbo", "Turbo", "Turbo"] },
    { label: "Desplazamiento (cm3)", values: ["1395", "1395", "1395"] },
    { label: "Número de cilindros", values: ["4", "4", "4"] },
    { label: "Número de válvulas", values: ["16", "16", "16"] },
    { label: "Potencia Hp@rpm", values: ["150/5000", "150/5000", "150/5000"] },
    { label: "Torque Nm@rpm", values: ["250@1400", "250@1400", "250@1400"] },
  ];

  const trenMotrizRows = [
    { label: "Dirección", values: ["Electromecánica Servotronic", "Electromecánica Servotronic", "Electromecánica Servotronic"] },
    { label: "Freno de mano electro-mecánico (EPB)", values: ["S", "S", "S"] },
    { label: "Frenos delanteros", values: ["Disco ventilado", "Disco ventilado", "Disco ventilado"] },
    { label: "Frenos traseros", values: ["Disco", "Disco", "Disco"] },
    { label: "Sistema de antibloqueo de frenos (ABS)", values: ["S", "S", "S"] },
    { label: "Sistema de asistencia hidráulica de freno (HBA)", values: ["S", "S", "S"] },
    { label: "Sistema de asistencia para el arranque en pendiente (HHC)", values: ["S", "S", "S"] },
    { label: "Sistema de bloqueo electrónico del diferencial (EDS)", values: ["S", "S", "S"] },
    { label: "Sistema de control de inercia del motor (MSR)", values: ["S", "S", "S"] },
    { label: "Sistema de control de tracción (ASR)", values: ["S", "S", "S"] },
    { label: "Sistema de control electrónico de estabilidad (ESC)", values: ["S", "S", "S"] },
    { label: "Sistema electrónico de distribución de frenado (EBV)", values: ["S", "S", "S"] },
    { label: "Suspensión delantera", values: ["Mc Pherson", "Mc Pherson", "Mc Pherson"] },
    { label: "Suspensión trasera", values: ["Semi-independiente", "Semi-independiente", "Semi-independiente"] },
    { label: "Tracción", values: ["Delantera", "Delantera", "Delantera"] },
  ];

  const capacidadesRows = [
    { label: "Alto (mm)", values: ["1638", "1638", "1638"] },
    { label: "Ancho (mm)", values: ["1841", "1841", "1841"] },
    { label: "Distancia entre ejes (mm)", values: ["2689", "2689", "2689"] },
    { label: "Largo (mm)", values: ["4467", "4467", "4467"] },
    { label: "Pasajeros", values: ["5", "5", "5"] },
    { label: "Peso bruto vehicular (kg)", values: ["1490", "1490", "1490"] },
    { label: "Peso vehicular (kg)", values: ["1412", "1427", "1453"] },
    { label: "Tanque de combustible (l)", values: ["50", "50", "50"] },
    { label: "Tipo de combustible", values: ["Gasolina", "Gasolina", "Gasolina"] },
    { label: "Volumen de cajuela (l)", values: ["500", "500", "500"] },
    { label: "Volumen de cajuela (l) con asientos de segunda fila abatidos", values: ["1591", "1591", "1591"] },
  ];

  const rendimientosRows = [
    { label: "Emisiones de CO2 (gCO2/km) combinado*", values: ["137,4", "139,4", "139,4"] },
    { label: "Emisiones de CO2 (gCO2/km) en carretera*", values: ["109,6", "112,6", "112,6"] },
    { label: "Emisiones de CO2 (gCO2/km) en ciudad*", values: ["160,2", "161,3", "161,3"] },
    { label: "Rendimiento de combustible combinado (km/l)*", values: ["17,1", "16,8", "16,8"] },
    { label: "Rendimiento de combustible en carretera (km/l)*", values: ["21,4", "20,9", "20,9"] },
    { label: "Rendimiento de combustible en ciudad (km/l)*", values: ["14,7", "14,6", "14,6"] },
  ];

  const seguridadRows = [
    { label: "Anclajes en asiento trasero con sistema ISOFIX / LATCH", values: ["S", "S", "S"] },
    { label: "Birlos de seguridad en las 4 ruedas", values: ["S", "S", "S"] },
    { label: "Bolsas de aire frontales para conductor y copiloto con desactivación del acompañante", values: ["S", "S", "S"] },
    { label: "Bolsas de aire laterales para conductor y copiloto", values: ["S", "S", "S"] },
    { label: "Bolsas de aire laterales tipo cortina delanteras y traseras", values: ["S", "S", "S"] },
    { label: "Cabeceras delanteras", values: ["S", "S", "S"] },
    { label: "Cabeceras traseras", values: ["3", "3", "3"] },
    { label: "Cierre automático de seguros al iniciar la marcha", values: ["S", "S", "S"] },
    { label: "Cinturones de seguridad de la segunda fila laterales y central de 3 puntos", values: ["S", "S", "S"] },
    { label: "Cinturones de seguridad delanteros de 3 puntos con ajuste de altura", values: ["S", "S", "S"] },
    { label: "Columna de dirección colapsable", values: ["S", "S", "S"] },
    { label: "Función de \"pánico\" con activación desde el control remoto", values: ["S", "S", "S"] },
    { label: "Inmovilizador electrónico", values: ["S", "S", "S"] },
    { label: "Puertas traseras con seguro de niños", values: ["S", "S", "S"] },
    { label: "Sistema de corte de alimentación de combustible en caso de impacto", values: ["S", "S", "S"] },
    { label: "Sistema de alarma antirrobo", values: ["S", "S", "S"] },
    { label: "Testigo de advertencia de control de cinturones de seguridad óptico y acústico (conductor y copiloto)", values: ["S", "S", "S"] },
    { label: "Testigo de perdida de presión de neumáticos", values: ["S", "S", "S"] },
  ];

  const asistentesRows = [
    { label: "Control de velocidad crucero adaptativo (ACC)", values: ["S", "S", "S"] },
    { label: "Asistente de colisión frontal con freno de emergencia", values: ["S", "S", "S"] },
    { label: "Cámara de visión trasera", values: ["S", "S", "S"] },
    { label: "Control de velocidad crucero", values: ["S", "S", "S"] },
    { label: "Detector de punto ciego", values: ["S", "S", "S"] },
    { label: "Función de freno multicolisión", values: ["S", "S", "S"] },
    { label: "Lane assist", values: ["S", "S", "S"] },
    { label: "Luz de curva dinámica", values: ["-", "S", "S"] },
    { label: "Light assist", values: ["-", "-", "S"] },
    { label: "Sensores de estacionamiento traseros", values: ["S", "S", "S"] },
    { label: "Sensores de estacionamiento delanteros", values: ["-", "-", "S"] },
  ];

  const funcionalRows = [
    { label: "Activación automática de faros con sensor de oscuridad y sistema \"Coming & leaving home\"", values: ["S", "S", "S"] },
    { label: "Aire Acondicionado", values: ["S", "S", "-"] },
    { label: "Aire Acondicionado Climatronic Touch de 2 zonas", values: ["-", "-", "S"] },
    { label: "Apertura de seguro de cajuela vía remota desde la llave con control remoto", values: ["S", "S", "S"] },
    { label: "Apertura de la tapa de combustible con funcionamiento Push-Push", values: ["S", "S", "S"] },
    { label: "Central de cerraduras con activación a través de control remoto", values: ["S", "S", "S"] },
    { label: "Columna de dirección con ajuste de altura y profundidad", values: ["S", "S", "S"] },
    { label: "Contacto de 12 Voltios", values: ["-", "S", "S"] },
    { label: "Desempañante en medallón trasero", values: ["S", "S", "S"] },
    { label: "Elevadores eléctricos de cristales (delanteros y traseros)", values: ["S", "S", "S"] },
    { label: "Espejo interior retrovisor antideslumbrante automático", values: ["-", "-", "S"] },
    { label: "Espejos laterales con ajuste eléctrico y calefacción", values: ["S", "S", "S"] },
    { label: "Función de un solo toque para elevadores eléctricos (delanteros y traseros)", values: ["S", "S", "S"] },
    { label: "Indicador de temperatura exterior", values: ["S", "S", "S"] },
    { label: "Sensor de lluvia con regulación automática de los limpiaparabrisas", values: ["S", "S", "S"] },
    { label: "Sistema keyless access con botón Push to Start", values: ["S", "S", "S"] },
  ];

  const infotainmentRows = [
    { label: "Bocinas", values: ["4", "6", "6"] },
    { label: "Cargador inalámbrico para smartphone", values: ["S", "S", "S"] },
    { label: "Radio AM/FM", values: ["S", "S", "S"] },
    { label: "Bluetooth para telefonía y audio", values: ["S", "S", "S"] },
    { label: "Volkswagen Wire & Wireless App-Connect (control de aplicaciones desde el radio para Smartphone)", values: ["S", "S", "S"] },
    { label: "Pantalla touch a color de 10\" semiflotante", values: ["S", "S", "S"] },
    { label: "Puerto USB \"tipo C\" para datos y carga en consola central", values: ["S", "S", "S"] },
    { label: "Puerto USB \"tipo C\" para carga en la parte trasera del descansabrazos central", values: ["-", "S", "S"] },
    { label: "Sistema de sonido Volkswagen Premium con Subwoofer", values: ["-", "-", "S"] },
    { label: "Cuadro de Instrumentos digital", values: ["S", "S", "-"] },
    { label: "Volkswagen Digital Cockpit", values: ["-", "-", "S"] },
  ];

  const interiorRows = [
    { label: "Asideras en toldo", values: ["3", "3", "3"] },
    { label: "Asiento del conductor con ajuste de altura manual", values: ["S", "-", "-"] },
    { label: "Asiento del conductor con ajuste eléctrico de 10 vías", values: ["-", "S", "S"] },
    { label: "Asiento del conductor con ajuste lumbar eléctrico", values: ["-", "S", "S"] },
    { label: "Asiento del copiloto con ajuste de altura manual", values: ["S", "S", "S"] },
    { label: "Asientos delanteros tipo", values: ["Comfort", "Comfort", "Comfort"] },
    { label: "Bolsas portaobjetos en parte posterior de los asientos delanteros", values: ["-", "S", "S"] },
    { label: "Cajuela iluminada", values: ["S", "S", "S"] },
    { label: "Cubierta de cajuela rígida", values: ["S", "S", "S"] },
    { label: "Descansabrazos central delantero con portaobjetos (Jumbo box)", values: ["S", "S", "S"] },
    { label: "Descansabrazos central delantero con ventilas de AC para pasajero traseros", values: ["-", "S", "S"] },
    { label: "Descansabrazos central en segunda fila con portavasos", values: ["S", "S", "S"] },
    { label: "Detalles interiores en cromo", values: ["S", "S", "S"] },
    { label: "Espejos de vanidad iluminados en parasoles", values: ["2", "2", "2"] },
    { label: "Protectores de estribos delanteros con insertos en cromo", values: ["-", "-", "S"] },
    { label: "Iluminación ambiental en puertas delanteras y tablero con 10 colores elegibles", values: ["-", "-", "S"] },
    { label: "Insertos decorativos en puertas delanteras", values: ["S", "S", "S"] },
    { label: "Insertos decorativos en tablero", values: ["S", "S", "S"] },
    { label: "Juego de tapetes (4)", values: ["S", "S", "S"] },
    { label: "Luces de lectura delanteras", values: ["S", "S", "S"] },
    { label: "Luces de lectura traseras", values: ["S", "S", "S"] },
    { label: "Piso de cajuela alfombrado", values: ["S", "S", "S"] },
    { label: "Pomo de palanca de velocidades en plastico", values: ["S", "-", "-"] },
    { label: "Pomo de palanca de velocidades en piel y con insertos en aluminio", values: ["-", "S", "S"] },
    { label: "Portalentes en techo", values: ["-", "S", "-"] },
    { label: "Portaobjetos en puertas delanteras", values: ["S", "S", "S"] },
    { label: "Portaobjetos en puertas traseras", values: ["S", "S", "S"] },
    { label: "Portatarjetas en parasol del conductor", values: ["S", "S", "S"] },
    { label: "Portavasos en la consola central", values: ["S", "S", "S"] },
    { label: "Respaldo de asientos traseros abatible (60/40)", values: ["S", "S", "S"] },
    { label: "Segunda fila de asientos abatibles con función de piso plano", values: ["S", "S", "S"] },
    { label: "Vestiduras de asientos en tela", values: ["S", "-", "-"] },
    { label: "Vestiduras de asientos en vinyl microcloud", values: ["-", "S", "-"] },
    { label: "Vestiduras de asientos parcialmente en piel", values: ["-", "-", "S"] },
    { label: "Volante multifunciones", values: ["S", "-", "-"] },
    { label: "Volante multifunciones forrado en leatherette", values: ["-", "S", "S"] },
  ];

  const exteriorRows = [
    { label: "4 puertas", values: ["S", "S", "S"] },
    { label: "Antena en medallón", values: ["S", "S", "S"] },
    { label: "Barras porta-equipaje en toldo en color negro", values: ["S", "-", "-"] },
    { label: "Barras porta-equipaje en toldo en aluminio anodizado", values: ["-", "S", "S"] },
    { label: "Cristales traseros oscurecidos (segunda fila y medallón)", values: ["-", "S", "S"] },
    { label: "Cubiertas de espejos en color negro", values: ["S", "-", "-"] },
    { label: "Cubiertas de espejos al color de la carrocería", values: ["-", "S", "-"] },
    { label: "Cubiertas de espejos en color negro brillante", values: ["-", "-", "S"] },
    { label: "Difusor trasero en color negro", values: ["S", "-", "-"] },
    { label: "Difusor trasero en color negro con moldura en cromo", values: ["-", "S", "S"] },
    { label: "Emblema \"Volkswagen\" en poste \"B\"", values: ["S", "S", "S"] },
    { label: "Estribos laterales en negro", values: ["S", "S", "S"] },
    { label: "Faros principales en tecnología LED", values: ["S", "S", "S"] },
    { label: "Luz de marcha diurna en tecnología LED", values: ["S", "S", "-"] },
    { label: "Luz de marcha diurna en tecnología LED Signature", values: ["-", "-", "S"] },
    { label: "Ajuste de altura de faros automático", values: ["-", "S", "S"] },
    { label: "Ajuste dinámico de luces delanteras (AFS)", values: ["-", "S", "S"] },
    { label: "Luces traseras en tecnología LED con línea de conexión LED", values: ["S", "S", "S"] },
    { label: "Tapa de cajuela con logo VW iluminado", values: ["S", "S", "S"] },
    { label: "Fascias al color de la carrocería (delantera y trasera)", values: ["S", "S", "S"] },
    { label: "Limpiador trasero con aspersor", values: ["S", "S", "S"] },
    { label: "Limpiaparabrisas con regulador de velocidad", values: ["S", "S", "S"] },
    { label: "Llanta de refacción tamaño reducido", values: ["S", "S", "S"] },
    { label: "Manijas exteriores al color de la carrocería", values: ["S", "S", "S"] },
    { label: "Moldura inferior de ventanas en cromo", values: ["-", "S", "S"] },
    { label: "Parrilla central", values: ["S", "-", "-"] },
    { label: "Parrilla central con labio iluminado en tecnología LED", values: ["-", "S", "S"] },
    { label: "Reflectores traseros", values: ["S", "S", "S"] },
    { label: "Rines de aluminio 17\" / Llantas 215/55/ 94H", values: ["S", "-", "-"] },
    { label: "Rines de aluminio 18\" / Llantas 215/50/ 92H", values: ["-", "S", "S"] },
    { label: "Spoiler trasero en techo al color de la carrocería", values: ["S", "S", "S"] },
    { label: "Techo corredizo panorámico con ajuste de altura", values: ["-", "-", "S"] },
    { label: "Techo pintado en color negro", values: ["-", "-", "S"] },
    { label: "Tercera luz de freno en tecnología LED", values: ["S", "S", "S"] },
  ];

  // Map sections to their respective data rows
  const rows =
    section === "Motor"
      ? motorRows
      : section === "Tren Motriz"
        ? trenMotrizRows
        : section === "Capacidades y Dimensiones"
          ? capacidadesRows
          : section === "Rendimientos"
            ? rendimientosRows
            : section === "Equipo Seguridad"
              ? seguridadRows
              : section === "Asistentes de manejo"
                ? asistentesRows
                : section === "Equipo Funcional"
                  ? funcionalRows
                  : section === "Infotainment y conectividad"
                    ? infotainmentRows
                    : section === "Equipo Interior"
                      ? interiorRows
                      : section === "Equipo Exterior"
                        ? exteriorRows
                        : motorRows;

  return (
    <div className="w-full bg-white overflow-hidden rounded-2xl border border-gray-200 shadow-sm mt-2 mb-4">
      {/* Scrollable Container for Table */}
      <div className="overflow-x-auto no-scrollbar touch-pan-x">
        <div className="min-w-[400px] sm:min-w-0">
          {/* Header */}
          <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] sm:grid-cols-[1.8fr_1fr_1fr_1fr] bg-[#001E50] text-white py-3 sm:py-6 px-1">
            <div className="flex items-center justify-center font-display font-extrabold text-[7.5px] sm:text-xs tracking-widest px-1 sm:px-2 text-center uppercase border-r border-white/10 italic">
              {section}
            </div>
            <div className="text-center flex flex-col justify-center px-0.5 sm:px-1">
              <div className="font-display font-extrabold text-[8px] sm:text-sm tracking-wider mb-0 sm:mb-1 uppercase">
                Trendline
              </div>
              <div className="text-[6.5px] sm:text-[10px] leading-tight opacity-90 font-medium sm:whitespace-nowrap">
                Tiptronic (8)
                <br />
                1.4L TSI
              </div>
            </div>
            <div className="text-center flex flex-col justify-center px-0.5 sm:px-1">
              <div className="font-display font-extrabold text-[8px] sm:text-sm tracking-wider mb-0 sm:mb-1 uppercase">
                Comfortline
              </div>
              <div className="text-[6.5px] sm:text-[10px] leading-tight opacity-90 font-medium sm:whitespace-nowrap">
                Tiptronic (8)
                <br />
                1.4L TSI
              </div>
            </div>
            <div className="text-center flex flex-col justify-center px-0.5 sm:px-1 border-l border-white/10">
              <div className="font-display font-extrabold text-[8px] sm:text-sm tracking-wider mb-0 sm:mb-1 uppercase">
                Highline
              </div>
              <div className="text-[6.5px] sm:text-[10px] leading-tight opacity-90 font-medium sm:whitespace-nowrap">
                Tiptronic (8)
                <br />
                1.4L TSI
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[1.8fr_1fr_1fr_1fr] sm:grid-cols-[1.8fr_1fr_1fr_1fr] min-h-[44px] sm:min-h-[64px]">
                <div className="flex items-center px-2 sm:px-4 py-1.5 sm:py-3 bg-gray-50/50 border-r border-gray-100 text-[8px] sm:text-[11px] font-black text-[#1A2138] leading-tight tracking-tight uppercase">
                  {row.label}
                </div>
                {row.values.map((val, vIdx) => (
                  <div
                    key={vIdx}
                    className="flex items-center justify-center text-center px-1 sm:px-2 py-1.5 sm:py-3 text-[8.5px] sm:text-[11px] text-[#001E50] font-bold border-r last:border-r-0 border-gray-100 leading-tight"
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Scroll Indicator */}
      <div className="sm:hidden py-3 bg-blue-50/50 text-center border-t border-gray-100">
        <span className="text-[10px] font-bold text-[#001E50] flex items-center justify-center gap-2">
          <ChevronRight size={12} className="animate-pulse" />
          Desliza para ver más versiones
          <ChevronRight size={12} className="animate-pulse" />
        </span>
      </div>
    </div>
  );
};

function AssetIcon({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 sm:p-2 rounded-md transition-all ${
        active
          ? "bg-[#001E50] text-white shadow-inner"
          : "text-[#001E50]/60 hover:bg-gray-100"
      }`}
    >
      {icon}
    </button>
  );
}

function ActionCard({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{ y: -3, boxShadow: "0 12px 25px -10px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="ActionCard bg-white flex-1 min-w-0 aspect-square rounded-lg sm:rounded-xl flex flex-col items-center justify-center p-1.5 sm:p-4 text-center gap-1 sm:gap-4 shadow-md border border-gray-100 group transition-all"
    >
      <div className="group-hover:scale-110 transition-transform text-[#001E50] scale-75 sm:scale-125">
        {icon}
      </div>
      <span className="text-[8px] sm:text-[13px] font-display font-medium text-[#001E50] tracking-tight leading-[1.1] w-full px-0.5 overflow-hidden">
        {label}
      </span>
    </motion.button>
  );
}

function FichaCard({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white aspect-square rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-4 text-center gap-3 cursor-pointer group"
    >
      <div className="text-[#001E50] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[10px] font-black text-[#001E50]/90 leading-[1.2] tracking-tight">
        {label}
      </span>
    </motion.div>
  );
}
