import {NextResponse} from "next/server";
import data from "./seed.json";

export async function GET(request: Request, {params}: any) {
  // we will use params to access the data passed to the dynamic route
  const {id} = params;
  const newL1Data = data.filter((item) => {
    return item.p_id === id;
  });

  //   if (!newData.length) return Error(`Invalid id sent`);
  //   console.log(newData, 78987);
  return NextResponse.json(newL1Data);
}
