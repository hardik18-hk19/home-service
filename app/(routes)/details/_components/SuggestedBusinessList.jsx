import React, { useEffect, useState } from "react";
import { Button } from "@/@/components/ui/button";
import { NotebookPen } from "lucide-react";
import GlobalApi from "../../../_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import BookingSection from "../_components/BookingSection";

function SuggestedBusinessList({ business }) {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    business && getBusinessList();
  }, [business]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(business?.category?.name).then((resp) => {
      setBusinessList(resp?.businessLists);
    });
  };

  return (
    <div className="md:pl-10 ">
      

      <BookingSection business={business}>
      <Button className="flex gap-2 md:w-full w-fit text-white p-1">
        <NotebookPen className=" " />
        Book Appointment
      </Button>
      </BookingSection>
      <div className="hidden md:block ">
        <h2 className="font-bold text-lg mt-3 mb-3">Similar Business</h2>
        <div>
          {businessList &&
            businessList.map((business, index) => (
              <Link
                href={"/details/" + business.id}
                className="flex gap-2 mb-4 hover:border rounded-lg p-2 cursor-pointer hover:shadow-md border-primary"
              >
                <Image
                  src={business?.images[0].url}
                  alt={business.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold">{business.name}</h2>
                  <h2 className="text-primary">{business.contactPerson}</h2>
                  <h2 className="text-gray-400 text-sm">{business.address}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList;
