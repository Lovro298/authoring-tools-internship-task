import { City } from "@/types/City"
import { UserLocation } from "@/types/UserLocation"
import myHaversineDistance from "@/functions/myHaversineDistance";
import AIHaversineDistance from "@/functions/AIHaversineDistance";
import { useEffect, useState } from "react";

interface TableProps {
    randomCities: City[];
    userLocation: UserLocation | undefined
    setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | undefined>>
}

const Table: React.FC<TableProps> = ({randomCities, userLocation, setUserLocation}) => {

    const [distances, setDistances] = useState<number[]>([]);
    const [distancesAI, setDistancesAI] = useState<number[]>([]);

    useEffect(() => {
        const distanceArray: number[] = [];
        const distanceAIArray: number[] = [];
        for(const city of randomCities) {
            const lat1 = city.lat;
            const lng1 = city.lng;
            const lat2 = userLocation?.lat;
            const lng2 = userLocation?.lng;
            const myDistance = myHaversineDistance(lat1, lat2!, lng1, lng2!);
            const AIDistance = AIHaversineDistance(lat1, lng1, lat2!, lng2!);
            
            distanceArray.push(myDistance);
            distanceAIArray.push(AIDistance);
        }

        setDistances(distanceArray);
        setDistancesAI(distanceAIArray);


    }, [userLocation, randomCities])

    const onCityPress = (lat:number, lng:number) => {
        setUserLocation({
            lat: lat,
            lng: lng
        })
    }

    return (
        <section className="w-full flex flex-col items-center justify-center">
            <div className="my-8">
                <h3 className="font-bold">Your coordinates:</h3>
                <p className="mt-2">lat: {userLocation?.lat}</p>
                <p>lng: {userLocation?.lng}</p>
            </div>
            <p></p>

            <div className="rounded-lg sm:w-11/12 w-full overflow-hidden border border-gray-600 mb-12 shadow-lg h-[600px]">
                <table className="table-auto w-full">
                    <thead className="bg-gray-100 block w-full">
                    <tr className="w-full flex">
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:w-1/2">City name</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Country name</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Country code</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Coords</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:w-1/2">Distance</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Distance AI</th>
                    </tr>
                    </thead>

                    <tbody className="block overflow-y-scroll h-[550px] w-full">
                    {randomCities.map((city, index) => (
                        <tr key={index} className="flex w-full">
                            <td 
                                className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:w-1/2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                onClick={() => onCityPress(city.lat, city.lng)}
                            >
                                {city.name} 
                            </td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">{city.country_name}</td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">{city.country}</td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">
                                <p>{city.lat}</p>
                                <p>{city.lng}</p>
                            </td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:w-1/2">{distances[index]} km</td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">{distancesAI[index]} km</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default Table