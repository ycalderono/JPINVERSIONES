import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	WhatsAppIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import Jp from "@/public/moneybag.svg";

export const Navbar = () => {

	return (
		<NextUINavbar shouldHideOnScroll maxWidth="xl" position="sticky">
			
			<NavbarBrand as="li" className="gap-3 max-w-fit">
				<NextLink className="flex justify-start items-center align-center  " href="/">
					<Jp className="w-6 h-6" />

				</NextLink>
			</NavbarBrand>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="center">
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>

			<NavbarItem className="hidden sm:flex gap-2">
				<WhatsAppIcon ></WhatsAppIcon>
			</NavbarItem>
				

				<NavbarItem className="hidden sm:flex gap-2">

					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
					 	className="bg-[#fe41f0] text-black shadow-lg"
            			isExternal
						as={Link}
						href={siteConfig.links.sponsor}
					>
						Participar Ahora
					</Button>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<WhatsAppIcon > </WhatsAppIcon>
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						item.label === "Participa Ahora" ? (
							<NavbarMenuItem key={`${item.label}-${index}`}>
								<Button
									isExternal
									as={Link}
									href={siteConfig.links.sponsor}
									color="danger" variant="bordered"
								>
									Participa Ahora
								</Button>
							</NavbarMenuItem>
						) : (
							<NavbarMenuItem key={`${item.label}-${index}`}>
								<Link
									color={
										index === 2
											? "primary"
											: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
									}
									href="#"
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						)
					))}
				</div>
			</NavbarMenu>

		</NextUINavbar>
	);
};
