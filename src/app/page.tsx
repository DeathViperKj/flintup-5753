"use client";

import { useState } from "react";
import { Heart, X, Zap, MessageCircle, User, Settings, Flame, Star, Trophy, Crown, Check, Bell, Lock, HelpCircle, UserCircle, ChevronRight, LogOut, Shield, Eye, Volume2, Mail, Smartphone, Globe, Trash2, Download, Camera, GripVertical, Plus, MapPin, Sparkles, Send, Gamepad2, ArrowLeft, Image as ImageIcon, Mic, EyeOff, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MinigameHub from "./minigames/index";

// Sistema de tradução
type Language = "pt" | "en" | "es";

const translations = {
  pt: {
    // Header
    appName: "FlintUp",
    
    // Navigation
    discover: "Descobrir",
    matches: "Matches",
    trophies: "Troféus",
    profile: "Perfil",
    
    // Stats
    sparks: "faíscas",
    swipes: "swipes",
    upgrade: "Upgrade",
    premium: "Premium",
    
    // Profile
    yourProfile: "Seu Perfil",
    completeProfile: "Complete seu perfil para mais matches!",
    affinity: "Afinidade",
    settings: "Configurações",
    
    // Discover
    swipesOut: "Swipes esgotados!",
    sawAll: "Você viu todos!",
    comeBackTomorrow: "Volte amanhã ou faça upgrade para Premium",
    comeBackLater: "Volte mais tarde para ver novos perfis",
    seePremium: "Ver Premium",
    restart: "Recomeçar",
    verified: "Verificado",
    
    // Matches & Chat
    yourMatches: "Seus Matches",
    noMatches: "Nenhum match ainda. Continue jogando!",
    recentMatch: "Match recente",
    sendMessage: "Enviar Mensagem",
    playMinigame: "Jogar Minigame",
    minigameLimit: "1x por dia (Básico)",
    minigameUnlimited: "Ilimitado (Premium)",
    minigameUsedToday: "Usado hoje",
    typeMessage: "Digite uma mensagem...",
    online: "Online",
    offline: "Offline",
    
    // Premium
    choosePlan: "Escolha seu Plano",
    startFree: "Comece grátis e desbloqueie todo o potencial quando quiser",
    basic: "Básico",
    everyoneStarts: "O plano que todo mundo começa",
    free: "Grátis",
    forever: "Para sempre",
    createProfile: "Criar perfil",
    fullProfile: "Perfil completo com fotos e bio",
    likesPerDay: "30 likes por dia",
    renewsDaily: "Renova todo dia às 00h",
    chatMatches: "Conversar com matches",
    unlimitedChat: "Chat básico ilimitado",
    basicFilters: "Filtros básicos",
    ageDistanceGender: "Idade, distância e gênero",
    minigameDemo: "1 minigame demo",
    perWeek: "Por semana para testar",
    currentPlan: "Plano Atual",
    fullExperience: "Experiência completa desbloqueada",
    perMonth: "por mês",
    mostPopular: "Mais Popular",
    unlimitedLikes: "Likes ilimitados",
    noDailyLimit: "Sem limites diários",
    allMinigames: "Todos os minigames liberados",
    playUnlimited: "Jogue quantas vezes quiser",
    seeWhoLiked: "Ver quem curtiu você",
    seeAdmirers: "Veja todos os seus admiradores",
    unlimitedRewind: "Rewind ilimitado",
    undoDecisions: "Volte atrás em qualquer decisão",
    weeklyBoost: "Boost semanal",
    featuredWeekly: "Apareça em destaque toda semana",
    audioImageChat: "Chat com áudio e imagens",
    fullCommunication: "Comunicação completa",
    seeAffinity: "Ver porcentagem de afinidade",
    exactCompatibility: "Saiba exatamente a compatibilidade",
    featuredProfile: "Perfil em destaque",
    moreFeedVisibility: "Mais visibilidade no feed",
    subscribePremium: "Assinar Premium por",
    cancelAnytime: "Cancele quando quiser • Sem taxas ocultas",
    securePayment: "Pagamento Seguro",
    sslEncryption: "Criptografia SSL",
    instantActivation: "Ativação Instantânea",
    afterPayment: "Imediato após pagamento",
    cancelWhenever: "Cancele Quando Quiser",
    noCommitment: "Sem compromisso",
    
    // Settings
    account: "Conta",
    preferences: "Preferências",
    privacy: "Privacidade",
    notifications: "Notificações",
    help: "Ajuda",
    language: "Idioma",
    editProfile: "Editar Perfil",
    email: "Email",
    phone: "Telefone",
    profileVerification: "Verificação de Perfil",
    deleteAccount: "Excluir Conta",
    logout: "Sair",
    ageRange: "Faixa de Idade",
    years: "anos",
    maxDistance: "Distância Máxima",
    genderInterest: "Gênero de Interesse",
    all: "Todos",
    male: "Masculino",
    female: "Feminino",
    portuguese: "Português",
    english: "Inglês",
    spanish: "Espanhol",
    showDistance: "Mostrar Distância",
    showLocation: "Exibir sua localização aproximada",
    onlineStatus: "Status Online",
    showActive: "Mostrar quando você está ativo",
    invisibleMode: "Modo Invisível",
    browseUnseen: "Navegar sem ser visto (Premium)",
    blockedUsers: "Usuários Bloqueados",
    downloadData: "Baixar Meus Dados",
    pushNotifications: "Notificações Push",
    receiveAlerts: "Receber alertas no dispositivo",
    newMessages: "Novas Mensagens",
    chatAlerts: "Alertas de chat",
    newMatches: "Novos Matches",
    likeBack: "Quando alguém curtir você de volta",
    sounds: "Sons",
    appSounds: "Efeitos sonoros no app",
    emailNotifications: "Notificações por Email",
    helpCenter: "Central de Ajuda",
    contactSupport: "Falar com Suporte",
    communityGuidelines: "Diretrizes da Comunidade",
    termsOfUse: "Termos de Uso",
    privacyPolicy: "Política de Privacidade",
    version: "FlintUp v1.0.0",
    copyright: "© 2024 FlintUp. Todos os direitos reservados.",
    editAccountData: "Editar perfil, redes sociais e dados",
    ageDistanceFilters: "Idade, distância, gênero e filtros",
    controlVisibility: "Controle quem vê seu perfil",
    manageAlerts: "Gerencie alertas e sons",
    supportTerms: "Suporte, termos e privacidade",
    
    // Account Settings
    profilePhotos: "Fotos do Perfil",
    upTo6Photos: "Até 6 fotos",
    mainPhoto: "Foto Principal",
    addPhoto: "Adicionar Foto",
    name: "Nome",
    maxChars: "máximo de 30 caracteres",
    bio: "Bio",
    bioPlaceholder: "Conte um pouco sobre você...",
    gender: "Gênero",
    other: "Outro",
    specifyGender: "Especifique seu gênero",
    lookingFor: "Quem você procura",
    men: "Homens",
    women: "Mulheres",
    everyone: "Todos",
    age: "Idade",
    cannotEdit: "Não pode ser editado por segurança",
    location: "Localização",
    currentCity: "Cidade Atual",
    updateLocation: "Atualizar Localização",
    interests: "Interesses",
    hobbies: "Hobbies",
    addHobby: "Adicionar hobby",
    maxHobbies: "Máximo 5 hobbies",
    zodiacSign: "Signo",
    selectSign: "Selecione seu signo",
    selectUpTo10: "Escolha até 10",
    personalityCards: "Cartas de Personalidade",
    yourVibes: "Suas vibes - escolha 3",
    romantic: "Romântico(a)",
    adventurous: "Aventureiro(a)",
    creative: "Criativo(a)",
    chatty: "Resenha",
    hardworking: "Trabalhador(a)",
    homebody: "Caseiro(a)",
    extroverted: "Extrovertido(a)",
    introverted: "Introvertido(a)",
    verification: "Verificação",
    verifiedProfile: "Perfil Verificado",
    notVerified: "Não Verificado",
    verifySelfie: "Fazer verificação por selfie",
    saveChanges: "Salvar Alterações",
    
    // Preferences
    relationshipType: "Tipo de Relação",
    casual: "Casual",
    serious: "Sério",
    seeWhatHappens: "Ver no que dá",
    favoriteInterests: "Interesses Favoritos",
    premiumFilters: "Filtros Premium",
    verifiedOnly: "Apenas verificados",
    filterBySign: "Filtrar por signo",
    onlineOnly: "Mostrar apenas quem está online",
    
    // Privacy
    blockUser: "Bloquear usuário",
    reportProfile: "Denunciar perfil",
    
    // Notifications
    minigameInvites: "Convites de minigames",
    promotions: "Promoções",
    
    // Help
    faq: "FAQ",
    support: "Suporte",
    reportBug: "Reportar bug",
    
    // Match Modal
    itsASpark: "É uma Faísca!",
    feltConnection: "sentiram a conexão!",
  },
  en: {
    // Header
    appName: "FlintUp",
    
    // Navigation
    discover: "Discover",
    matches: "Matches",
    trophies: "Trophies",
    profile: "Profile",
    
    // Stats
    sparks: "sparks",
    swipes: "swipes",
    upgrade: "Upgrade",
    premium: "Premium",
    
    // Profile
    yourProfile: "Your Profile",
    completeProfile: "Complete your profile for more matches!",
    affinity: "Affinity",
    settings: "Settings",
    
    // Discover
    swipesOut: "Out of swipes!",
    sawAll: "You've seen everyone!",
    comeBackTomorrow: "Come back tomorrow or upgrade to Premium",
    comeBackLater: "Come back later to see new profiles",
    seePremium: "See Premium",
    restart: "Restart",
    verified: "Verified",
    
    // Matches & Chat
    yourMatches: "Your Matches",
    noMatches: "No matches yet. Keep playing!",
    recentMatch: "Recent match",
    sendMessage: "Send Message",
    playMinigame: "Play Minigame",
    minigameLimit: "1x per day (Basic)",
    minigameUnlimited: "Unlimited (Premium)",
    minigameUsedToday: "Used today",
    typeMessage: "Type a message...",
    online: "Online",
    offline: "Offline",
    
    // Premium
    choosePlan: "Choose Your Plan",
    startFree: "Start free and unlock full potential whenever you want",
    basic: "Basic",
    everyoneStarts: "The plan everyone starts with",
    free: "Free",
    forever: "Forever",
    createProfile: "Create profile",
    fullProfile: "Full profile with photos and bio",
    likesPerDay: "30 likes per day",
    renewsDaily: "Renews daily at midnight",
    chatMatches: "Chat with matches",
    unlimitedChat: "Unlimited basic chat",
    basicFilters: "Basic filters",
    ageDistanceGender: "Age, distance and gender",
    minigameDemo: "1 minigame demo",
    perWeek: "Per week to try",
    currentPlan: "Current Plan",
    fullExperience: "Full experience unlocked",
    perMonth: "per month",
    mostPopular: "Most Popular",
    unlimitedLikes: "Unlimited likes",
    noDailyLimit: "No daily limits",
    allMinigames: "All minigames unlocked",
    playUnlimited: "Play as much as you want",
    seeWhoLiked: "See who liked you",
    seeAdmirers: "See all your admirers",
    unlimitedRewind: "Unlimited rewind",
    undoDecisions: "Undo any decision",
    weeklyBoost: "Weekly boost",
    featuredWeekly: "Featured every week",
    audioImageChat: "Audio and image chat",
    fullCommunication: "Full communication",
    seeAffinity: "See affinity percentage",
    exactCompatibility: "Know exact compatibility",
    featuredProfile: "Featured profile",
    moreFeedVisibility: "More feed visibility",
    subscribePremium: "Subscribe Premium for",
    cancelAnytime: "Cancel anytime • No hidden fees",
    securePayment: "Secure Payment",
    sslEncryption: "SSL Encryption",
    instantActivation: "Instant Activation",
    afterPayment: "Immediate after payment",
    cancelWhenever: "Cancel Whenever",
    noCommitment: "No commitment",
    
    // Settings
    account: "Account",
    preferences: "Preferences",
    privacy: "Privacy",
    notifications: "Notifications",
    help: "Help",
    language: "Language",
    editProfile: "Edit Profile",
    email: "Email",
    phone: "Phone",
    profileVerification: "Profile Verification",
    deleteAccount: "Delete Account",
    logout: "Logout",
    ageRange: "Age Range",
    years: "years",
    maxDistance: "Max Distance",
    genderInterest: "Gender Interest",
    all: "All",
    male: "Male",
    female: "Female",
    portuguese: "Portuguese",
    english: "English",
    spanish: "Spanish",
    showDistance: "Show Distance",
    showLocation: "Display your approximate location",
    onlineStatus: "Online Status",
    showActive: "Show when you're active",
    invisibleMode: "Invisible Mode",
    browseUnseen: "Browse without being seen (Premium)",
    blockedUsers: "Blocked Users",
    downloadData: "Download My Data",
    pushNotifications: "Push Notifications",
    receiveAlerts: "Receive device alerts",
    newMessages: "New Messages",
    chatAlerts: "Chat alerts",
    newMatches: "New Matches",
    likeBack: "When someone likes you back",
    sounds: "Sounds",
    appSounds: "App sound effects",
    emailNotifications: "Email Notifications",
    helpCenter: "Help Center",
    contactSupport: "Contact Support",
    communityGuidelines: "Community Guidelines",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    version: "FlintUp v1.0.0",
    copyright: "© 2024 FlintUp. All rights reserved.",
    editAccountData: "Edit profile, social media and data",
    ageDistanceFilters: "Age, distance, gender and filters",
    controlVisibility: "Control who sees your profile",
    manageAlerts: "Manage alerts and sounds",
    supportTerms: "Support, terms and privacy",
    
    // Account Settings
    profilePhotos: "Profile Photos",
    upTo6Photos: "Up to 6 photos",
    mainPhoto: "Main Photo",
    addPhoto: "Add Photo",
    name: "Name",
    maxChars: "max 30 characters",
    bio: "Bio",
    bioPlaceholder: "Tell us about yourself...",
    gender: "Gender",
    other: "Other",
    specifyGender: "Specify your gender",
    lookingFor: "Looking For",
    men: "Men",
    women: "Women",
    everyone: "Everyone",
    age: "Age",
    cannotEdit: "Cannot be edited for security",
    location: "Location",
    currentCity: "Current City",
    updateLocation: "Update Location",
    interests: "Interests",
    hobbies: "Hobbies",
    addHobby: "Add hobby",
    maxHobbies: "Max 5 hobbies",
    zodiacSign: "Zodiac Sign",
    selectSign: "Select your sign",
    selectUpTo10: "Select up to 10",
    personalityCards: "Personality Cards",
    yourVibes: "Your vibes - choose 3",
    romantic: "Romantic",
    adventurous: "Adventurous",
    creative: "Creative",
    chatty: "Chatty",
    hardworking: "Hardworking",
    homebody: "Homebody",
    extroverted: "Extroverted",
    introverted: "Introverted",
    verification: "Verification",
    verifiedProfile: "Verified Profile",
    notVerified: "Not Verified",
    verifySelfie: "Verify with selfie",
    saveChanges: "Save Changes",
    
    // Preferences
    relationshipType: "Relationship Type",
    casual: "Casual",
    serious: "Serious",
    seeWhatHappens: "See what happens",
    favoriteInterests: "Favorite Interests",
    premiumFilters: "Premium Filters",
    verifiedOnly: "Verified only",
    filterBySign: "Filter by sign",
    onlineOnly: "Show only who is online",
    
    // Privacy
    blockUser: "Block user",
    reportProfile: "Report profile",
    
    // Notifications
    minigameInvites: "Minigame invites",
    promotions: "Promotions",
    
    // Help
    faq: "FAQ",
    support: "Support",
    reportBug: "Report bug",
    
    // Match Modal
    itsASpark: "It's a Spark!",
    feltConnection: "felt the connection!",
  },
  es: {
    // Header
    appName: "FlintUp",
    
    // Navigation
    discover: "Descubrir",
    matches: "Matches",
    trophies: "Trofeos",
    profile: "Perfil",
    
    // Stats
    sparks: "chispas",
    swipes: "swipes",
    upgrade: "Mejorar",
    premium: "Premium",
    
    // Profile
    yourProfile: "Tu Perfil",
    completeProfile: "¡Completa tu perfil para más matches!",
    affinity: "Afinidad",
    settings: "Configuración",
    
    // Discover
    swipesOut: "¡Swipes agotados!",
    sawAll: "¡Los viste a todos!",
    comeBackTomorrow: "Vuelve mañana o mejora a Premium",
    comeBackLater: "Vuelve más tarde para ver nuevos perfiles",
    seePremium: "Ver Premium",
    restart: "Reiniciar",
    verified: "Verificado",
    
    // Matches & Chat
    yourMatches: "Tus Matches",
    noMatches: "Ningún match todavía. ¡Sigue jugando!",
    recentMatch: "Match reciente",
    sendMessage: "Enviar Mensaje",
    playMinigame: "Jugar Minijuego",
    minigameLimit: "1x por día (Básico)",
    minigameUnlimited: "Ilimitado (Premium)",
    minigameUsedToday: "Usado hoy",
    typeMessage: "Escribe un mensaje...",
    online: "En línea",
    offline: "Desconectado",
    
    // Premium
    choosePlan: "Elige tu Plan",
    startFree: "Comienza gratis y desbloquea todo el potencial cuando quieras",
    basic: "Básico",
    everyoneStarts: "El plan con el que todos comienzan",
    free: "Gratis",
    forever: "Para siempre",
    createProfile: "Crear perfil",
    fullProfile: "Perfil completo con fotos y bio",
    likesPerDay: "30 likes por día",
    renewsDaily: "Se renueva todos los días a medianoche",
    chatMatches: "Chatear con matches",
    unlimitedChat: "Chat básico ilimitado",
    basicFilters: "Filtros básicos",
    ageDistanceGender: "Edad, distancia y género",
    minigameDemo: "1 minijuego demo",
    perWeek: "Por semana para probar",
    currentPlan: "Plan Actual",
    fullExperience: "Experiencia completa desbloqueada",
    perMonth: "por mes",
    mostPopular: "Más Popular",
    unlimitedLikes: "Likes ilimitados",
    noDailyLimit: "Sin límites diarios",
    allMinigames: "Todos los minijuegos desbloqueados",
    playUnlimited: "Juega cuanto quieras",
    seeWhoLiked: "Ver quién te gustó",
    seeAdmirers: "Ve todos tus admiradores",
    unlimitedRewind: "Rewind ilimitado",
    undoDecisions: "Deshaz cualquier decisión",
    weeklyBoost: "Boost semanal",
    featuredWeekly: "Destacado cada semana",
    audioImageChat: "Chat con audio e imágenes",
    fullCommunication: "Comunicación completa",
    seeAffinity: "Ver porcentaje de afinidad",
    exactCompatibility: "Conoce la compatibilidad exacta",
    featuredProfile: "Perfil destacado",
    moreFeedVisibility: "Más visibilidad en el feed",
    subscribePremium: "Suscribirse a Premium por",
    cancelAnytime: "Cancela cuando quieras • Sin tarifas ocultas",
    securePayment: "Pago Seguro",
    sslEncryption: "Encriptación SSL",
    instantActivation: "Activación Instantánea",
    afterPayment: "Inmediato después del pago",
    cancelWhenever: "Cancela Cuando Quieras",
    noCommitment: "Sin compromiso",
    
    // Settings
    account: "Cuenta",
    preferences: "Preferencias",
    privacy: "Privacidad",
    notifications: "Notificaciones",
    help: "Ayuda",
    language: "Idioma",
    editProfile: "Editar Perfil",
    email: "Email",
    phone: "Teléfono",
    profileVerification: "Verificación de Perfil",
    deleteAccount: "Eliminar Cuenta",
    logout: "Cerrar Sesión",
    ageRange: "Rango de Edad",
    years: "años",
    maxDistance: "Distancia Máxima",
    genderInterest: "Género de Interés",
    all: "Todos",
    male: "Masculino",
    female: "Femenino",
    portuguese: "Portugués",
    english: "Inglés",
    spanish: "Español",
    showDistance: "Mostrar Distancia",
    showLocation: "Mostrar tu ubicación aproximada",
    onlineStatus: "Estado Online",
    showActive: "Mostrar cuando estás activo",
    invisibleMode: "Modo Invisible",
    browseUnseen: "Navegar sin ser visto (Premium)",
    blockedUsers: "Usuarios Bloqueados",
    downloadData: "Descargar Mis Datos",
    pushNotifications: "Notificaciones Push",
    receiveAlerts: "Recibir alertas en el dispositivo",
    newMessages: "Nuevos Mensajes",
    chatAlerts: "Alertas de chat",
    newMatches: "Nuevos Matches",
    likeBack: "Cuando alguien te guste de vuelta",
    sounds: "Sonidos",
    appSounds: "Efectos de sonido de la app",
    emailNotifications: "Notificaciones por Email",
    helpCenter: "Centro de Ayuda",
    contactSupport: "Contactar Soporte",
    communityGuidelines: "Directrices de la Comunidad",
    termsOfUse: "Términos de Uso",
    privacyPolicy: "Política de Privacidad",
    version: "FlintUp v1.0.0",
    copyright: "© 2024 FlintUp. Todos los derechos reservados.",
    editAccountData: "Editar perfil, redes sociales y datos",
    ageDistanceFilters: "Edad, distancia, género y filtros",
    controlVisibility: "Controla quién ve tu perfil",
    manageAlerts: "Gestiona alertas y sonidos",
    supportTerms: "Soporte, términos y privacidad",
    
    // Account Settings
    profilePhotos: "Fotos del Perfil",
    upTo6Photos: "Hasta 6 fotos",
    mainPhoto: "Foto Principal",
    addPhoto: "Añadir Foto",
    name: "Nombre",
    maxChars: "máximo 30 caracteres",
    bio: "Bio",
    bioPlaceholder: "Cuéntanos sobre ti...",
    gender: "Género",
    other: "Otro",
    specifyGender: "Especifica tu género",
    lookingFor: "Buscando",
    men: "Hombres",
    women: "Mujeres",
    everyone: "Todos",
    age: "Edad",
    cannotEdit: "No se puede editar por seguridad",
    location: "Ubicación",
    currentCity: "Ciudad Actual",
    updateLocation: "Actualizar Ubicación",
    interests: "Intereses",
    hobbies: "Hobbies",
    addHobby: "Añadir hobby",
    maxHobbies: "Máximo 5 hobbies",
    zodiacSign: "Signo Zodiacal",
    selectSign: "Selecciona tu signo",
    selectUpTo10: "Selecciona hasta 10",
    personalityCards: "Cartas de Personalidad",
    yourVibes: "Tus vibes - elige 3",
    romantic: "Romántico(a)",
    adventurous: "Aventurero(a)",
    creative: "Creativo(a)",
    chatty: "Conversador(a)",
    hardworking: "Trabajador(a)",
    homebody: "Hogareño(a)",
    extroverted: "Extrovertido(a)",
    introverted: "Introvertido(a)",
    verification: "Verificación",
    verifiedProfile: "Perfil Verificado",
    notVerified: "No Verificado",
    verifySelfie: "Verificar con selfie",
    saveChanges: "Guardar Cambios",
    
    // Preferences
    relationshipType: "Tipo de Relación",
    casual: "Casual",
    serious: "Serio",
    seeWhatHappens: "Ver qué pasa",
    favoriteInterests: "Intereses Favoritos",
    premiumFilters: "Filtros Premium",
    verifiedOnly: "Solo verificados",
    filterBySign: "Filtrar por signo",
    onlineOnly: "Mostrar solo quién está en línea",
    
    // Privacy
    blockUser: "Bloquear usuario",
    reportProfile: "Denunciar perfil",
    
    // Notifications
    minigameInvites: "Invitaciones de minijuegos",
    promotions: "Promociones",
    
    // Help
    faq: "FAQ",
    support: "Soporte",
    reportBug: "Reportar bug",
    
    // Match Modal
    itsASpark: "¡Es una Chispa!",
    feltConnection: "sintieron la conexión!",
  }
};

// Signos do zodíaco
const zodiacSigns = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
];

// Dados de exemplo dos perfis
const profiles = [
  {
    id: 1,
    name: "Ana Silva",
    age: 25,
    bio: "Amo viajar e conhecer novas culturas 🌍✈️",
    distance: "2 km de distância",
    images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop"],
    interests: ["Viagens", "Fotografia", "Yoga"],
    personality: ["Aventureira", "Criativa"]
  },
  {
    id: 2,
    name: "Beatriz Costa",
    age: 28,
    bio: "Apaixonada por música e arte 🎨🎵",
    distance: "5 km de distância",
    images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"],
    interests: ["Música", "Arte", "Cinema"],
    personality: ["Romântica", "Sonhadora"]
  },
  {
    id: 3,
    name: "Carolina Mendes",
    age: 26,
    bio: "Foodie e amante de café ☕🍕",
    distance: "3 km de distância",
    images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"],
    interests: ["Gastronomia", "Café", "Livros"],
    personality: ["Criativa", "Intelectual"]
  },
  {
    id: 4,
    name: "Diana Oliveira",
    age: 24,
    bio: "Aventureira e esportista 🏃‍♀️⛰️",
    distance: "7 km de distância",
    images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop"],
    interests: ["Esportes", "Natureza", "Aventura"],
    personality: ["Aventureira", "Energética"]
  },
  {
    id: 5,
    name: "Elena Santos",
    age: 27,
    bio: "Designer criativa e sonhadora 💭✨",
    distance: "4 km de distância",
    images: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop"],
    interests: ["Design", "Moda", "Tecnologia"],
    personality: ["Criativa", "Inovadora"]
  }
];

// Interesses disponíveis
const availableInterests = [
  "Música", "Viagens", "Fotografia", "Yoga", "Arte", "Cinema", "Gastronomia",
  "Café", "Livros", "Esportes", "Natureza", "Aventura", "Design", "Moda",
  "Tecnologia", "Pets", "Dança", "Culinária", "Games", "Séries"
];

// Cartas de personalidade disponíveis
const personalityTraits = [
  "romantic", "adventurous", "creative", "chatty", 
  "hardworking", "homebody", "extroverted", "introverted"
];

type View = "discover" | "matches" | "chat" | "profile" | "premium" | "settings";
type SettingsSection = "main" | "account" | "preferences" | "privacy" | "notifications" | "help" | "language";
type GenderPreference = "all" | "male" | "female";
type UserGender = "male" | "female" | "other";
type RelationType = "casual" | "serious" | "seeWhatHappens";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

export default function FlintUp() {
  const [currentView, setCurrentView] = useState<View>("discover");
  const [settingsSection, setSettingsSection] = useState<SettingsSection>("main");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<number[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [sparkPoints, setSparkPoints] = useState(150);
  const [swipesLeft, setSwipesLeft] = useState(30);
  const [isPremium, setIsPremium] = useState(false);

  // Chat states
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [minigameUsedToday, setMinigameUsedToday] = useState<Record<number, boolean>>({});
  const [showMinigame, setShowMinigame] = useState(false);
  const [minigameMatchId, setMinigameMatchId] = useState<number | null>(null);

  // Settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [messagesNotif, setMessagesNotif] = useState(true);
  const [matchesNotif, setMatchesNotif] = useState(true);
  const [minigameInvitesNotif, setMinigameInvitesNotif] = useState(true);
  const [promotionsNotif, setPromotionsNotif] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [invisibleMode, setInvisibleMode] = useState(false);

  // Preferences states
  const [ageRange, setAgeRange] = useState({ min: 18, max: 35 });
  const [maxDistance, setMaxDistance] = useState(50);
  const [genderPreference, setGenderPreference] = useState<GenderPreference>("all");
  const [relationType, setRelationType] = useState<RelationType>("seeWhatHappens");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filterBySign, setFilterBySign] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [language, setLanguage] = useState<Language>("pt");

  // Edit Profile states
  const [profilePhotos, setProfilePhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
  ]);
  const [profileName, setProfileName] = useState("João Silva");
  const [profileBio, setProfileBio] = useState("Apaixonado por tecnologia e aventuras! 🚀");
  const [userGender, setUserGender] = useState<UserGender>("male");
  const [customGender, setCustomGender] = useState("");
  const [lookingFor, setLookingFor] = useState<GenderPreference>("all");
  const [userAge] = useState(28);
  const [userCity, setUserCity] = useState("São Paulo, SP");
  const [userHobbies, setUserHobbies] = useState<string[]>(["Tecnologia", "Viagens", "Música"]);
  const [newHobby, setNewHobby] = useState("");
  const [zodiacSign, setZodiacSign] = useState("Leão");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Tecnologia", "Viagens", "Música"]);
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>(["creative", "adventurous", "extroverted"]);
  const [isVerified, setIsVerified] = useState(true);

  // Translation helper
  const t = translations[language];

  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;

  const handleLike = () => {
    if (!hasMoreProfiles || (!isPremium && swipesLeft <= 0)) return;
    
    if (!isPremium) setSwipesLeft(swipesLeft - 1);
    setSparkPoints(sparkPoints + 10);
    setMatches([...matches, currentProfile.id]);
    setShowMatch(true);
    
    setTimeout(() => {
      setShowMatch(false);
      setCurrentIndex(currentIndex + 1);
    }, 2000);
  };

  const handlePass = () => {
    if (!hasMoreProfiles || (!isPremium && swipesLeft <= 0)) return;
    if (!isPremium) setSwipesLeft(swipesLeft - 1);
    setCurrentIndex(currentIndex + 1);
  };

  const handleGameChallenge = () => {
    if (!hasMoreProfiles) return;
    alert("🎮 Minigame em breve! Jogue para descobrir afinidade antes do match.");
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim() || selectedChat === null) return;

    const newMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      sender: "me",
      timestamp: new Date()
    };

    setMessages({
      ...messages,
      [selectedChat]: [...(messages[selectedChat] || []), newMessage]
    });
    setCurrentMessage("");

    // Simular resposta automática
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "Obrigada pela mensagem! 😊",
        sender: "other",
        timestamp: new Date()
      };
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), autoReply]
      }));
    }, 2000);
  };

  const handlePlayMinigame = (matchId: number) => {
    if (!isPremium && minigameUsedToday[matchId]) {
      alert("🎮 Você já usou seu minigame hoje! Upgrade para Premium para jogar ilimitado.");
      return;
    }

    setMinigameMatchId(matchId);
    setShowMinigame(true);
    
    if (!isPremium) {
      setMinigameUsedToday({
        ...minigameUsedToday,
        [matchId]: true
      });
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragOffset.x > 100) {
      handleLike();
    } else if (dragOffset.x < -100) {
      handlePass();
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = isDragging ? dragOffset.x / 20 : 0;
  const opacity = isDragging ? 1 - Math.abs(dragOffset.x) / 300 : 1;

  const getGenderLabel = (gender: GenderPreference) => {
    if (gender === "all") return t.all;
    if (gender === "male") return t.male;
    if (gender === "female") return t.female;
    return t.all;
  };

  const getLanguageLabel = (lang: Language) => {
    if (lang === "pt") return t.portuguese;
    if (lang === "en") return t.english;
    if (lang === "es") return t.spanish;
    return t.portuguese;
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const togglePersonality = (trait: string) => {
    if (selectedPersonality.includes(trait)) {
      setSelectedPersonality(selectedPersonality.filter(t => t !== trait));
    } else if (selectedPersonality.length < 3) {
      setSelectedPersonality([...selectedPersonality, trait]);
    }
  };

  const getPersonalityLabel = (trait: string) => {
    const labels: Record<string, string> = {
      romantic: t.romantic,
      adventurous: t.adventurous,
      creative: t.creative,
      chatty: t.chatty,
      hardworking: t.hardworking,
      homebody: t.homebody,
      extroverted: t.extroverted,
      introverted: t.introverted
    };
    return labels[trait] || trait;
  };

  const addPhoto = () => {
    if (profilePhotos.length < 6) {
      alert("📸 Funcionalidade de adicionar foto será implementada com upload de imagem");
    }
  };

  const removePhoto = (index: number) => {
    if (profilePhotos.length > 1) {
      setProfilePhotos(profilePhotos.filter((_, i) => i !== index));
    }
  };

  const addHobby = () => {
    if (newHobby.trim() && userHobbies.length < 5) {
      setUserHobbies([...userHobbies, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const removeHobby = (index: number) => {
    setUserHobbies(userHobbies.filter((_, i) => i !== index));
  };

  const handleDownloadData = () => {
    alert("📥 Seus dados serão preparados e enviados para seu email em até 24 horas.");
  };

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      alert("👋 Até logo! Você foi desconectado.");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("⚠️ ATENÇÃO: Esta ação é irreversível. Deseja realmente excluir sua conta?")) {
      alert("🗑️ Sua conta foi excluída. Sentiremos sua falta!");
    }
  };

  // Minigame Modal
  if (showMinigame && minigameMatchId !== null) {
    const matchProfile = profiles.find(p => p.id === minigameMatchId);
    if (!matchProfile) return null;

    return (
      <MinigameHub
        matchId={minigameMatchId}
        matchName={matchProfile.name}
        isPremium={isPremium}
        onClose={() => {
          setShowMinigame(false);
          setMinigameMatchId(null);
        }}
        onSendMessage={() => {
          setShowMinigame(false);
          setMinigameMatchId(null);
          setSelectedChat(minigameMatchId);
          setCurrentView("matches");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-purple-500/20"
            onClick={() => {
              if (currentView === "chat" && selectedChat !== null) {
                setSelectedChat(null);
              } else if (currentView === "settings" && settingsSection !== "main") {
                setSettingsSection("main");
              } else {
                setCurrentView("profile");
              }
            }}
          >
            {(currentView === "chat" && selectedChat !== null) || (currentView === "settings" && settingsSection !== "main") ? (
              <ArrowLeft className="w-6 h-6" />
            ) : (
              <User className="w-6 h-6" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap className="w-8 h-8 text-purple-400 fill-purple-400 animate-pulse" />
              <Zap className="w-8 h-8 text-pink-500 fill-pink-500 absolute top-0 left-0 animate-ping opacity-50" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              {t.appName}
            </h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-purple-500/20"
            onClick={() => setCurrentView("premium")}
          >
            <Crown className="w-6 h-6 text-yellow-400" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 pb-24">
        {currentView === "discover" && (
          <>
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4 bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20 max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400 fill-purple-400" />
                <span className="text-white font-bold">{sparkPoints}</span>
                <span className="text-purple-300 text-sm">{t.sparks}</span>
              </div>
              {!isPremium && (
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-pink-500" />
                  <span className="text-white font-bold">{swipesLeft}/30</span>
                  <span className="text-pink-300 text-sm">{t.swipes}</span>
                </div>
              )}
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setCurrentView("premium")}
              >
                {isPremium ? `${t.premium} ✨` : t.upgrade}
              </Button>
            </div>

            {/* Card Stack */}
            <div className="relative h-[600px] mb-6 max-w-md mx-auto">
              {!hasMoreProfiles || (!isPremium && swipesLeft <= 0) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/30">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {!isPremium && swipesLeft <= 0 ? t.swipesOut : t.sawAll}
                  </h2>
                  <p className="text-purple-200 mb-6">
                    {!isPremium && swipesLeft <= 0 ? t.comeBackTomorrow : t.comeBackLater}
                  </p>
                  <Button 
                    onClick={() => {
                      setCurrentIndex(0);
                      if (!isPremium) setSwipesLeft(30);
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {!isPremium && swipesLeft <= 0 ? t.seePremium : t.restart}
                  </Button>
                </div>
              ) : (
                <>
                  {/* Next Card (background) */}
                  {currentIndex + 1 < profiles.length && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl shadow-xl scale-95 opacity-50 border border-purple-500/20" />
                  )}

                  {/* Current Card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing transition-all border border-purple-500/30"
                    style={{
                      transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
                      opacity: opacity,
                      transition: isDragging ? 'none' : 'all 0.3s ease-out'
                    }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    {/* Image */}
                    <div className="relative h-[450px]">
                      <img
                        src={currentProfile.images[0]}
                        alt={currentProfile.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Like/Nope Indicators */}
                      {isDragging && (
                        <>
                          {dragOffset.x > 50 && (
                            <div className="absolute top-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold text-2xl rotate-12 border-4 border-purple-400 shadow-2xl">
                              FAÍSCA ⚡
                            </div>
                          )}
                          {dragOffset.x < -50 && (
                            <div className="absolute top-8 left-8 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-lg font-bold text-2xl -rotate-12 border-4 border-gray-600 shadow-2xl">
                              PASSAR
                            </div>
                          )}
                        </>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Profile Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <h2 className="text-3xl font-bold mb-1 flex items-center gap-2">
                            {currentProfile.name}, {currentProfile.age}
                            <Badge className="bg-purple-500/80 text-white border-purple-400">
                              <Zap className="w-3 h-3 mr-1" />
                              {t.verified}
                            </Badge>
                          </h2>
                          <p className="text-sm text-purple-200">{currentProfile.distance}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/90 mb-3 text-sm leading-relaxed">
                        {currentProfile.bio}
                      </p>

                      {/* Personality Cards */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {currentProfile.personality.map((trait, idx) => (
                          <Badge 
                            key={`personality-${currentProfile.id}-${idx}`}
                            className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white border border-purple-400/50"
                          >
                            ✨ {trait}
                          </Badge>
                        ))}
                      </div>

                      {/* Interests */}
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.interests.map((interest, idx) => (
                          <Badge 
                            key={`interest-${currentProfile.id}-${idx}`}
                            variant="secondary" 
                            className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            {hasMoreProfiles && (isPremium || swipesLeft > 0) && (
              <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                <Button
                  onClick={handlePass}
                  size="icon"
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-gray-600"
                >
                  <X className="w-8 h-8" />
                </Button>

                <Button
                  onClick={handleGameChallenge}
                  size="icon"
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-blue-400"
                >
                  <Zap className="w-6 h-6" />
                </Button>

                <Button
                  onClick={handleLike}
                  size="icon"
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-purple-400"
                >
                  <Heart className="w-8 h-8 fill-current" />
                </Button>
              </div>
            )}
          </>
        )}

        {currentView === "matches" && selectedChat === null && (
          <div className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">{t.yourMatches} ⚡</h2>
            {matches.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl border border-purple-500/30">
                <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-200">{t.noMatches}</p>
              </div>
            ) : (
              matches.map((matchId) => {
                const matchProfile = profiles.find(p => p.id === matchId);
                if (!matchProfile) return null;
                
                const canPlayMinigame = isPremium || !minigameUsedToday[matchId];
                
                return (
                  <div key={`match-${matchId}`} className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30">
                    <div className="flex items-center gap-4 mb-3">
                      <Avatar className="w-16 h-16 border-2 border-purple-400">
                        <AvatarImage src={matchProfile.images[0]} />
                        <AvatarFallback>{matchProfile.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{matchProfile.name}, {matchProfile.age}</h3>
                        <p className="text-purple-300 text-sm flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          {t.online}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                        onClick={() => {
                          setSelectedChat(matchId);
                          setCurrentView("matches");
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t.sendMessage}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className={`w-full ${
                          canPlayMinigame 
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" 
                            : "bg-gray-700 cursor-not-allowed"
                        }`}
                        onClick={() => handlePlayMinigame(matchId)}
                        disabled={!canPlayMinigame}
                      >
                        <Gamepad2 className="w-4 h-4 mr-2" />
                        {t.playMinigame}
                      </Button>
                    </div>
                    
                    <div className="mt-2 text-center">
                      <p className="text-xs text-purple-300">
                        {isPremium ? (
                          <span className="flex items-center justify-center gap-1">
                            <Crown className="w-3 h-3 text-yellow-400" />
                            {t.minigameUnlimited}
                          </span>
                        ) : minigameUsedToday[matchId] ? (
                          <span className="text-gray-400">{t.minigameUsedToday}</span>
                        ) : (
                          t.minigameLimit
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {currentView === "matches" && selectedChat !== null && (
          <div className="max-w-2xl mx-auto h-[calc(100vh-200px)] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-t-3xl p-4 border border-purple-500/30 border-b-0">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-purple-400">
                  <AvatarImage src={profiles.find(p => p.id === selectedChat)?.images[0]} />
                  <AvatarFallback>{profiles.find(p => p.id === selectedChat)?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-white font-bold">
                    {profiles.find(p => p.id === selectedChat)?.name}
                  </h3>
                  <p className="text-purple-300 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    {t.online}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                  onClick={() => handlePlayMinigame(selectedChat)}
                >
                  <Gamepad2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm p-4 overflow-y-auto border-x border-purple-500/30">
              <div className="space-y-4">
                {(messages[selectedChat] || []).map((msg) => (
                  <div
                    key={`msg-${msg.id}`}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sender === "me"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-white/10 backdrop-blur-sm text-white border border-purple-400/30"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString(language, { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-b-3xl p-4 border border-purple-500/30 border-t-0">
              <div className="flex items-center gap-2">
                {isPremium && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                  </>
                )}
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.typeMessage}
                  className="flex-1 bg-black/30 border-purple-400/40 text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 rounded-xl"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              {!isPremium && (
                <p className="text-xs text-purple-300 mt-2 text-center">
                  Upgrade para Premium para enviar áudio e imagens
                </p>
              )}
            </div>
          </div>
        )}

        {currentView === "profile" && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30 text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-purple-400">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" />
                <AvatarFallback>Você</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-white mb-2">{t.yourProfile}</h2>
              <p className="text-purple-300 mb-4">{t.completeProfile}</p>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sparkPoints}</div>
                  <div className="text-purple-300 text-sm">{t.sparks}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{matches.length}</div>
                  <div className="text-purple-300 text-sm">{t.matches}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">85%</div>
                  <div className="text-purple-300 text-sm">{t.affinity}</div>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => {
                setCurrentView("settings");
                setSettingsSection("main");
              }}
            >
              <Settings className="w-4 h-4 mr-2" />
              {t.settings}
            </Button>
          </div>
        )}

        {currentView === "premium" && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 animate-pulse">
                <Zap className="w-10 h-10 text-white fill-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                {t.choosePlan}
              </h1>
              <p className="text-purple-200 text-lg">
                {t.startFree}
              </p>
            </div>

            {/* Plans Comparison */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Plano Básico */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-600/50 hover:border-gray-500/70 transition-all">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
                    <Star className="w-8 h-8 text-gray-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{t.basic}</h2>
                  <p className="text-gray-300 text-sm mb-4">{t.everyoneStarts}</p>
                  <div className="text-5xl font-bold text-white mb-2">{t.free}</div>
                  <p className="text-gray-400 text-sm">{t.forever}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t.createProfile}</p>
                      <p className="text-gray-400 text-sm">{t.fullProfile}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t.likesPerDay}</p>
                      <p className="text-gray-400 text-sm">{t.renewsDaily}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t.chatMatches}</p>
                      <p className="text-gray-400 text-sm">{t.unlimitedChat}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t.basicFilters}</p>
                      <p className="text-gray-400 text-sm">{t.ageDistanceGender}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{t.minigameDemo}</p>
                      <p className="text-gray-400 text-sm">1x por dia</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-6 text-lg font-bold rounded-2xl"
                  disabled
                >
                  {t.currentPlan}
                </Button>
              </div>

              {/* Plano Premium */}
              <div className="bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-purple-600/30 backdrop-blur-sm rounded-3xl p-8 border-4 border-purple-400 hover:border-pink-400 transition-all relative overflow-hidden shadow-2xl shadow-purple-500/50">
                {/* Badge "Mais Popular" */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  ⚡ {t.mostPopular}
                </div>

                {/* Efeito de brilho animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                <div className="text-center mb-6 relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 animate-pulse">
                    <Crown className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{t.premium}</h2>
                  <p className="text-purple-200 text-sm mb-4">{t.fullExperience}</p>
                  <div className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-2">
                    $5
                  </div>
                  <p className="text-purple-200 text-lg font-medium mb-1">{t.perMonth}</p>
                  <p className="text-purple-300 text-sm">€4,50 • R$28,00</p>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  {[
                    { title: t.unlimitedLikes, desc: t.noDailyLimit },
                    { title: t.allMinigames, desc: t.playUnlimited },
                    { title: t.seeWhoLiked, desc: t.seeAdmirers },
                    { title: t.unlimitedRewind, desc: t.undoDecisions },
                    { title: t.weeklyBoost, desc: t.featuredWeekly },
                    { title: t.audioImageChat, desc: t.fullCommunication },
                    { title: t.seeAffinity, desc: t.exactCompatibility },
                    { title: t.featuredProfile, desc: t.moreFeedVisibility }
                  ].map((feature, idx) => (
                    <div key={`premium-feature-${idx}`} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{feature.title}</p>
                        <p className="text-purple-200 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-black font-bold text-lg py-7 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105 relative z-10"
                  onClick={() => {
                    setIsPremium(true);
                    setCurrentView("discover");
                    alert("🎉 Bem-vindo ao Premium! Todos os recursos desbloqueados.");
                  }}
                >
                  <Crown className="w-6 h-6 mr-2" />
                  {t.subscribePremium} $5/mês
                </Button>

                <p className="text-center text-purple-200 text-xs mt-4 relative z-10">
                  {t.cancelAnytime}
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="text-white font-medium text-sm">{t.securePayment}</p>
                  <p className="text-purple-300 text-xs">{t.sslEncryption}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-white font-medium text-sm">{t.instantActivation}</p>
                  <p className="text-purple-300 text-xs">{t.afterPayment}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <p className="text-white font-medium text-sm">{t.cancelWhenever}</p>
                  <p className="text-purple-300 text-xs">{t.noCommitment}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "settings" && (
          <div className="max-w-2xl mx-auto">
            {settingsSection === "main" && (
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">{t.settings}</h1>

                {/* Settings Blocks */}
                <div className="grid gap-4">
                  {[
                    { section: "account", icon: UserCircle, color: "from-purple-500 to-pink-500", title: t.account, desc: t.editAccountData },
                    { section: "preferences", icon: Settings, color: "from-blue-500 to-cyan-500", title: t.preferences, desc: t.ageDistanceFilters },
                    { section: "privacy", icon: Lock, color: "from-green-500 to-emerald-500", title: t.privacy, desc: t.controlVisibility },
                    { section: "notifications", icon: Bell, color: "from-orange-500 to-red-500", title: t.notifications, desc: t.manageAlerts },
                    { section: "help", icon: HelpCircle, color: "from-yellow-500 to-amber-500", title: t.help, desc: t.supportTerms },
                    { section: "language", icon: Globe, color: "from-indigo-500 to-purple-500", title: t.language, desc: getLanguageLabel(language) }
                  ].map((item, idx) => (
                    <button
                      key={`settings-${idx}`}
                      onClick={() => setSettingsSection(item.section as SettingsSection)}
                      className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-purple-300 text-sm">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ACCOUNT SECTION */}
            {settingsSection === "account" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">{t.account}</h2>

                {/* Profile Photos */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.profilePhotos}</Label>
                  <p className="text-purple-300 text-sm mb-4">{t.upTo6Photos}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {profilePhotos.map((photo, idx) => (
                      <div key={`photo-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-purple-400">
                        <img src={photo} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <Badge className="absolute top-2 left-2 bg-purple-500">{t.mainPhoto}</Badge>
                        )}
                        {profilePhotos.length > 1 && (
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 w-8 h-8"
                            onClick={() => removePhoto(idx)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    {profilePhotos.length < 6 && (
                      <button
                        onClick={addPhoto}
                        className="aspect-square rounded-xl border-2 border-dashed border-purple-400 hover:border-purple-300 transition-colors flex flex-col items-center justify-center gap-2 bg-purple-900/20"
                      >
                        <Plus className="w-8 h-8 text-purple-400" />
                        <span className="text-purple-300 text-sm">{t.addPhoto}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label htmlFor="name" className="text-white font-bold mb-2 block">{t.name}</Label>
                  <Input
                    id="name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    maxLength={30}
                    className="bg-black/30 border-purple-400/40 text-white placeholder:text-purple-300/60"
                  />
                  <p className="text-purple-300 text-xs mt-2">{t.maxChars}</p>
                </div>

                {/* Bio */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label htmlFor="bio" className="text-white font-bold mb-2 block">{t.bio}</Label>
                  <Textarea
                    id="bio"
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    placeholder={t.bioPlaceholder}
                    rows={4}
                    className="bg-black/30 border-purple-400/40 text-white placeholder:text-purple-300/60 resize-none"
                  />
                </div>

                {/* Gender */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.gender}</Label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {([["male", t.male], ["female", t.female], ["other", t.other]] as [UserGender, string][]).map(([gender, label]) => (
                      <Button
                        key={gender}
                        variant={userGender === gender ? "default" : "outline"}
                        className={userGender === gender ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "border-purple-400/40 text-white hover:bg-purple-500/20"}
                        onClick={() => setUserGender(gender)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  
                  {userGender === "other" && (
                    <Input
                      value={customGender}
                      onChange={(e) => setCustomGender(e.target.value)}
                      placeholder={t.specifyGender}
                      className="bg-black/30 border-purple-400/40 text-white placeholder:text-purple-300/60"
                    />
                  )}
                </div>

                {/* Looking For */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.lookingFor}</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {([["male", t.men], ["female", t.women], ["all", t.everyone]] as [GenderPreference, string][]).map(([pref, label]) => (
                      <Button
                        key={pref}
                        variant={lookingFor === pref ? "default" : "outline"}
                        className={lookingFor === pref ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "border-purple-400/40 text-white hover:bg-purple-500/20"}
                        onClick={() => setLookingFor(pref)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label htmlFor="city" className="text-white font-bold mb-2 block">{t.location}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="city"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      placeholder={t.currentCity}
                      className="bg-black/30 border-purple-400/40 text-white placeholder:text-purple-300/60 flex-1"
                    />
                    <Button variant="outline" className="border-purple-400/40 text-white hover:bg-purple-500/20">
                      <MapPin className="w-4 h-4 mr-2" />
                      {t.updateLocation}
                    </Button>
                  </div>
                </div>

                {/* Hobbies */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-2 block">{t.hobbies}</Label>
                  <p className="text-purple-300 text-sm mb-4">{t.maxHobbies}</p>
                  
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newHobby}
                      onChange={(e) => setNewHobby(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addHobby()}
                      placeholder={t.addHobby}
                      disabled={userHobbies.length >= 5}
                      className="bg-black/30 border-purple-400/40 text-white placeholder:text-purple-300/60 flex-1"
                    />
                    <Button
                      onClick={addHobby}
                      disabled={userHobbies.length >= 5 || !newHobby.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {userHobbies.map((hobby, idx) => (
                      <Badge
                        key={`hobby-${idx}`}
                        className="bg-purple-500/30 text-white border border-purple-400 pr-1"
                      >
                        {hobby}
                        <button
                          onClick={() => removeHobby(idx)}
                          className="ml-2 hover:bg-purple-600 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Zodiac Sign */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.zodiacSign}</Label>
                  <Select value={zodiacSign} onValueChange={setZodiacSign}>
                    <SelectTrigger className="bg-black/30 border-purple-400/40 text-white">
                      <SelectValue placeholder={t.selectSign} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-purple-400/40">
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign} value={sign} className="text-white hover:bg-purple-500/20">
                          {sign}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Verification */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label className="text-white font-bold block">{t.verification}</Label>
                      <p className="text-purple-300 text-sm mt-1">
                        {isVerified ? t.verifiedProfile : t.notVerified}
                      </p>
                    </div>
                    {isVerified ? (
                      <Badge className="bg-green-500">
                        <Check className="w-4 h-4 mr-1" />
                        {t.verified}
                      </Badge>
                    ) : (
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Camera className="w-4 h-4 mr-2" />
                        {t.verifySelfie}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleDownloadData}
                    variant="outline"
                    className="w-full border-purple-400/40 text-white hover:bg-purple-500/20"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t.downloadData}
                  </Button>
                  
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-purple-400/40 text-white hover:bg-purple-500/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.logout}
                  </Button>
                  
                  <Button
                    onClick={handleDeleteAccount}
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t.deleteAccount}
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    alert("✅ Alterações salvas com sucesso!");
                    setSettingsSection("main");
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg font-bold"
                >
                  {t.saveChanges}
                </Button>
              </div>
            )}

            {/* PREFERENCES SECTION */}
            {settingsSection === "preferences" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">{t.preferences}</h2>

                {/* Distance */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">
                    {t.maxDistance}: {maxDistance} km
                  </Label>
                  <Slider
                    value={[maxDistance]}
                    onValueChange={(value) => setMaxDistance(value[0])}
                    min={1}
                    max={3000}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-purple-300 text-xs">
                    <span>1 km</span>
                    <span>3.000 km</span>
                  </div>
                </div>

                {/* Age Range */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">
                    {t.ageRange}: {ageRange.min} - {ageRange.max} {t.years}
                  </Label>
                  <Slider
                    value={[ageRange.min, ageRange.max]}
                    onValueChange={(value) => setAgeRange({ min: value[0], max: value[1] })}
                    min={18}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-purple-300 text-xs">
                    <span>18</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Gender Preference */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.genderInterest}</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {([["male", t.male], ["female", t.female], ["all", t.all]] as [GenderPreference, string][]).map(([pref, label]) => (
                      <Button
                        key={pref}
                        variant={genderPreference === pref ? "default" : "outline"}
                        className={genderPreference === pref ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "border-purple-400/40 text-white hover:bg-purple-500/20"}
                        onClick={() => setGenderPreference(pref)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Relationship Type */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.relationshipType}</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {([["casual", t.casual], ["serious", t.serious], ["seeWhatHappens", t.seeWhatHappens]] as [RelationType, string][]).map(([type, label]) => (
                      <Button
                        key={type}
                        variant={relationType === type ? "default" : "outline"}
                        className={relationType === type ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "border-purple-400/40 text-white hover:bg-purple-500/20"}
                        onClick={() => setRelationType(type)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Favorite Interests */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <Label className="text-white font-bold mb-4 block">{t.favoriteInterests}</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map((interest) => (
                      <Badge
                        key={interest}
                        className={`cursor-pointer ${
                          selectedInterests.includes(interest)
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-purple-900/30 text-purple-300 border-purple-400/40"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Premium Filters */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-white font-bold">{t.premiumFilters}</Label>
                    {!isPremium && (
                      <Badge className="bg-yellow-500 text-black">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">{t.verifiedOnly}</Label>
                      <Switch
                        checked={verifiedOnly}
                        onCheckedChange={setVerifiedOnly}
                        disabled={!isPremium}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-white">{t.filterBySign}</Label>
                      <Switch
                        checked={filterBySign}
                        onCheckedChange={setFilterBySign}
                        disabled={!isPremium}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-white">{t.onlineOnly}</Label>
                      <Switch
                        checked={onlineOnly}
                        onCheckedChange={setOnlineOnly}
                        disabled={!isPremium}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    alert("✅ Preferências salvas com sucesso!");
                    setSettingsSection("main");
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg font-bold"
                >
                  {t.saveChanges}
                </Button>
              </div>
            )}

            {/* PRIVACY SECTION */}
            {settingsSection === "privacy" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">{t.privacy}</h2>

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white font-bold block">{t.showDistance}</Label>
                      <p className="text-purple-300 text-sm">{t.showLocation}</p>
                    </div>
                    <Switch
                      checked={showDistance}
                      onCheckedChange={setShowDistance}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white font-bold block">{t.onlineStatus}</Label>
                      <p className="text-purple-300 text-sm">{t.showActive}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isPremium && (
                        <Badge className="bg-yellow-500 text-black">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      <Switch
                        checked={showOnline}
                        onCheckedChange={setShowOnline}
                        disabled={!isPremium}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white font-bold block">{t.invisibleMode}</Label>
                      <p className="text-purple-300 text-sm">{t.browseUnseen}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isPremium && (
                        <Badge className="bg-yellow-500 text-black">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      <Switch
                        checked={invisibleMode}
                        onCheckedChange={setInvisibleMode}
                        disabled={!isPremium}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-400/30">
                    <Label className="text-white font-bold block mb-4">{t.verification}</Label>
                    {isVerified ? (
                      <div className="flex items-center gap-3 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                        <Check className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="text-white font-medium">{t.verifiedProfile}</p>
                          <p className="text-green-300 text-sm">Seu perfil está verificado</p>
                        </div>
                      </div>
                    ) : (
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Camera className="w-4 h-4 mr-2" />
                        {t.verifySelfie}
                      </Button>
                    )}
                  </div>

                  <div className="pt-4 border-t border-purple-400/30 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-purple-400/40 text-white hover:bg-purple-500/20"
                      onClick={() => alert("🚫 Funcionalidade de bloquear usuário em desenvolvimento")}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {t.blockUser}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-red-400/40 text-red-300 hover:bg-red-500/20"
                      onClick={() => alert("⚠️ Funcionalidade de denunciar perfil em desenvolvimento")}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {t.reportProfile}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    alert("✅ Configurações de privacidade salvas!");
                    setSettingsSection("main");
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg font-bold"
                >
                  {t.saveChanges}
                </Button>
              </div>
            )}

            {/* NOTIFICATIONS SECTION */}
            {settingsSection === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">{t.notifications}</h2>

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white font-bold block">{t.pushNotifications}</Label>
                      <p className="text-purple-300 text-sm">{t.receiveAlerts}</p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>

                  {notificationsEnabled && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white font-bold block">{t.newMessages}</Label>
                          <p className="text-purple-300 text-sm">{t.chatAlerts}</p>
                        </div>
                        <Switch
                          checked={messagesNotif}
                          onCheckedChange={setMessagesNotif}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white font-bold block">{t.newMatches}</Label>
                          <p className="text-purple-300 text-sm">{t.likeBack}</p>
                        </div>
                        <Switch
                          checked={matchesNotif}
                          onCheckedChange={setMatchesNotif}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white font-bold block">{t.minigameInvites}</Label>
                          <p className="text-purple-300 text-sm">Convites para jogar</p>
                        </div>
                        <Switch
                          checked={minigameInvitesNotif}
                          onCheckedChange={setMinigameInvitesNotif}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white font-bold block">{t.promotions}</Label>
                          <p className="text-purple-300 text-sm">Ofertas e novidades</p>
                        </div>
                        <Switch
                          checked={promotionsNotif}
                          onCheckedChange={setPromotionsNotif}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white font-bold block">{t.sounds}</Label>
                          <p className="text-purple-300 text-sm">{t.appSounds}</p>
                        </div>
                        <Switch
                          checked={soundEnabled}
                          onCheckedChange={setSoundEnabled}
                        />
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={() => {
                    alert("✅ Configurações de notificações salvas!");
                    setSettingsSection("main");
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg font-bold"
                >
                  {t.saveChanges}
                </Button>
              </div>
            )}

            {/* HELP SECTION */}
            {settingsSection === "help" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">{t.help}</h2>

                <button
                  onClick={() => alert("📖 FAQ em desenvolvimento")}
                  className="w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <HelpCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{t.faq}</h3>
                      <p className="text-purple-300 text-sm">Perguntas frequentes</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => alert("💬 Suporte em desenvolvimento")}
                  className="w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{t.support}</h3>
                      <p className="text-purple-300 text-sm">Fale com nossa equipe</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => alert("🐛 Reportar bug em desenvolvimento")}
                  className="w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{t.reportBug}</h3>
                      <p className="text-purple-300 text-sm">Encontrou algum problema?</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => alert("📄 Termos de uso em desenvolvimento")}
                  className="w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{t.termsOfUse}</h3>
                      <p className="text-purple-300 text-sm">Leia nossos termos</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => alert("🔒 Política de privacidade em desenvolvimento")}
                  className="w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lock className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{t.privacyPolicy}</h3>
                      <p className="text-purple-300 text-sm">Como protegemos seus dados</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <div className="text-center pt-6 text-purple-300 text-sm">
                  <p>{t.version}</p>
                  <p className="mt-1">{t.copyright}</p>
                </div>
              </div>
            )}

            {/* LANGUAGE SECTION */}
            {settingsSection === "language" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">{t.language}</h2>

                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 space-y-4">
                  {([["pt", t.portuguese], ["en", t.english], ["es", t.spanish]] as [Language, string][]).map(([lang, label]) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        language === lang
                          ? "border-purple-400 bg-purple-500/20"
                          : "border-purple-400/30 hover:border-purple-400/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-6 h-6 text-purple-400" />
                          <span className="text-white font-bold text-lg">
                            {label}
                          </span>
                        </div>
                        {language === lang && (
                          <Check className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                  <p className="text-blue-200 text-sm">
                    ℹ️ Ao trocar o idioma, todo o app será traduzido automaticamente, incluindo textos, botões, minigames e notificações.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    alert("✅ Idioma alterado com sucesso!");
                    setSettingsSection("main");
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-6 text-lg font-bold"
                >
                  {t.saveChanges}
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-purple-500/20">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-around">
          <Button 
            variant="ghost" 
            size="icon" 
            className={currentView === "discover" ? "text-purple-400" : "text-gray-400"}
            onClick={() => setCurrentView("discover")}
          >
            <Flame className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={currentView === "matches" ? "text-purple-400" : "text-gray-400"}
            onClick={() => {
              setCurrentView("matches");
              setSelectedChat(null);
            }}
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              {matches.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {matches.length}
                </span>
              )}
            </div>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400"
          >
            <Trophy className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={currentView === "profile" ? "text-purple-400" : "text-gray-400"}
            onClick={() => setCurrentView("profile")}
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Match Modal */}
      {showMatch && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="text-center">
            <div className="relative mb-6">
              <Zap className="w-32 h-32 text-yellow-300 fill-yellow-300 mx-auto animate-pulse" />
              <Zap className="w-32 h-32 text-white fill-white absolute top-0 left-1/2 -translate-x-1/2 animate-ping" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-4 animate-in zoom-in duration-500">
              {t.itsASpark} ⚡
            </h2>
            <p className="text-white text-xl mb-8">
              {currentProfile.name} {t.feltConnection}
            </p>
            <div className="flex items-center justify-center gap-8 mb-8">
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                <AvatarImage src={currentProfile.images[0]} />
                <AvatarFallback>{currentProfile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-6xl animate-bounce">⚡</div>
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" />
                <AvatarFallback>Você</AvatarFallback>
              </Avatar>
            </div>
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8"
              onClick={() => {
                setShowMatch(false);
                setCurrentView("matches");
                setSelectedChat(currentProfile.id);
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t.sendMessage}
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}
