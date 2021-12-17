import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";
import {useSelector} from "react-redux";


const Portfolio = () => {
    const [data, setData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const portfolio = useSelector(state => state.data.portfolio)
    const amountList = useSelector(state => state.data.amountList)

    useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/`)
            .then(function (response: any) {
                setApiData(response.data)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        function update() {
            const data = apiData.filter((el: any) => portfolio.includes(el.symbol));
            const dataWithCount = data.map((el: any) => ({
                ...el,
                count: amountList[portfolio.findIndex((symbol: any) => symbol === el.symbol)]
            }));
            const totalBalance = dataWithCount.reduce((prevValue: number, coin: any) => prevValue + (coin.market_data.current_price.usd * coin.count), 0);
            setTotalBalance(totalBalance);
            setData(dataWithCount as any);
        }

        update();
    }, [portfolio, amountList, apiData]);

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
