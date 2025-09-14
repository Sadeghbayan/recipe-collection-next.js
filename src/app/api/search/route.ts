import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
    q
  )}`;
  const res = await fetch(api);
  const json = await res.json();
  return NextResponse.json(json);
}
