import type { ComponentType, SVGProps } from "react";

import { Bars, Bell, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  Users,
  BarChart3,
} from "lucide-react";

import { FiFileText } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";

export async function DashBoardSideBar() {
  const user = await getUserSession();

  const buyerNavlinks: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    href: string;
  }[] = [
    { icon: House, href: "/dashboard/buyer", label: "Overview" },
    { icon: Briefcase, href: "/dashboard/buyer/my-orders", label: "My Orders" },
    { icon: CreditCard, href: "/dashboard/buyer/payments", label: "Payments" },
    { icon: Person, href: "/dashboard/buyer/profile", label: "Profile" },
    { icon: Gear, href: "/profile", label: "Settings" },
  ];

  const sellerNavlinks: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    href: string;
  }[] = [
    { icon: House, href: "/dashboard/seller", label: "Overview" },
    {
      icon: Magnifier,
      href: "/dashboard/seller/add-products",
      label: "Add Product",
    },
    { icon: Bell, href: "/dashboard/seller/orders", label: "Orders" },
    {
      icon: BarChart3,
      href: "/dashboard/seller/analytics",
      label: "Analytics",
    },
    { icon: Person, href: "/dashboard/seller/profile", label: "Profile" },
  ];

  const adminNavlisks: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    href: string;
  }[] = [
    { icon: House, href: "/dashboard/admin", label: "Overview" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: Building, href: "/dashboard/admin/products", label: "Products" },
    { icon: Briefcase, href: "/dashboard/admin/orders", label: "Orders" },
    { icon: BarChart3, href: "/dashboard/admin/analytics", label: "Analytics" },
  ];

  const navLinksMap = {
    buyer: buyerNavlinks,
    seller: sellerNavlinks,
    admin: adminNavlisks,
  };

  // const navItems =
  //   navLinksMap[user?.role as keyof typeof navLinksMap] || buyerNavlinks;
  const navItems = navLinksMap["buyer"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button variant="secondary" className="lg:hidden">
          <Bars />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
