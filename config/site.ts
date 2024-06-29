export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Inicio",
			href: "/",
		},
    {
      label: "Preguntas frecuentes",
      href: "/pricing",
    },
    {
      label: "Sobre nosotros",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Promociones",
			href: "/profile",
		},
		{
			label: "Ajustes",
			href: "/settings",
		},
		{
			label: "Ayuda",
			href: "/help-feedback",
		},
		{
			label: "Cerrar sesión",
			href: "#", 
		  },
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
