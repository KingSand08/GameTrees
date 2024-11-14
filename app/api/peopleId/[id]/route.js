import { NextResponse } from "next/server";

export const GET = async (request, rparams) => {
  // export const GET = async (request: unknown, rparams: { params: { id: unknown; }; }) => {
  const { id } = (await rparams.params);
  const people = await fetch(`https://api.github.com/users/${id}`);
  const data = await people.json();
  return NextResponse.json(data, { status: 200 });
};
