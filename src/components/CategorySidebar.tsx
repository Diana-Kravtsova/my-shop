"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Tag,
  Sparkles,
  Wind,
  Armchair,
  ShoppingBasket,
  Home,
  Utensils,
  Laptop,
  Shirt,
  Footprints,
  Watch,
  SmartphoneNfc,
  Bike,
  Droplet,
  Smartphone,
  Dumbbell,
  Glasses,
  Tablet,
  Car,
  ShoppingBag,
  Flower2,
  Gem,
} from "lucide-react";

const categoryIconMap: Record<string, React.ElementType> = {
  beauty: Sparkles,
  fragrances: Wind,
  furniture: Armchair,
  groceries: ShoppingBasket,
  "home-decoration": Home,
  "kitchen-accessories": Utensils,
  laptops: Laptop,
  "mens-shirts": Shirt,
  "mens-shoes": Footprints,
  "mens-watches": Watch,
  "mobile-accessories": SmartphoneNfc,
  motorcycle: Bike,
  "skin-care": Droplet,
  smartphones: Smartphone,
  "sports-accessories": Dumbbell,
  sunglasses: Glasses,
  tablets: Tablet,
  tops: Shirt,
  vehicle: Car,
  "womens-bags": ShoppingBag,
  "womens-dresses": Flower2,
  "womens-jewellery": Gem,
  "womens-shoes": Footprints,
  "womens-watches": Watch,
};

interface CategorySidebarProps {
  categories: string[];
}

export const CategorySidebar = ({ categories }: CategorySidebarProps) => {
  const { setOpen, setOpenMobile } = useSidebar();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpenMobile(false);
  }

  return (
    <Sidebar collapsible="icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="All Products">
                  <Link href="/" onClick={handleLinkClick}>
                    <LayoutGrid className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">All Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {categories.map(category => {
                const Icon = categoryIconMap[category] || Tag;
                return (
                  <SidebarMenuItem key={category}>
                    <SidebarMenuButton asChild tooltip={formatCategory(category)}>
                      <Link href={`/category/${category}`} onClick={handleLinkClick}>
                        <Icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">{formatCategory(category)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const formatCategory = (slug: string): string => {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
