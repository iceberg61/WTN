import LibraryItemClient from "./LibraryItemClient";
import { notFound, redirect } from "next/navigation";
import { LibraryMaterial } from "@/app/types/library";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LibraryItemPage({ params }: PageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `http://localhost:3000/api/library/${id}`,
    {
      cache: "no-store",
      headers: {
        cookie: cookieHeader,
      },
    }
  );

  if (res.status === 401) redirect("/auth/login");
  if (res.status === 403) redirect("/subscribe");
  if (res.status === 404) notFound();

  if (!res.ok) {
    const text = await res.text();
    console.error("API STATUS:", res.status);
    console.error("API RESPONSE:", text);
    throw new Error("Failed to fetch material");
  }

  const material: LibraryMaterial = await res.json();

  return <LibraryItemClient material={material} />;
}
