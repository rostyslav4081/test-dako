import React from 'react';
import styles from './activityList.module.css';
interface ActivityItem {
    name: string;
    duration: number;
    caloriesBurnedPerHour: number;
    time: string;
}

interface Props {
    activityItems: ActivityItem[];
}

const ActivityList: React.FC<Props> = ({ activityItems }) => {
    return (
        <div className={styles.activityListContainer}>
            <h2>Activity List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Duration (minutes)</th>
                    <th>Calories Burned per Hour</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {activityItems.map((activity, index) => (
                    <tr key={index}>
                        <td>{activity.name}</td>
                        <td>{activity.duration}</td>
                        <td>{activity.caloriesBurnedPerHour}</td>
                        <td>{activity.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityList;
