export interface Profile {
  text: string;
  route: string;
  showNotification?: boolean;
}

export interface User {
  name: string;
  surname?: string;
  profilePage: Profile;
}
