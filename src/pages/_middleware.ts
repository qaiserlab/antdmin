import { useContext } from "react"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
// import { ActivityStore } from "@stores/ActivityStore"

export function middleware(request: NextRequest) {
  // const { isLoggedIn } = useContext(ActivityStore)

  if (request.nextUrl.pathname !== "/login") {
    // if (!isLoggedIn) {
    //   return NextResponse.redirect(new URL("/login", request.url))
    // }
  }
}
