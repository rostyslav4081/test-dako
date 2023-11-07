import React, { useState } from 'react';
import styles from './goals.module.css';
interface GoalsData {
    calorieIntakeGoal: number;
    calorieBurnGoal: number;
    waterIntakeGoal: number;
}

interface Props {
    goals: GoalsData;
    setGoals: React.Dispatch<React.SetStateAction<GoalsData>>;
}

const Goals: React.FC<Props> = ({ goals, setGoals }) => {
    const [newGoals, setNewGoals] = useState<GoalsData>({ ...goals });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setGoals({ ...newGoals });
    };

    return (
        <div className={styles.goalsContainer}>
            <h2 className={styles.center}>Set Goals</h2>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.row}>
                    <label>Calorie Intake Goal:</label>
                    <input
                        type="number"
                        value={newGoals.calorieIntakeGoal}
                        onChange={(e) => setNewGoals({ ...newGoals, calorieIntakeGoal: +e.target.value })}
                    />
                </div>
                <div className={styles.row}>
                    <label>Calorie Burn Goal:</label>
                    <input
                        type="number"
                        value={newGoals.calorieBurnGoal}
                        onChange={(e) => setNewGoals({ ...newGoals, calorieBurnGoal: +e.target.value })}
                    />
                </div>
                <div className={styles.row}>
                    <label>Water Intake Goal:</label>
                    <input
                        type="number"
                        value={newGoals.waterIntakeGoal}
                        onChange={(e) => setNewGoals({ ...newGoals, waterIntakeGoal: +e.target.value })}
                    />
                </div>
                <button type="submit" >Set Goals</button>
            </form>
        </div>
    );
};

export default Goals;
