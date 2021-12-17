import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";

const mockedPortfolioListCurrencyNumber = [0, 1, 3, 8, 9, 15, 16, 19];
const mockedPortfolioListCurrencyAmount = [1, 7, 55, 4, 5, 3, 2, 100];

const Portfolio = () => {
    const [data, setData] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/`)
            .then(function (response: any) {
                const data = response.data.filter((el: any, index: number) => mockedPortfolioListCurrencyNumber.includes(index));
                const dataWithCount = data.map((el: any, index: number) => ({
                    ...el,
                    count: mockedPortfolioListCurrencyAmount[index]
                }));
                const totalBalance = dataWithCount.reduce((prevValue: number, coin: any) => prevValue + (coin.market_data.current_price.usd * coin.count), 0);
                setTotalBalance(totalBalance);
                setData(dataWithCount);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{ paddingTop: 50, paddingHorizontal: 20, marginBottom: 90 }}
                >
                    <Text style={{ color: "#5d616f", fontSize: 14, fontWeight: "500" }}>
                        Portfolio Balance
                    </Text>
                    <Text
                        style={{
                            color: "#090C0D",
                            fontSize: 29,
                            fontWeight: "bold",
                            paddingTop: 5,
                        }}
                    >
                        ${totalBalance.toFixed(3)}
                    </Text>
                    {data.map((coin: any) => (
                        <View key={coin.id}>
                            <View
                                style={{
                                    paddingTop: 25,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View>
                                    <Image
                                        source={{ uri: coin.image.large }}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            borderWidth: 0.5,
                                            borderColor: "#ddd",
                                        }}
                                    />
                                </View>
                                <View style={{ flex:1,paddingLeft: 15 }}>
                                    <Text style={{fontSize:17,fontWeight:"400"}}>{coin.name}</Text>
                                </View>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={{fontSize:16,fontWeight:'300',alignSelf:'flex-end'}}>$ {(coin.count * coin.market_data.current_price.usd).toFixed(2)}</Text>
                                    <Text style={{fontSize:14,fontWeight:"300",color:"#5d616d",alignSelf:'flex-end'}}>{coin.count} {coin.symbol}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Portfolio;
