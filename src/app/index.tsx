import {View, Text, FlatList} from 'react-native'
import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold} from '@expo-google-fonts/inter'
import { Header } from '@/components/header'
import {CATEGORIES} from "@/utils/data/products"
import { CategoryButton } from '@/components/category-button'
import { useState } from 'react'
//to start project: npx expo start
export default function Home() {

    const [category, setCategory] = useState(CATEGORIES[0])
    function handleCategorySelected(selectedCategory:string) {
        setCategory(selectedCategory);
    }

    return (
        <View className="pt-8">
            <Header title="Faça seu pedido" cartQuantityItems={2}></Header>
            <FlatList
                data={CATEGORIES}
                keyExtractor={i => i}
                renderItem={({item}) => (
                    <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelected(item)}></CategoryButton>
                )}
                horizontal
                className='max-h-10 mt-5'
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        )
 }
