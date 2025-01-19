import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext'; // Assuming theme context is available
import { AwesomeButton } from 'react-awesome-button';

// Define types for the Yoga Data and Astrology Card props

export interface AstrologyCardProps {
    nakshatra: string;
    chandra_rasi: string;
    zodiac: string;
    pada: number;
    ganam: string;
    nadi: string;
    has_mangal_dosha: boolean;
    mangal_desc: string;
}

// Card Component
const AstrologyCard: React.FC<AstrologyCardProps> = ({
    nakshatra,
    chandra_rasi,
    zodiac,
    pada,
    ganam,
    nadi,
    has_mangal_dosha,
    mangal_desc,
}) => {
    const [text,setText] = useState("")
    const { theme } = useTheme(); // Get current theme from context\
    console.log(JSON.stringify({
        "message": "Give Career Guidance, Relationships,Personal Gropwth, Family and Social Connections, gemstones suggestions based on data"
    }));
    
    const fetchDATA = async () => {
        try {
            const response = await fetch("http://localhost:5000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"  // Set content type header to JSON
                },
                body: JSON.stringify({
                    "message": "Give Career Guidance, Relationships, Personal Growth, Family and Social Connections, gemstones suggestions based on data"
                })
            });

            if (!response.ok) {  // Check if the response is OK
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();  // Parse JSON response
            const text = json.outputs[0].outputs[0].messages[0].message;
            setText(text);  // Assuming setText is a state setter function

        } catch (error) {
            console.error('Error fetching data:', error);  // Log any errors
        }
    };
    return (
        <motion.div
            className={`items-center justify-center${theme === 'light' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-black to-blue-900'
                } text-white p-6 rounded-lg shadow-lg max-w-md mx-auto`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-semibold mb-2">{nakshatra} - {zodiac}</h2>
            <p className="text-lg font-medium"><strong>Chandra Rasi:</strong> {chandra_rasi}</p>
            <p className="text-lg font-medium"><strong>Pada:</strong> {pada}</p>

            <h3 className="text-xl font-bold mt-4">Additional Information</h3>
            <p className="text-lg"><strong>Ganam:</strong> {ganam}</p>
            <p className="text-lg"><strong>Nadi:</strong> {nadi}</p>

            <h4 className="text-xl font-bold mt-4">Mangal Dosha:</h4>
            <p className="text-lg">{has_mangal_dosha ? mangal_desc : 'No Mangal Dosha'}</p>
            {
                text != "" ? 
                    <div className="mt-6 h-28 overflow-y-scroll">
                        {
                            text
                        }
                    </div> : <AwesomeButton
                        type='primary'
                        onPress={() => {
                            fetchDATA()
                        }}
                    >
                        Generate More Insights
                    </AwesomeButton>
            }
            
        </motion.div>
    );
};


export default AstrologyCard;