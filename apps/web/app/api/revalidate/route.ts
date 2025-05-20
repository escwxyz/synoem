import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid secret" }), { status: 401 });
  }

  const body = await req.json();

  if (!body || typeof body !== "object" || !("path" in body)) {
    return new Response(JSON.stringify({ message: "Invalid body" }), { status: 400 });
  }

  const path = body.path;
  if (!path || typeof path !== "string") {
    return new Response(JSON.stringify({ message: "Invalid path" }), { status: 400 });
  }

  try {
    // @ts-ignore
    await globalThis.revalidatePath?.(path);

    return new Response(JSON.stringify({ revalidated: true, path }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
