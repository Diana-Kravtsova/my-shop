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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  ChevronRight,
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

  const womensCategories = categories.filter(c => c.startsWith("womens-"));
  const mensCategories = categories.filter(c => c.startsWith("mens-"));
  
  const groupedCategories = new Set([...womensCategories, ...mensCategories]);
  const otherCategories = categories.filter(c => !groupedCategories.has(c));

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleLinkClick = () => setOpenMobile(false);

  return (
    <Sidebar collapsible="icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* All Products */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" onClick={handleLinkClick}>
                    <LayoutGrid className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">All Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Women's Fashion Group */}
              {womensCategories.length > 0 && (
                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <ShoppingBag className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">Women's Fashion</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {womensCategories.map(category => {
                          const Icon = categoryIconMap[category] || Tag;
                          return (
                            <SidebarMenuSubItem key={category}>
                              <SidebarMenuSubButton asChild>
                                <Link href={`/category/${category}`} onClick={handleLinkClick}>
                                  <Icon className="h-4 w-4" />
                                  <span>{formatCategory(category)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}

              {/* Men's Fashion Group */}
              {mensCategories.length > 0 && (
                <Collapsible asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Shirt className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">Men's Fashion</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {mensCategories.map(category => {
                          const Icon = categoryIconMap[category] || Tag;
                          return (
                            <SidebarMenuSubItem key={category}>
                              <SidebarMenuSubButton asChild>
                                <Link href={`/category/${category}`} onClick={handleLinkClick}>
                                  <Icon className="h-4 w-4" />
                                  <span>{formatCategory(category)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}

              {/* Other Categories */}
              {otherCategories.map(category => {
                const Icon = categoryIconMap[category] || Tag;
                return (
                  <SidebarMenuItem key={category}>
                    <SidebarMenuButton asChild>
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
    .map(word => {
      if (word === "womens" || word === "mens") return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}
