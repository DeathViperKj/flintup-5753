import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  custom_gender?: string;
  looking_for: 'male' | 'female' | 'all';
  city: string;
  latitude?: number;
  longitude?: number;
  zodiac_sign: string;
  is_verified: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: string;
  profile_id: string;
  url: string;
  order: number;
  is_main: boolean;
  created_at: string;
}

export interface Hobby {
  id: string;
  profile_id: string;
  name: string;
  created_at: string;
}

export interface Interest {
  id: string;
  profile_id: string;
  name: string;
  created_at: string;
}

export interface PersonalityTrait {
  id: string;
  profile_id: string;
  trait: string;
  created_at: string;
}

export interface Preference {
  id: string;
  profile_id: string;
  min_age: number;
  max_age: number;
  max_distance: number;
  gender_preference: 'male' | 'female' | 'all';
  relationship_type: 'casual' | 'serious' | 'seeWhatHappens';
  verified_only: boolean;
  filter_by_sign: boolean;
  online_only: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  profile_id: string;
  show_distance: boolean;
  show_online: boolean;
  invisible_mode: boolean;
  notifications_enabled: boolean;
  messages_notif: boolean;
  matches_notif: boolean;
  minigame_invites_notif: boolean;
  promotions_notif: boolean;
  sound_enabled: boolean;
  language: 'pt' | 'en' | 'es';
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  profile1_id: string;
  profile2_id: string;
  created_at: string;
}

export interface Like {
  id: string;
  from_profile_id: string;
  to_profile_id: string;
  created_at: string;
}

export interface Chat {
  id: string;
  match_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_profile_id: string;
  content: string;
  type: 'text' | 'image' | 'audio';
  media_url?: string;
  created_at: string;
  read_at?: string;
}

export interface MinigameResult {
  id: string;
  match_id: string;
  game_type: string;
  player1_id: string;
  player2_id: string;
  player1_score: number;
  player2_score: number;
  winner_id?: string;
  affinity_score: number;
  created_at: string;
}

export interface BlockedUser {
  id: string;
  blocker_profile_id: string;
  blocked_profile_id: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_profile_id: string;
  reported_profile_id: string;
  reason: string;
  description?: string;
  created_at: string;
}
