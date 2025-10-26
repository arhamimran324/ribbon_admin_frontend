export interface DropdownProps {
  placeholder?: React.ReactNode;
  data?: { label: string; value: string }[];
  className?: string;
  onSelect?: (value: string) => void;
  value?: string;
}

export interface DropdownItem {
  name: string;
  icon: string;
  color: string;
  hoverBg: string;
  hoverText: string;
}

export interface NotificationsDropDwonProps {
  notifications?: {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    unread: boolean;
  }[];
  notificationsData?: DropdownItem[];
  placeholder?: React.ReactNode;
  className?: string;
}
export interface HeaderProfileDropDownProps {
  profileitems?: {
    name: string;
    icon: string;
    color: string;
    hoverBg: string;
    hoverText: string;
  }[];
  dropdownItems?: DropdownItem[];
  placeholder?: React.ReactNode;
  className?: string;
}
export interface DrawerCardProps {
  children?: any;
  title?: any;
  // isDrawerOpen?: boolean;
  // isOpen: boolean;
  // onClose: () => void;
}
export interface ModalsProps {
  children: React.ReactNode;
}

interface PaginatedRow {
  _id?: string;
  companyName?: string;
  email?: string;
  registeredIn?: string;
  joiningDate?: string;
  licence?: string;
  licenseExpiry?: string;
  role?: string;
  userName?: string;
  joinedDate?: string;
  status?: string;
  idx?: number;
}

export type PaginatedData = Array<PaginatedRow>;

interface HeaderData {
  clinic: {
    name: string;
    address: string;
    phone: string;
  };
  patient: {
    name: string;
    dob: string;
    email: string;
    address: string;
    phone: string;
  };
  prescription: {
    title: string;
    number: string;
    date: string;
    issueDate?: string;
  };
}
interface Totals {
  subTotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
}
interface ColumnData {
  id: string;
  label: string;
}
interface RowData {
  [key: string]: any;
}
export interface InvoicesLayoutProps {
  backButtonRoute: string;
  backButtonLabel: string;
  headerData: HeaderData;
  tableData: RowData[];
  tableColumns: ColumnData[];
  isInvoice?: boolean;
  paymentMethod?: string;
  totals: Totals;
  doctorData?: any;
  type: "prescription" | "pharmacyInvoice" | "clinicInvoice";
  onDownloadPdf?: () => void;
}
