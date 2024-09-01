import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dashboard from "@/app/components/sidebar/sidebar";


//Auth section
import { getServerSession } from "next-auth";
import Sidebar from "@/app/components/sidebar/sidebar";
import SessionProvider from "@/app/utils/SessionProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Review Plataform",
	description: "App for reviewing Movies and TV Shows",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={`${inter.className} flex h-screen`}>
				<SessionProvider session={session}>
					<Sidebar />
					<main className="flex-1 ml-64 overflow-y-auto">{children}</main>
				</SessionProvider>
			</body>
		</html>
	);
}
