export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-row items-center justify-center py-4 md:py-8 bg-white bg-opacity-50 border border-white rounded-lg">
			<div className="inline-block max-w-full text-center justify-center">
				{children}
			</div>
		</section>
	);
}
