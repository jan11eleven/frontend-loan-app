"use client";
import {
	SquareChartGantt,
	Plus,
	LayoutDashboard,
	Users,
	Settings,
	LogOut,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { usePathname } from "next/navigation";
// Menu items.
const items = [
	{
		title: "Home",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Create Loan",
		url: "/dashboard/create-loan",
		icon: Plus,
	},
	{
		title: "View Loans",
		url: "/dashboard/view-loans",
		icon: SquareChartGantt,
	},
	{
		title: "View Loanees",
		url: "/dashboard/view-loanees",
		icon: Users,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
	{
		title: "Logout",
		url: "#",
		icon: LogOut,
	},
];

export function AppSidebar() {
	const currentPath = usePathname();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Loan Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem
									key={item.title}
									className={
										item.url === currentPath
											? "bg-foreground text-background hover:bg-transparent font-bold pointer-events-none"
											: ""
									}
								>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
