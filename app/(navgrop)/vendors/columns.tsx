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
    accessorKey: "name",
    header: "Vendor Name",
  },
  {
    accessorKey: "bank_acc_no",
    header: "Bank Account No",
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "address_line1",
    header: "Address Line 1",
  },
  {
    accessorKey: "address_line2",
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
    accessorKey: "zipcode",
    header: "Zip Code",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }:any) => <DynamicActionCell vendorId={row.original.id} />,
  },
];
