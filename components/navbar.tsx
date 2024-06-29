'use client';

import { useSession, signOut } from "next-auth/react";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { FaWhatsapp } from "react-icons/fa";
import Jp from "@/public/moneybag.svg";

export const Navbar = () => {
    const { data: session, status } = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <NextUINavbar shouldHideOnScroll maxWidth="xl" position="sticky">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
                <NextLink className="flex justify-start items-center align-center" href="/">
                    <Jp className="w-6 h-6" />
                </NextLink>
            </NavbarBrand>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal href={siteConfig.links.github} aria-label="Whatsapp">
                    <FaWhatsapp size={24} color="#25D366" />
                </Link>
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {status === "authenticated" ? (
                        <>
                            <NavbarMenuItem>
                                <Link href="/profile" size="lg" className="text-white">Mi Perfil</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/ajustes" size="lg" className="text-white">Ajustes</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/landing" size="lg" style={{ color: '#fe41f0' }}>Promociones</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/ayuda" size="lg" className="text-white">Ayuda</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="#" size="lg" className="text-white" onClick={handleLogout}>
                                    Cerrar Sesión
                                </Link>
                            </NavbarMenuItem>
                        </>
                    ) : (
                        <>
                            <NavbarMenuItem>
                                <Link href="/login" size="lg" className="text-white">Iniciar Sesión</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/promociones" size="lg" style={{ color: '#fe41f0' }}>Promociones</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/ayuda" size="lg" className="text-white">Ayuda</Link>
                            </NavbarMenuItem>
                        </>
                    )}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};