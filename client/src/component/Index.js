import axios from 'axios';
import { useEffect, useState } from 'react';
import '../component/Index.css';

axios.defaults.baseURL = "http://localhost:8080";
const Index = () => {
    const [data, setData] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch data on initial render
    }, []);

    useEffect(() => {
        if (startTime !== null && endTime !== null) {
            console.log("Start Time:", startTime);
            console.log("End Time:", endTime);
            filterData();
        }
    }, [startTime, endTime]);

    const fetchData = async () => {
        try {
            const res = await axios.get('/');
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDurationClick = async (duration) => {
        try {
            const start = new Date(data[0].ts); // Convert data[0].ts to Date object
            const end = new Date(start); // Create a new Date object based on start time

            end.setHours(start.getHours() + duration); // Add 'duration' hours to start time to get end time

            setStartTime(start.toISOString());
            setEndTime(end.toISOString());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterData = () => {
        const filteredData = data.filter(entry => {
            const entryDate = new Date(entry.ts);
            return entryDate >= new Date(startTime) && entryDate <= new Date(endTime);
        });
        setData(filteredData);
    };

    return (
        <div className='container-fluid'>
            <div className='header'>
                <button className='btn btn-light' onClick={() => handleDurationClick(1)}>1 hr</button>
                <button className='btn btn-primary' onClick={() => handleDurationClick(8)}>8 hr</button>
                <button className='btn btn-secondary' onClick={() => handleDurationClick(24)}>24 hr</button>
            </div>
            <div>
                <h5>Cycle Status</h5>
                <ul>
                    {data.map((entry, index) => (
                        <li key={index} className={`status-${entry.machine_status === 0 ? 'yellow' : entry.machine_status === 1 ? 'green' : 'red'}`}>
                            <p>Timestamp: {entry.ts}</p>
                            <p>Machine Status: {entry.machine_status}</p>
                            <p>Vibration: {entry.vibration}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Index;
