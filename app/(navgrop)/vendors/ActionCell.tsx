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
  import { Button } from "@/components/ui/button";
  import { MoreHorizontal } from "lucide-react";

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
  
export default ActionCell