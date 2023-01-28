export interface ISecret {
  id: string;
  website: string;
  displayName: string;
  userName: string;
  password: string;
  notes: string;
  folderId: string | null;
  isFavorited: boolean;
}
