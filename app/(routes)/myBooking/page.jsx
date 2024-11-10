"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "/components/ui/tabs";
import BookingHistoryList from "./_component/BookingHistoryList";
import { useSession } from "next-auth/react";
import GlobalApi from "/app/_services/GlobalApi";

function MyBooking() {
  const [selectedTab, setSelectedTab] = useState("Booked");
  const [bookingHistory, setBookingHistory] = useState([]);
  const { data } = useSession();
  useEffect(() => {
    data && GetUserBookingHistory();
  }, [data]);
  const GetUserBookingHistory = () => {
    GlobalApi.GetUserBookingHistory(data.user.email).then((resp) => {
      console.log(resp);
      setBookingHistory(resp.bookings);
    });
  };

  const filterData = (type) => {
    const result = bookingHistory.filter((item) =>
      type == "Booked"
        ? new Date(item.date) > new Date()
        : new Date(item.date) < new Date()
    );
    return result;
  };

  return (
    <div className="my-10 mx-5 md:mx-36 rounded-lg ">
      <h2 className="font-bold text-[20px] mx-0.5 my-2">My Bookings</h2>
      <Tabs defaultValue="Booked" onValueChange={setSelectedTab} className="">
        <TabsList className="border w-fit bg-white p-1 rounded-lg flex">
          <TabsTrigger asChild value="Booked">
            <button
              className={`p-2 m-1 rounded-lg  ${
                selectedTab === "Booked"
                  ? "bg-white shadow"
                  : "bg-gray-400 text-white hover:bg-gray-200"
              }`}
            >
              Booked
            </button>
          </TabsTrigger>
          <TabsTrigger asChild value="Completed">
            <button
              className={`p-2 m-1 rounded-lg  ${
                selectedTab === "Completed"
                  ? "bg-white shadow"
                  : "bg-gray-400 text-white hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
          </TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent
            value="Booked"
            className="bg-white p-4 rounded-lg shadow "
          >
            <BookingHistoryList bookingHistory={filterData("Booked")} />
          </TabsContent>
          <TabsContent
            value="Completed"
            className="bg-white p-4 rounded-lg shadow"
          >
            <BookingHistoryList bookingHistory={filterData("Completed")} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default MyBooking;
