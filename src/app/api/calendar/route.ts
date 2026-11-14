import { buildIcs } from "@/lib/calendar";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="60-anos-walfre.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
