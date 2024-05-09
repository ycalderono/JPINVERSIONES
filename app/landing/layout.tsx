export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-4 md:py-8">
			<div className="inline-block max-w-full text-center justify-center">
				{children}
			</div>
		</section>
	);
}
