import { useState } from "react";
import citiesData from "cities.json";
import { AwesomeButton } from "react-awesome-button";
import AstrologyCard, { AstrologyCardProps } from "./KundaliCard";

interface City {
    name: string;
    country: string;
    lat: string;
    lng: string;
}

// Explicitly declare the type of cities as City[]
const cities: City[] = citiesData as City[];

export default function Kundali() {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [birthTime, setBirthTime] = useState("");
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedCityLat, setSelectedCityLat] = useState("")
    const [selectedCityLng, setSelectedCityLng] = useState("")
    const [kundali, setKundali] = useState<AstrologyCardProps | null>(null);
    const handleGenerateKundali = async () => {
        if (name && birthDate && birthTime && selectedCity) {
            try {
                // Convert birthDate and birthTime to the required datetime format
                const formattedDatetime = `${birthDate}T${birthTime}:00+00:00`;

                // Prepare the API payload
                const payload = {
                    name,
                    datetime: formattedDatetime,
                    lat: selectedCityLat,
                    lng: selectedCityLng,
                };

                // Call the backend API
                const response = await fetch("http://localhost:5000/kundali", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                // Parse the JSON response
                if (response.ok) {
                    const { kundali } = await response.json();
                    console.log(kundali);
                    console.log(kundali.data.nakshatra_details.nakshatra);
                    const kundaliData = {
                        nakshatra: kundali.data.nakshatra_details.nakshatra.name,
                        chandra_rasi: kundali.data.nakshatra_details.chandra_rasi.name,
                        zodiac: kundali.data.nakshatra_details.zodiac.name,
                        pada: kundali.data.nakshatra_details.nakshatra.pada,
                        ganam: kundali.data.nakshatra_details.additional_info.ganam,
                        nadi: kundali.data.nakshatra_details.additional_info.nadi,
                        has_mangal_dosha: kundali.data.mangal_dosha.has_dosha,
                        mangal_desc: kundali.data.mangal_dosha.description,
                    }
                    setKundali(kundaliData)
                    alert("Kundali generated successfully! Check console for details.");
                } else {
                    const error = await response.json();
                    console.error(error);
                    alert("Failed to generate Kundali. Check console for error details.");
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred while generating the Kundali.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-cente p-4">
            {
                kundali == null ?
                    <div className=" shadow-lg rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Generate Your Kundali
                        </h2>
                        <div className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="mt-1 block w-full h-12 p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Birth Date Input */}
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Birth Date
                                </label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="mt-1 block w-full h-12 p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* Birth Time Input */}
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Birth Time
                                </label>
                                <input
                                    type="time"
                                    value={birthTime}
                                    onChange={(e) => setBirthTime(e.target.value)}
                                    className="mt-1 block w-full h-12 p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* City Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Birth Place (City)
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => {
                                        const selectedCityName = e.target.value;
                                        setSelectedCity(selectedCityName);

                                        // Find the selected city object to get lat and lng
                                        const city = cities.find((c) => c.name === selectedCityName);
                                        if (city) {
                                            setSelectedCityLat(city.lat);
                                            setSelectedCityLng(city.lng);
                                        }
                                    }}
                                    className="mt-1 block w-full h-12 p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">Select a city</option>
                                    {cities.filter((e) => {
                                        return e.country == "IN"
                                    }).map((city: City, index) => (
                                        <option key={index} value={city.name}>
                                            {city.name}, {city.country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Button */}
                            <AwesomeButton
                                type="primary"
                                onPress={handleGenerateKundali}
                            >
                                Generate Kundali
                            </AwesomeButton>
                        </div>
                    </div> : <div className="kundali shadow-lg rounded-lg p-6 max-w-md w-full">
                        {
                            <AstrologyCard {...kundali} />
                        }
                    </div>}
        </div>
    );
}
