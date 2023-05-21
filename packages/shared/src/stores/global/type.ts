export interface SessionWithActivitiesResource {
  id: string;
  status: string;
  expireAt: Date;
  abandonAt: Date;
  lastActiveAt: Date;
  latestActivity: SessionActivity;
}

export interface SessionActivity {
  id: string;
  browserName?: string;
  browserVersion?: string;
  deviceType?: string;
  ipAddress?: string;
  city?: string;
  country?: string;
  isMobile?: boolean;
}

export interface UserResource {
  id: string;
  externalId: string | null;
  username: string | null;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  publicMetadata: UserPublicMetadata;
  unsafeMetadata: UserUnsafeMetadata;
  lastSignInAt: Date | null;
  updatedAt: Date | null;
  createdAt: Date | null;
}
