import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, CssBaseline, Typography, AppBar, Toolbar, Button } from '@mui/material';
import FoodForm from './components/FoodForm/foodForm';
import ActivityForm from './components/ActivityForm/activityForm';
import Goals from './components/Goals/goals';
import FoodList from './components/FoodList/foodList';
import ActivityList from './components/ActivityList/activityList';
import './App.css';

interface FoodItem {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ActivityItem {
  name: string;
  duration: number;
  caloriesBurnedPerHour: number;
  time: string;
}

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  const [goals, setGoals] = useState({
    calorieIntakeGoal: 0,
    calorieBurnGoal: 0,
    waterIntakeGoal: 0,
  });

  useEffect(() => {
    const savedFoodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
    const savedActivityItems = JSON.parse(localStorage.getItem('activityItems') || '[]');
    const savedGoals = JSON.parse(localStorage.getItem('goals') || '{}');

    setFoodItems(savedFoodItems);
    setActivityItems(savedActivityItems);
    setGoals(savedGoals);
  }, []);

  useEffect(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    localStorage.setItem('activityItems', JSON.stringify(activityItems));
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [foodItems, activityItems, goals]);

  return (
      <Router>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="logo">Food and Activity Tracker</Link>
            </Typography>
            <Button color="inherit" component={Link} to="/food-form">
              Add Food
            </Button>
            <Button color="inherit" component={Link} to="/activity-form">
              Add Activity
            </Button>
            <Button color="inherit" component={Link} to="/goals">
              Goals
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/food-form" element={<FoodForm foodItems={foodItems} setFoodItems={setFoodItems} />} />
            <Route path="/activity-form" element={<ActivityForm activityItems={activityItems} setActivityItems={setActivityItems} />} />
            <Route path="/goals" element={<Goals goals={goals} setGoals={setGoals} />} />
            <Route
                path="/"
                element={
                  <div>
                    <FoodList foodItems={foodItems} setFoodItems={setFoodItems} />
                    <ActivityList activityItems={activityItems} />
                  </div>
                }
            />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
