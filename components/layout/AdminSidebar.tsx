"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const menuItem = [
    {
      id: 1,
      name: "Dashboard",
      icon: "fas fa-tachometer-alt",
      url: "/admin/dashboard",
    },
    {
      id: 2,
      name: "Rooms",
      icon: "fas fa-hotel",
      url: "/admin/rooms",
    },
    {
      id: 3,
      name: "Bookings",
      icon: "fas fa-receipt",
      url: "/admin/bookings",
    },
    {
      id: 4,
      name: "Users",
      icon: "fa-solid fa-users",
      url: "/admin/users",
    },
    {
      id: 5,
      name: "Reviews",
      icon: "fas fa-star",
      url: "/admin/reviews",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(pathname);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItem.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem.includes(item.url) ? "active" : ""
          }`}
          aria-current={activeMenuItem.includes(item.url) ? "true" : "false"}
          onClick={() => handleMenuItemClick(item.url)}>
          <i className={`${item.icon} menu-item-icon-1 fa-fw pe-2`}></i>{" "}
          {item.name}
        </Link>
      ))}
    </div>
  );
};
export default AdminSidebar;
