export interface User {
  id: string;
  email: string;
  username: string;
  profile_picture_url?: string;
  area?: string;
  created_at: Date;
  updated_at: Date;
}

export interface GiftExchange {
  id: string;
  organizer_id: string;
  name: string;
  description?: string;
  event_date: Date;
  status: 'draft' | 'active' | 'completed' | 'archived';
  created_at: Date;
  updated_at: Date;
}

export interface GiftExchangeParticipant {
  id: string;
  gift_exchange_id: string;
  user_id: string;
  display_name: string;
  joined_at: Date;
}

export interface DrawRule {
  id: string;
  gift_exchange_id: string;
  allow_multiple_groups: boolean;
  exclude_same_area: boolean;
  exclude_same_subgroup: boolean;
  created_at: Date;
}

export interface DrawExclusion {
  id: string;
  draw_rule_id: string;
  excluded_user_id_1?: string;
  excluded_user_id_2?: string;
  excluded_subgroup_1?: string;
  excluded_subgroup_2?: string;
  description?: string;
}

export interface DrawResult {
  id: string;
  gift_exchange_id: string;
  sender_id: string;
  receiver_id: string;
  drawn_at: Date;
  visible_after: Date;
}

export interface WishlistItem {
  id: string;
  gift_exchange_id: string;
  user_id: string;
  item_name: string;
  description?: string;
  priority?: number;
  link?: string;
  created_at: Date;
}

export type GiftExchangeStatus = 'draft' | 'active' | 'completed' | 'archived';
