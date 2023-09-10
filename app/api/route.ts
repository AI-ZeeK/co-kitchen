import {NextResponse} from "next/server";
import data from "./seed.json";
export async function GET(request: Request, res: any) {
  return NextResponse.json(data);
}
