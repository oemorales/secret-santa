export const USER_ROLES = {
  PARTICIPANT: 'participant',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const GIFT_EXCHANGE_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

export const ALLOWED_REGIONS = [
  'North America',
  'South America',
  'Europe',
  'Asia',
  'Africa',
  'Oceania',
] as const;

export const MIN_PARTICIPANTS_FOR_DRAW = 2;

export const MAX_WISHLIST_PRIORITY = 5;
export const MIN_WISHLIST_PRIORITY = 1;
