export const metadata = {
    title: "Blog",
    description: "Blog page",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}