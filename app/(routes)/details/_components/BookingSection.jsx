import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "/components/ui/sheet";

import SingleDatePicker from "./Calendar";
import { Button } from "/components/ui/button";
import GlobalApi from "../../../_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BusinessBookedSlot();
  }, [date]);

  const BusinessBookedSlot = () => {
    const formattedDate = formatDate(date);
    if (!formattedDate) {
      console.error("Invalid date format:", date);
      return;
    }

    GlobalApi.BusinessBookedSlot(business.id, formattedDate)
      .then((resp) => {
        console.log("Booked slots response:", resp);
        setBookedSlot(resp.bookings);
      })
      .catch((error) => {
        console.error("Error fetching booked slots:", error);
        toast.error("Failed to fetch booked slots. Please try again later.");
      });
  };
  const getTime = () => {
    const timeList = [];
    for (let i = 10; i < 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    timeList.push({ time: "12:00 PM" });
    timeList.push({ time: "12:30 PM" });
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // YYYY-MM-DD format
  };

  const saveBooking = () => {
    const formattedDate = formatDate(date);
    if (!formattedDate || !selectedTimeSlot || !data?.user) {
      toast.error(
        "Please select a date, time slot, and ensure you are logged in."
      );
      return;
    }

    console.log("Booking details:", {
      businessId: business.id,
      date: formattedDate,
      time: selectedTimeSlot,
      userEmail: data.user.email,
      userName: data.user.name,
    });

    GlobalApi.createNewBooking(
      business.id,
      formattedDate,
      selectedTimeSlot,
      data.user.email,
      data.user.name
    ).then(
      (resp) => {
        if (resp) {
          toast.success("Service Booked Successfully");
        }
      },
      (e) => {
        toast.error("Error while creating booking");
        console.error(e);
      }
    );
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time == time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="fixed inset-y-0 right-0 w-[600px] z-50 bg-inherit text-gray-700 p-4 overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-primary font-semibold">
              Book a Service!
            </SheetTitle>
            <SheetDescription>
              Date and Time Slot to book a Service
              <div>
                <h2 className="mt-5 font-bold mb-2">Select Date</h2>
                <SingleDatePicker
                  selectedDate={date}
                  setSelectedDate={setDate}
                />
              </div>
              <h2 className="my-2 font-bold">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    disabled={isSlotBooked(item.time)}
                    variant="outline"
                    className={`border rounded-full p-2 px-3 ${
                      selectedTimeSlot === item.time
                        ? "bg-primary text-white"
                        : isSlotBooked(item.time)
                        ? "text-gray-400 cursor-not-allowed "
                        : "text-black  hover:bg-primary hover:text-white"
                    }`}
                    onClick={() =>
                      !isSlotBooked(item.time) && setSelectedTimeSlot(item.time)
                    }
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
              <SheetClose>
                <SheetFooter>
                  <div className="flex gap-5">
                    <Button
                      variant="destructive"
                      className="m-2 text-white bg-red-500 border p-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="m-2 text-white p-2"
                      disabled={!selectedTimeSlot || !date}
                      onClick={saveBooking}
                    >
                      Book
                    </Button>
                  </div>
                </SheetFooter>
              </SheetClose>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
