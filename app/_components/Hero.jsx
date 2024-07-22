import { Button } from "@/@/components/ui/button";
import { Input } from "@/@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <div className="flex items-center gap-3 flex-col justify-center pt-14 pb-7">
      <h2 className="font-bold text-[46px] text-center">
        Find some<span className="text-primary"> Service/Repair</span> <br></br>
        Near You
      </h2>
      <h2 className="text-xl text-gray-400">
        Explore Best Home Service & Repair near you.{" "}
      </h2>
      <div className="mt-4 flex gap-4 items-center">
        <Input
          placeholder="  Search"
          className="rounded-full md:w-[350px] border outline-0 h-7 ml-1"
        />
        <Button className="rounded-full h-[35px] w-[35px] flex items-center bg-primary ">
          {/* Search is an lucide react icon */}
          <Search className=" text-white h-4  " />
        </Button>
      </div>
    </div>
  );
}

export default Hero;
