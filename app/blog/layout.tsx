import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { ClientSessionGuard } from "./ClientSessionGuard";

export const metadata = {
    title: "Blog",
    description: "Blog page",
};

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(options);
    
    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <ClientSessionGuard />
            {children}
        </>
    );
}