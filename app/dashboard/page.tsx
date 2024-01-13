"use client"

import React from "react"

import useAuth from "@/hooks/useAuth"

type Props = {}

const DashboardIndex = (props: Props) => {
  const { user } = useAuth()

  return (
    <>
      <div className="my-5 text-lg md:text-3xl">Dashboard</div>
      <div className="rounded-md border px-5 py-3">
        <ul>
          <li>
            <span className="inline-block min-w-[100px]">First Name: </span>{" "}
            {user?.firstName ?? "N/A"}
          </li>
          <li>
            <span className="inline-block min-w-[100px]">Last Name: </span>{" "}
            {user?.lastName ?? "N/A"}
          </li>
          <li>
            <span className="inline-block min-w-[100px]">Email: </span>{" "}
            {user?.email}
          </li>
          <li>
            <span className="inline-block min-w-[100px]">Id: </span> {user?.id}
          </li>
        </ul>
      </div>
    </>
  )
}

export default DashboardIndex
