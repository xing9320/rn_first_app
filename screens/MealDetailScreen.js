import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals'
const ListItem = (props) => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailScreen = (props) => {
    const availbeMeals = useSelector(state => state.meals.meals);
    const mealId = props.route.params.mealId;
    const currentMealsIsFavorite = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealId)
    );
    const selectMeal = availbeMeals.find(meal => meal.id === mealId);
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setOptions({
            title: selectMeal.title
        });
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [selectMeal, toggleFavoriteHandler])

    useEffect (() => {
        props.navigation.setParams({isFav: currentMealsIsFavorite});
    },[currentMealsIsFavorite]);

    useEffect(() => {
        props.navigation.setOptions(({route}) => ({
            headerRight: () => (
                <HeaderButton title="Favourite" onPress={route.params.toggleFav}>
                    <Ionicons
                        name= {currentMealsIsFavorite ? "star" : "star-outline"}
                        size={23}
                        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} />
                </HeaderButton>
            )
        }))
    },[currentMealsIsFavorite])
    return (
        <ScrollView>
            <Image source={{ uri: selectMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectMeal.duration}m</DefaultText>
                <DefaultText>{selectMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;