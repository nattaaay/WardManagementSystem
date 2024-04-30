import { Fragment } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Team", href: "/teams", icon: UsersIcon, current: false },
  // { name: "patients", href: "/patients", icon: UsersIcon, current: false },
];

export const wardManagementRoutes = [
  { name: "patients", href: "/patients", icon: UsersIcon, current: false },
];

export const medicalTeamRoutes = [
  { name: "patients", href: "/patients", icon: UsersIcon, current: false },
];
