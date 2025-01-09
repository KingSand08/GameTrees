import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { createStore } from "@/database/queries/store/editStore";
import { checkStoreAlreadyExists } from "@/database/queries/store/checkStoreAlreadyExists";

export const PATCH = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let store_name, street, city, state, zip, country, modality, bid, mid; // [name, street, city, state, zip, country, modality, bizId]

        if (contentType.includes("application/json")) {
            const body = await req.json();
            store_name = body.store_name;
            street = body.street;
            city = body.city;
            state = body.state;
            zip = body.zip;
            country = body.country;
            modality = body.modality;
            bid = body.bid;
            mid = body.mid;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            store_name = formData.get("store_name");
            street = formData.get("street");
            city = formData.get("city");
            state = formData.get("state");
            zip = formData.get("zip");
            country = formData.get("country");
            modality = formData.get("modality");
            bid = formData.get("bid");
            mid = formData.get("mid");
        }
     
        // Ensure only non-empty fields
        if (!store_name && !street && !city && !state && !zip && !country && !bid && !mid) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        // Validate store
        const isStoreTaken = await checkStoreAlreadyExists(
            store_name, 
            street, 
            city, 
            state,
            zip,
            country
        );

        if (isStoreTaken) {
            return NextResponse.json({ status: "error", message: "Store already existed" }, { status: 400 });
        }
        
        const updateData: Record<string, unknown> = {};
        if (store_name) updateData.store_name = store_name;
        if (street) updateData.street = street;
        if (city) updateData.city = city;
        if (state) updateData.state = state;
        if (zip) updateData.zip = zip;
        if (country) updateData.country = country;
        if (modality) updateData.modality = modality;
        if (bid) updateData.bid = bid;
        if (mid) updateData.mid = mid;

        if (Object.keys(contentType).length > 0) {
            await createStore(updateData);
        }    

        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        if (updatedSession) {
            return NextResponse.json({
                message: "Store created successfully",
                store: {
                    store_name: store_name || "",
                    street: street || "",
                    city: city || "",
                    state: state || "",
                    zip: zip || "",
                    country: country || "",
                    modality: modality || "",
                    bid: bid || "",
                    mid: mid || "",
                },
                refresh: true,
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error creating a new store:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
