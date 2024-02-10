import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, View, Text } from "react-native";

export default function Product() {
    
    const navigation = useNavigation();
    const {id} = useLocalSearchParams();
    const cartStore = useCartStore();
    const product = PRODUCTS.filter((item) => item.id === id)[0];

    function handleAddCart() {
        cartStore.add(product);
        navigation.goBack();
    }

    return (
        <View className="flex-1">
            <Image className="w-full h-52" source={product.cover} resizeMode="cover"></Image>
            <View className="p-5 mt-8 flex-1">
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">{product.description}</Text>
                {product.ingredients.map((ingredient) => (
                    <Text className="text-slate-400 font-body text-base leading-6" key={ingredient}>{"\u2022"} {ingredient}</Text>
                ))}
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddCart}>
                    <Button.Icon>
                        <Feather name='plus-circle' size={20}></Feather>
                    </Button.Icon>
                    <Button.Text>
                        Adicionar ao pedido
                    </Button.Text>
                </Button>

                <LinkButton title='Voltar ao cardápio' href="/"></LinkButton>
            </View>
        </View>
    )
}