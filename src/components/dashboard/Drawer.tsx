"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import {
  PanelLeftOpen,
  House,
  Briefcase,
  CreditCard,
  Heart,
  User,
  Users,
  Building,
  BarChart3,
} from "lucide-react";

import { Bell, Magnifier, Person } from "@gravity-ui/icons";

interface Props {
  role: string;
}

export default function DashboardSidebarMobile({ role }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const buyerNavlinks = [
    { icon: House, href: "/dashboard/buyer", label: "Overview" },
    { icon: Briefcase, href: "/dashboard/buyer/my-orders", label: "My Orders" },
    { icon: CreditCard, href: "/dashboard/buyer/payments", label: "Payments" },
    { icon: Person, href: "/dashboard/buyer/profile", label: "Profile" },
    { icon: Heart, href: "/dashboard/buyer/wishlist", label: "Wishlist" },
  ];

  const sellerNavlinks = [
    { icon: House, href: "/dashboard/seller", label: "Overview" },
    {
      icon: Magnifier,
      href: "/dashboard/seller/add-products",
      label: "Add Product",
    },
    {
      icon: Magnifier,
      href: "/dashboard/seller/my-products",
      label: "My Products",
    },
    { icon: Bell, href: "/dashboard/seller/orders", label: "Orders" },
    {
      icon: BarChart3,
      href: "/dashboard/seller/analytics",
      label: "Analytics",
    },
    { icon: Person, href: "/dashboard/seller/profile", label: "Profile" },
  ];

  const adminNavlinks = [
    { icon: House, href: "/dashboard/admin", label: "Overview" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: Building, href: "/dashboard/admin/products", label: "Products" },
    { icon: Briefcase, href: "/dashboard/admin/orders", label: "Orders" },
    {
      icon: BarChart3,
      href: "/dashboard/admin/analytics",
      label: "Analytics",
    },
    { icon: User, href: "/dashboard/admin/profile", label: "Profile" },
  ];

  const navLinksMap = {
    buyer: buyerNavlinks,
    seller: sellerNavlinks,
    admin: adminNavlinks,
  };

  const navItems =
    navLinksMap[role as keyof typeof navLinksMap] || buyerNavlinks;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="lg:hidden"
        variant="solid"
        onPress={() => setIsOpen(true)}
      >
        <PanelLeftOpen size={18} />
        Menu
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
                    >
                      <Icon className="size-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
