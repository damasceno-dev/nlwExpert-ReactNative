import {View, Text, FlatList, SectionList} from 'react-native'
import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold} from '@expo-google-fonts/inter'
import { Header } from '@/components/header'
import {CATEGORIES, MENU, ProductProps} from "@/utils/data/products"
import { CategoryButton } from '@/components/category-button'
import { useRef, useState } from 'react'
import { Product } from '@/components/product'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'
//to start project: npx expo start
export default function Home() {

    const cartStore = useCartStore();
    const [category, setCategory] = useState(CATEGORIES[0])
    const sectionListRef = useRef<SectionList<ProductProps>>(null);

    const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);

    function handleCategorySelected(selectedCategory:string) {
        setCategory(selectedCategory);
        const sectionIndex = CATEGORIES.findIndex(c => c === selectedCategory);

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems}></Header>
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
            <SectionList
                ref={sectionListRef}
                className='flex-1 pb-20'
                sections={MENU}
                keyExtractor={item => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item}) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={item}/>
                    </Link>
                )}
                renderSectionHeader={({section: {title}}) => 
                    <Text className='text-white text-xl font-heading mt-8 mb-3'>{title}</Text>}
                contentContainerStyle={{paddingBottom: 100}}
            />
        </View>
        )
 }
