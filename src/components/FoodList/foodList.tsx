import React, {useEffect} from 'react';
import styles from './foodList.module.css'
interface FoodItem {
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface Props {
    foodItems: FoodItem[];
    setFoodItems: (items: FoodItem[]) => void;
}

const FoodList: React.FC<Props> = ({foodItems, setFoodItems}) => {
    useEffect(() => {
        const storedFoodItems = localStorage.getItem('foodItems');
        if (storedFoodItems) {
            setFoodItems(JSON.parse(storedFoodItems));
        }
    }, [setFoodItems]);

    return (
        <div className={styles.foodListContainer}>
            <h2>Food List</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                </tr>
                </thead>
                <tbody>
                {foodItems.map((food, index) => (
                    <tr key={index}>
                        <td>{food.name}</td>
                        <td>{food.time}</td>
                        <td>{food.calories}</td>
                        <td>{food.protein}</td>
                        <td>{food.carbs}</td>
                        <td>{food.fat}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodList;