import { supabase } from './supabase';
import type { Profile, Preference, Settings, Match, Message } from './supabase';

// ============================================
// AUTHENTICATION
// ============================================

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// ============================================
// PROFILE MANAGEMENT
// ============================================

export const createProfile = async (profileData: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .single();
  return { data, error };
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      photos (*),
      hobbies (*),
      interests (*),
      personality_traits (*)
    `)
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const getProfileById = async (profileId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      photos (*),
      hobbies (*),
      interests (*),
      personality_traits (*)
    `)
    .eq('id', profileId)
    .single();
  return { data, error };
};

export const updateProfile = async (profileId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()
    .single();
  return { data, error };
};

export const deleteProfile = async (profileId: string) => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', profileId);
  return { error };
};

// ============================================
// PHOTOS
// ============================================

export const uploadPhoto = async (profileId: string, file: File, order: number, isMain: boolean = false) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${profileId}/${Date.now()}.${fileExt}`;
  
  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('profile-photos')
    .upload(fileName, file);

  if (uploadError) return { data: null, error: uploadError };

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('profile-photos')
    .getPublicUrl(fileName);

  // Save to database
  const { data, error } = await supabase
    .from('photos')
    .insert([{
      profile_id: profileId,
      url: publicUrl,
      order,
      is_main: isMain
    }])
    .select()
    .single();

  return { data, error };
};

export const deletePhoto = async (photoId: string) => {
  const { error } = await supabase
    .from('photos')
    .delete()
    .eq('id', photoId);
  return { error };
};

// ============================================
// HOBBIES & INTERESTS
// ============================================

export const addHobby = async (profileId: string, hobbyName: string) => {
  const { data, error } = await supabase
    .from('hobbies')
    .insert([{ profile_id: profileId, name: hobbyName }])
    .select()
    .single();
  return { data, error };
};

export const removeHobby = async (hobbyId: string) => {
  const { error } = await supabase
    .from('hobbies')
    .delete()
    .eq('id', hobbyId);
  return { error };
};

export const addInterest = async (profileId: string, interestName: string) => {
  const { data, error } = await supabase
    .from('interests')
    .insert([{ profile_id: profileId, name: interestName }])
    .select()
    .single();
  return { data, error };
};

export const removeInterest = async (interestId: string) => {
  const { error } = await supabase
    .from('interests')
    .delete()
    .eq('id', interestId);
  return { error };
};

// ============================================
// PERSONALITY TRAITS
// ============================================

export const setPersonalityTraits = async (profileId: string, traits: string[]) => {
  // Remove existing traits
  await supabase
    .from('personality_traits')
    .delete()
    .eq('profile_id', profileId);

  // Add new traits
  const { data, error } = await supabase
    .from('personality_traits')
    .insert(traits.map(trait => ({ profile_id: profileId, trait })))
    .select();
  
  return { data, error };
};

// ============================================
// PREFERENCES
// ============================================

export const getPreferences = async (profileId: string) => {
  const { data, error } = await supabase
    .from('preferences')
    .select('*')
    .eq('profile_id', profileId)
    .single();
  return { data, error };
};

export const updatePreferences = async (profileId: string, preferences: Partial<Preference>) => {
  const { data, error } = await supabase
    .from('preferences')
    .upsert({ profile_id: profileId, ...preferences })
    .select()
    .single();
  return { data, error };
};

// ============================================
// SETTINGS
// ============================================

export const getSettings = async (profileId: string) => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('profile_id', profileId)
    .single();
  return { data, error };
};

export const updateSettings = async (profileId: string, settings: Partial<Settings>) => {
  const { data, error } = await supabase
    .from('settings')
    .upsert({ profile_id: profileId, ...settings })
    .select()
    .single();
  return { data, error };
};

// ============================================
// DISCOVERY & MATCHING
// ============================================

export const getDiscoverProfiles = async (
  currentProfileId: string,
  preferences: Preference,
  limit: number = 10
) => {
  // Get current profile location
  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('latitude, longitude')
    .eq('id', currentProfileId)
    .single();

  if (!currentProfile?.latitude || !currentProfile?.longitude) {
    return { data: null, error: new Error('Location not set') };
  }

  // Build query based on preferences
  let query = supabase
    .from('profiles')
    .select(`
      *,
      photos (*),
      hobbies (*),
      interests (*),
      personality_traits (*)
    `)
    .neq('id', currentProfileId)
    .gte('age', preferences.min_age)
    .lte('age', preferences.max_age);

  // Gender filter
  if (preferences.gender_preference !== 'all') {
    query = query.eq('gender', preferences.gender_preference);
  }

  // Verified only filter (Premium)
  if (preferences.verified_only) {
    query = query.eq('is_verified', true);
  }

  // Online only filter (Premium)
  if (preferences.online_only) {
    // This would require a last_active timestamp
    // query = query.gte('last_active', new Date(Date.now() - 5 * 60 * 1000).toISOString());
  }

  const { data, error } = await query.limit(limit);

  // Filter by distance (client-side for now, can be optimized with PostGIS)
  if (data) {
    const filteredData = data.filter(profile => {
      if (!profile.latitude || !profile.longitude) return false;
      const distance = calculateDistance(
        currentProfile.latitude,
        currentProfile.longitude,
        profile.latitude,
        profile.longitude
      );
      return distance <= preferences.max_distance;
    });
    return { data: filteredData, error: null };
  }

  return { data, error };
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// ============================================
// LIKES & MATCHES
// ============================================

export const likeProfile = async (fromProfileId: string, toProfileId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .insert([{ from_profile_id: fromProfileId, to_profile_id: toProfileId }])
    .select()
    .single();
  return { data, error };
};

export const getMatches = async (profileId: string) => {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      profile1:profiles!matches_profile1_id_fkey(*, photos(*)),
      profile2:profiles!matches_profile2_id_fkey(*, photos(*))
    `)
    .or(`profile1_id.eq.${profileId},profile2_id.eq.${profileId}`);

  return { data, error };
};

export const checkMatch = async (profile1Id: string, profile2Id: string) => {
  const [id1, id2] = [profile1Id, profile2Id].sort();
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('profile1_id', id1)
    .eq('profile2_id', id2)
    .single();
  return { data, error };
};

// ============================================
// CHAT & MESSAGES
// ============================================

export const getChat = async (matchId: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('match_id', matchId)
    .single();
  return { data, error };
};

export const getMessages = async (chatId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });
  return { data, error };
};

export const sendMessage = async (
  chatId: string,
  senderProfileId: string,
  content: string,
  type: 'text' | 'image' | 'audio' = 'text',
  mediaUrl?: string
) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      chat_id: chatId,
      sender_profile_id: senderProfileId,
      content,
      type,
      media_url: mediaUrl
    }])
    .select()
    .single();
  return { data, error };
};

export const markMessageAsRead = async (messageId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('id', messageId)
    .select()
    .single();
  return { data, error };
};

// Realtime subscription for messages
export const subscribeToMessages = (chatId: string, callback: (message: Message) => void) => {
  return supabase
    .channel(`chat:${chatId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chatId}`
      },
      (payload) => callback(payload.new as Message)
    )
    .subscribe();
};

// ============================================
// MINIGAMES
// ============================================

export const saveMinigameResult = async (
  matchId: string,
  gameType: string,
  player1Id: string,
  player2Id: string,
  player1Score: number,
  player2Score: number,
  affinityScore: number
) => {
  const winnerId = player1Score > player2Score ? player1Id : player2Score > player1Score ? player2Id : null;

  const { data, error } = await supabase
    .from('minigame_results')
    .insert([{
      match_id: matchId,
      game_type: gameType,
      player1_id: player1Id,
      player2_id: player2Id,
      player1_score: player1Score,
      player2_score: player2Score,
      winner_id: winnerId,
      affinity_score: affinityScore
    }])
    .select()
    .single();

  return { data, error };
};

export const getMinigameResults = async (matchId: string) => {
  const { data, error } = await supabase
    .from('minigame_results')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: false });
  return { data, error };
};

// ============================================
// BLOCKING & REPORTING
// ============================================

export const blockUser = async (blockerProfileId: string, blockedProfileId: string) => {
  const { data, error } = await supabase
    .from('blocked_users')
    .insert([{ blocker_profile_id: blockerProfileId, blocked_profile_id: blockedProfileId }])
    .select()
    .single();
  return { data, error };
};

export const unblockUser = async (blockerProfileId: string, blockedProfileId: string) => {
  const { error } = await supabase
    .from('blocked_users')
    .delete()
    .eq('blocker_profile_id', blockerProfileId)
    .eq('blocked_profile_id', blockedProfileId);
  return { error };
};

export const getBlockedUsers = async (profileId: string) => {
  const { data, error } = await supabase
    .from('blocked_users')
    .select('*, blocked_profile:profiles!blocked_users_blocked_profile_id_fkey(*)')
    .eq('blocker_profile_id', profileId);
  return { data, error };
};

export const reportUser = async (
  reporterProfileId: string,
  reportedProfileId: string,
  reason: string,
  description?: string
) => {
  const { data, error } = await supabase
    .from('reports')
    .insert([{
      reporter_profile_id: reporterProfileId,
      reported_profile_id: reportedProfileId,
      reason,
      description
    }])
    .select()
    .single();
  return { data, error };
};

// ============================================
// UTILITIES
// ============================================

export const updateSparkPoints = async (profileId: string, points: number) => {
  const { data, error } = await supabase.rpc('increment_spark_points', {
    profile_id: profileId,
    points_to_add: points
  });
  return { data, error };
};

export const decrementSwipes = async (profileId: string) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('swipes_left, is_premium')
    .eq('id', profileId)
    .single();

  if (profile && !profile.is_premium && profile.swipes_left > 0) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ swipes_left: profile.swipes_left - 1 })
      .eq('id', profileId)
      .select()
      .single();
    return { data, error };
  }

  return { data: profile, error: null };
};

export const downloadUserData = async (userId: string) => {
  // Fetch all user data
  const { data: profile } = await getProfile(userId);
  const { data: preferences } = await getPreferences(profile?.id || '');
  const { data: settings } = await getSettings(profile?.id || '');
  const { data: matches } = await getMatches(profile?.id || '');

  return {
    profile,
    preferences,
    settings,
    matches,
    exportedAt: new Date().toISOString()
  };
};
