"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Vendor, columns } from "./columns";

// Dynamically import the DataTable component with SSR disabled
const DataTable = dynamic(() => import('./data-table'), {
  ssr: false,
});

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
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
        const response = await fetch(`${apiUrl}/api/vendors`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const { result } = await response.json();
        setData(result.vendor);
        console.log(result.vendor);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
