"use client"
import { Vendor } from "../vendors/columns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { vendorCreate } from "@/lib/serveractions/verdorcreate"

const formSchema =  z.object({
    vendorName: z.string(),
    bankAccNo: z.number().max(9999, "Bank account number must be less than 5 digits"),
    bankName: z.string(),
    addLine1: z.string().optional(),
    addLine2: z.string(),
    city: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.number().max(9999, "Bank account number must be less than 5 digits").optional()
  })


export default function VendorForm() {
    // 1. Define your form.
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      vendorCreate(values)
      // Do something with the form values.
      router.push('/vendors')
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="vendorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="bankAccNo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Bank Account No</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Bank Account Number"
                        {...field}
                        value={field.value || ''}
                        onChange={(event) => {
                            const numericValue = event.target.value !== '' ? Number(event.target.value) : '';
                            field.onChange(numericValue);
                        }}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                    <Input
                    type="number"
                    placeholder="Zip Code"
                    {...field}
                    value={field.value || ''}
                    onChange={(event) => {
                        const numericValue = event.target.value !== '' ? Number(event.target.value) : '';
                        field.onChange(numericValue);
                    }}
                    />
                </FormControl>
                <FormDescription>This will be the Zip Code</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
  }