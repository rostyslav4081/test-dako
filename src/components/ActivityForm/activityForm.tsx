import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './activityForm.module.css'

interface ActivityItem {
    name: string;
    duration: number;
    caloriesBurnedPerHour: number;
    time: string;
}

interface Props {
    activityItems: ActivityItem[];
    setActivityItems: (items: ActivityItem[]) => void;
}

const ActivityForm: React.FC<Props> = ({ activityItems, setActivityItems }) => {
    const [activityItem, setActivityItem] = useState<ActivityItem>({
        name: '',
        duration: 0,
        caloriesBurnedPerHour: 0,
        time: '',
    });

    useEffect(() => {
        const storedActivityItems = localStorage.getItem('activityItems');
        if (storedActivityItems) {
            setActivityItems(JSON.parse(storedActivityItems));
        }
    }, [setActivityItems]);

    const saveToLocalStorage = (items: ActivityItem[]) => {
        localStorage.setItem('activityItems', JSON.stringify(items));
    };

    const history = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedActivityItems = [...activityItems, activityItem];
        setActivityItems(updatedActivityItems);
        saveToLocalStorage(updatedActivityItems);

        console.log('Відправлені дані:', activityItem);

        setActivityItem({
            name: '',
            duration: 0,
            caloriesBurnedPerHour: 0,
            time: '',
        });

        // Redirect the user to the main page
        history('/');
    };

    return (
        <div className={styles.activityFormContainer}>
            <h2>Add Activity</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={activityItem.name}
                        onChange={(e) => setActivityItem({ ...activityItem, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Duration (in minutes):</label>
                    <input
                        type="number"
                        value={activityItem.duration}
                        onChange={(e) =>
                            setActivityItem({ ...activityItem, duration: parseFloat(e.target.value) || 0 })
                        }
                    />
                </div>
                <div>
                    <label>Calories Burned Per Hour:</label>
                    <input
                        type="number"
                        value={activityItem.caloriesBurnedPerHour}
                        onChange={(e) =>
                            setActivityItem({ ...activityItem, caloriesBurnedPerHour: parseFloat(e.target.value) || 0 })
                        }
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="text"
                        value={activityItem.time}
                        onChange={(e) => setActivityItem({ ...activityItem, time: e.target.value })}
                    />
                </div>
                <button type="submit">Add Activity</button>
            </form>
        </div>
    );
};

export default ActivityForm;
