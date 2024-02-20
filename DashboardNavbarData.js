import reporting from "../../assets/icons/navbar/reportingIcon.png";
import reportBuilder from "../../assets/icons/navbar/reportBuilderIcon.png";
import dashboard from "../../assets/icons/navbar/dashboardIcon.png";
import transaction from "../../assets/icons/navbar/transactionIcon.png";
import reportRecord from "../../assets/icons/navbar/reportRecordIcon.png";
import donationBuilder from "../../assets/icons/navbar/donationBuilderIcon.png";
import widget from "../../assets/icons/navbar/widgetIcon.png";
import profile from "../../assets/icons/navbar/profileIcon.png";
import management from "../../assets/icons/navbar/userManageIcon.png";
import dropDown from "../../assets/icons/dropDownIcon.png";

export interface NavbarItem {
  id: number;
  title: string;
  icon: string; // Assuming it's a path to an image
  path: string;
  dropDown?: DropDownMenu[];
}

type DropDownMenu = {
  id: number;
  icon: string;
  title: string;
  path: string;
  subMenu?: SubMenu[];
};
type SubMenu = {
  id: number;
  icon: string;
  title: string;
  path: string;
};

export const DashboardNavbarData: NavbarItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: dropDown,
    path: "",
    dropDown: [
      {
        id: 101,
        icon: dashboard,
        title: "Dashboard",
        path: "/dashboard",
      },
      {
        id: 102,
        icon: transaction,
        title: "Transactions",
        path: "/transactions",
      },
      {
        id: 103,
        icon: reporting,
        title: "Reporting",
        path: "/reporting",
        subMenu: [
          {
            id: 1031,
            icon: reportBuilder,
            title: "Report Builder",
            path: "/reporting/report-builder",
          },
          {
            id: 1032,
            icon: reportRecord,
            title: "Report Records",
            path: "/reporting/report-records",
          },
        ],
      },
      {
        id: 104,
        icon: donationBuilder,
        title: "Donation Builder",
        path: "/donation-builder",
      },
      {
        id: 105,
        icon: widget,
        title: "Manage Widgets",
        path: "/manage-widgets",
      },
      {
        id: 106,
        icon: profile,
        title: "Favourite Profiles",
        path: "/favorite-profiles",
      },
      {
        id: 107,
        icon: management,
        title: "User Management",
        path: "/user-management",
      },
    ],
  },
  {
    id: 2,
    title: "About",
    icon: "",
    path: "/about",
  },
  {
    id: 3,
    title: "Contact Us",
    icon: "",
    path: "/contact-us",
  },
];
