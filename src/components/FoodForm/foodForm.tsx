import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './foodForm.module.css';

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

const FoodForm: React.FC<Props> = ({foodItems, setFoodItems}) => {
    const [foodItem, setFoodItem] = useState<FoodItem>({
        name: '',
        time: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });

    useEffect(() => {
        const storedFoodItems = localStorage.getItem('foodItems');
        if (storedFoodItems) {
            setFoodItems(JSON.parse(storedFoodItems));
        }
    }, [setFoodItems]);

    const saveToLocalStorage = (items: FoodItem[]) => {
        localStorage.setItem('foodItems', JSON.stringify(items));
    };

    const history = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFoodItems = [...foodItems, foodItem];
        setFoodItems(updatedFoodItems);
        saveToLocalStorage(updatedFoodItems);

        console.log('Відправлені дані:', foodItem);

        setFoodItem({
            name: '',
            time: '',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        });

        // Перенаправляємо користувача на головну сторінку
        history('/');
    };

    return (
        <div className={styles.foodFormContainer}>
            <h2>Add Food Item</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={foodItem.name}
                        onChange={(e) => setFoodItem({...foodItem, name: e.target.value})}
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="text"
                        value={foodItem.time}
                        onChange={(e) => setFoodItem({...foodItem, time: e.target.value})}
                    />
                </div>
                <div>
                    <label>Calories:</label>
                    <input
                        type="number"
                        value={foodItem.calories}
                        onChange={(e) => setFoodItem({...foodItem, calories: parseFloat(e.target.value) || 0})}
                    />
                </div>
                <div>
                    <label>Protein:</label>
                    <input
                        type="number"
                        value={foodItem.protein}
                        onChange={(e) => setFoodItem({...foodItem, protein: parseFloat(e.target.value) || 0})}
                    />
                </div>
                <div>
                    <label>Carbs:</label>
                    <input
                        type="number"
                        value={foodItem.carbs}
                        onChange={(e) => setFoodItem({...foodItem, carbs: parseFloat(e.target.value) || 0})}
                    />
                </div>
                <div>
                    <label>Fat:</label>
                    <input
                        type="number"
                        value={foodItem.fat}
                        onChange={(e) => setFoodItem({...foodItem, fat: parseFloat(e.target.value) || 0})}
                    />
                </div>
                <button type="submit">Add Food Item</button>
            </form>
        </div>
    );
};

export default FoodForm;