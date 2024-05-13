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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/vendors`);
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