import { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IUser {
  id: string | number;
  name: string;
  username?: string;
  email: string;
  token: string;
}

export interface ContainerProps {
  styling?: string;
  children?: ReactNode;
  isSideBorder?: boolean;
  isBottomBorder?: boolean;
  isRightBorder?: boolean;
}
export interface ContainerCardProps {
  cardHeading?: string;
  children?: ReactNode;
  headingAlign?: string;
  isSubHeading?: boolean;
  subHeading?: string;
}

export interface InputNumberFeildProps {
  disabled?: boolean;
  label?: string;
  isAuth?: boolean;
  name?: string;
  value?: number | string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  styling?: string;
  labelStyles?: string;
  textColor?: string;
  [key: string]: any;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface InputPasswordFieldProps {
  disabled?: boolean;
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  isAuth?: boolean;
  name?: string;
  labelStyles?: string;
  error?: string;
  styling?: string;
  textColor?: string;
  strengthChecker?: boolean;
  [key: string]: any;
}

export interface InputFieldProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  styling?: string;
  labelStyles?: string;
  textColor?: string;
  [key: string]: any;
  isAuth?: boolean;
}

export interface SidebarItemProps {
  text: string;
  size?: string;
  path?: string;
  icon?: string;
  active?: boolean;
  subItem?: boolean;
  expanded?: boolean;
  subMenu?: SubMenuItemProps[] | null;
}

export interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded"> {
  subMenu?: never;
  expanded?: never;
}

export interface IGroupedOption {
  _id?: string;
  label: string;
  options: IOption[];
}

export interface IOption {
  value: string;
  label: string;
}

export interface LocationOption {
  key: string;
  value: string;
  flag: string;
  countryCode: string;
  ticked: boolean;
}
export interface IAppState {
  showMobileHeader: boolean;
  showEmailSuccessModal: boolean;
  showConfirmUploadModal: boolean;
  showGpEmailModal: boolean;
  showRevokeAccessConfirmPassword: boolean;
  verifyRevokeAccess: boolean;
  showConfirmDeleteAccountModal: boolean;
  deleteAccount: boolean;
  showLogoutModal: boolean;
  showUploadSuccessModal: boolean;
  showhealthProblemsModal: boolean;
  resetPasswordCounter: number;
  file: File | null;
  location: LocationOption[];
  filterName: string;
  termsConditionsModal: boolean;
  monetiseDataModal: boolean;
  wantToSendSARModal: boolean;
  wantMedicalDataBackupModal: boolean;
  wantConnectWalletModal: boolean;
  wantToSecureDataModal: boolean;
  wantToSecureAllDataModal: boolean;
  wantToUpdateMedicalDataModal: boolean;
  monetiseBenifitsModal: boolean;
  licenceFreeUser: number;
  isLogoutModel: boolean;
  expandedIndex: number | null | undefined;
  isDrawerOpen: boolean;
  section: string;
  singleuserId: number | null | undefined;
}

export interface Location {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  altSpellings: string[];
}
