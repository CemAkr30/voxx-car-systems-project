import axiosClient from "@/lib/axios";
import { NextResponse } from "next/server";

async function dummyData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { user: "bülent güven" };
}

export async function POST() {
  try {
    const data = await dummyData();
    return NextResponse.json({ data }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
