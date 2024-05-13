
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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

const ActionCell = ({ vendorId }:any) => {
  

  const fetchDelete = async () => {
    console.log("vendor", vendorId)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const result = await fetch(`${apiUrl}//api/deletevendor`, {
      method: "DELETE",
      body: JSON.stringify({ id: vendorId }),
    });
    window.location.reload()
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-zinc-950 text-white dark:bg-white dark:text-black p-2 rounded-md">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the vendor data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <button>Cancel</button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={fetchDelete}>Continue</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};


export type Vendor = z.infer<typeof Vendor>;

export const columns: ColumnDef<Vendor>[] = [
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
    cell: ({ row }:any) => <ActionCell vendorId={row.original.id} />,
  },
];


