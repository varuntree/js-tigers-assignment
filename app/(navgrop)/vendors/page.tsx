"use client"

import { useState, useEffect } from "react";
import { Vendor, columns } from "./columns";
import { DataTable } from "./data-table";


interface Result {
  id: number;
  email: string;
  vendor: Vendor[];
}

export default function DemoPage() {
  const [data, setData] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vendors");
        const {result} = await response.json();
        setData(result.vendor);
        console.log(result.vendor)
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}