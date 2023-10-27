"use client";

import Link from "next/link";
import { useState } from "react";

const UserSidebar = () => {
  const menuItem = [
    {
      id: 1,
      name: "Update Profile",
      icon: "fas fa-user",
      url: "/me/update",
    },
    {
      id: 2,
      name: "Uplaod Avatar",
      icon: "fa fa-user-circle",
      url: "/me/upload_avatar",
    },
    {
      id: 3,
      name: "Update Password",
      icon: "fa fa-lock",
      url: "/me/update_password",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(menuItem[0].name);

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
            activeMenuItem === item.name ? "active" : ""
          }`}
          aria-current={activeMenuItem === item.name ? "true" : "false"}
          onClick={() => handleMenuItemClick(item.name)}>
          <i className={`${item.icon} menu-item-icon-1 fa-fw pe-2`}></i>{" "}
          {item.name}
        </Link>
      ))}
    </div>
  );
};
export default UserSidebar;
