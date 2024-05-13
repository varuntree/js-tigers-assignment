"use server"
import { prisma } from "@/prisma/db"
import { Vendor } from "@/app/(navgrop)/vendors/columns"
import { z } from "zod"

type vendorType = z.infer<typeof Vendor>

export async function vendorCreate({vendorName,bankAccNo, bankName, addLine1, addLine2, city, country, zipCode }:vendorType){

    try{
        const result = await prisma.vendor.create({
            data:{
                name:vendorName,
                bank_acc_no: bankAccNo,
                bank_name: bankName,
                address_line1: addLine1,
                address_line2: addLine2,
                city: city,
                country: country,
                zipcode:zipCode,
                userId:1
            }
        })
        console.log(result)

    }catch(e){
        console.log(e)
    }

}