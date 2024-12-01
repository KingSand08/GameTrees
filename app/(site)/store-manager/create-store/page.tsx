"use client"
import React, { useState } from "react";

export default function CreateStore() {
    const [storeName, setStoreName] = useState("");
    const [parentCompany, setParentCompany] = useState<number | "">("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState<File | null>(null);
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [modality, setModality] = useState("");
}