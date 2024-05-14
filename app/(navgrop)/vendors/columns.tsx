import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import dynamic from "next/dynamic";

// Define the shape of our data using Zod
export const Vendor = z.object({
  vendorName: z.string(),
  bankAccNo: z.number(),
  bankName: z.string(),
  addLine1: z.string().optional(),
  addLine2: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.number().optional(),
});

const DynamicActionCell = dynamic(() => import('./ActionCell'), {
  ssr: false,
});

export type Vendor = z.infer<typeof Vendor>;

export const columns:any = [
  {
    accessorKey: "vendorName",
    header: "Vendor Name",
  },
  {
    accessorKey: "bankAccNo",
    header: "Bank Account No",
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
  },
  {
    accessorKey: "addLine1",
    header: "Address Line 1",
  },
  {
    accessorKey: "addLine2",
    header: "Address Line 2",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "zipCode",
    header: "Zip Code",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }:any) => <DynamicActionCell vendorId={row.original.id} />,
  },
];
