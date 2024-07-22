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
} from "@/@/components/ui/sheet";

import Calendar from "./Calendar";
import { Button } from "@/@/components/ui/button";
import GlobalApi from "../../../_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getDate } from "date-fns";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(null); // Updated to null initially
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Updated to null initially
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.id,
      date,
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
      }
    );
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
              {/* Date Picker */}
              <div>
                <h2 className="mt-5 font-bold mb-2">Select Date</h2>
                <Calendar onChange={(newDate) => setDate(newDate)} />{" "}
                {/* Correctly set date */}
              </div>
              <h2 className="my-2 font-bold">Select Time Slot</h2>
              {/* Time Picker */}
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${
                      selectedTimeSlot === item.time && "bg-primary text-white"
                    }`}
                    onClick={() => setSelectedTimeSlot(item.time)}
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
                      disabled={!selectedTimeSlot && !date}
                      onClick={saveBooking} // Hook up saveBooking to onClick
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
