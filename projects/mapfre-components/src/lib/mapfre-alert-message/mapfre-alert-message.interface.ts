export interface Messages {
  title?: string;
  itemLeft?: string;
  description?: string;
  collapse?: boolean;
  message?: string;
  link?: {
    name: string;
    action: void;
  };
}

export interface Buttons {
  title: string;
  type: 'primary' | 'link' | 'outline' | 'link-underline' | 'link-bold' | 'link-dark' | 'outline-secondary';
}

export interface DataAlertMessage {
  icon?: string;
  messages: {
    message: string;
    link?: DataAlertLink;
  }[];
  link?: DataAlertLink;
  buttons?: Buttons[];
}

export interface DataAlertLink {
  name?: string;
  url?: string;
  action?: void;
}
