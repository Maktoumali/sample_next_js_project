"use client";

import { useRouter } from "next/navigation";

export default function BlogCreate() {
    const router = useRouter();
    return (
        <div>
            <h1>Welcome to the Blog Create</h1>
            <p>This is the Create blog page .</p>
            <button onClick={() => router.back()}>Back to Blog</button>
        </div>
    );
}
