//#region [ External ]

import { reset } from "@react-navigation/routers/lib/typescript/src/CommonActions";
import LottieView from "lottie-react-native";
import * as React from "react";
import { Dimensions, StyleSheet, Image, Text, TouchableOpacity, View, Platform, Linking, SafeAreaView } from "react-native";

import Carousel from "react-native-reanimated-carousel";

import SplashScreen from 'react-native-splash-screen';

const { width, height } = Dimensions.get("screen");
function getWalktroughList(appId: number) {
    return [
        {
            title: "Seni Seviyorum tatlisimmmmmmm",
            description: "Kalp Kalp Kalp",
            image: <Walkthrough_1 />
        },
        {
            title: "Topla, Kazan, Yüksel!",
            description: "Birbirinden eğlenceli görevlerle yeni yorumlar topla, puanlar kazan ve liderlik sıralamalarında yüksel!",
            image: <Walkthrough_2 />
        },
        {
            title: "Daha Çok Yorum Daha Çok Misafir",
            description: "Yorum sayıların arttıkça Tesisin potansiyel misafirlerin için daha görünür ve tercih edilir hale gelir.\n\nHazırsan başlayalım!",
            image: <Walkthrough_3 />
        }
    ]
}

export class Walkthrough extends React.Component<{ navigation: any, route: any }, { activeIndex: number }> {
    _carousel: any = null;
    WALKTHROUGHS = getWalktroughList(-1);

    constructor(props: any) {
        super(props);

        this.state = {
            activeIndex: 0
        }

        
    }

    componentDidMount() {
        const ac = new AbortController();
    
        setTimeout(() => {
          SplashScreen.hide();
        }, 500);
    
        return function cleanup() {
            ac.abort();
          };
    }


    renderItemContent(title: string, description: string, image: any, index: number) {

        return (
            <View style={styles.content}>
                <View style={{ alignItems: "center", justifyContent: 'center', left: index == 0 ? 10 : 0 }}>
                    {image}
                </View>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        );
    }

    render() {
        const { activeIndex } = this.state;

        let text = activeIndex == this.WALKTHROUGHS.length - 1 ? "Hemen Başla" : "İleri";

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this._carousel.scrollTo({ index: this.WALKTHROUGHS.length - 1, animated: false });
                    this.setState({ activeIndex: this.WALKTHROUGHS.length - 1 });
                }} style={{
                    position: 'absolute',
                    top: 20 + 50,
                    right: 20,
                    zIndex: 1000
                }}>
                    <Text style={{
                        //fontFamily: themeConst.Fonts.Default,
                        //fontSize: themeConst.Text.TextFieldSize,
                        fontWeight: '600',
                        //color: themeConst.Colors.PrimaryColor
                    }}>Atla</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <Carousel ref={c => { this._carousel = c; }}
                        pagingEnabled loop={false} style={{  }}
                        data={this.WALKTHROUGHS} width={width}
                        renderItem={({ item, index }) => this.renderItemContent(item.title, item.description, item.image, index)}
                        onSnapToItem={(index) => {
                            this.setState({ activeIndex: index })
                        }}
                    />
                </View>
                <View style={{backgroundColor: 'red' }}>
                    <View>
                        
                    </View>
                </View>
                {/* <Pagination
                    containerStyle={styles.pagination}
                    dotsLength={this.WALKTHROUGHS.length}
                    dotColor={themeConst.Colors.AccentColor}
                    dotStyle={styles.paginationDot}
                    activeDotIndex={activeIndex}
                    inactiveDotColor={themeConst.Colors.PrimaryColor}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._carousel}
                /> */}
                <TouchableOpacity style={styles.button} activeOpacity={0.8}
                    onPress={() => {
                        if (activeIndex < this.WALKTHROUGHS.length - 1) {
                            this._carousel.next();
                            this.setState({ activeIndex: activeIndex + 1 });
                        } else {
                            //reset("Login", {});
                            //reset("Main", {});
                        }
                    }}>
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
                <View style={{ height: 50 }} />
            </SafeAreaView>
        );
    }
}

const Walkthrough_1 = () => {
    return <LottieView source={require("../assets/1.json")} autoPlay loop style={styles.image} />
}

const Walkthrough_2 = () => {
    return <LottieView source={require("../assets/1.json")} autoPlay loop style={styles.image} />
}

const Walkthrough_3 = () => {
    return <LottieView source={require("../assets/1.json")} autoPlay loop style={styles.image} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
    },
    pagination: {
        marginTop: -12,
        padding: 0,
        width: width,
        justifyContent: "center",
        //backgroundColor:'pink'
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 4,
        margin: 0
    },
    content: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        padding: 24
    },
    header: {
        color: 'blue',
        fontSize: 32,
        fontWeight: "700",
        marginTop: 32,
        textAlign: 'center',
        marginBottom: 8
    },
    description: {
        textAlignVertical: "center",
        color: 'red',
        marginTop: 12,
        textAlign: 'center'
    },
    image: {
        width: width * 0.65,
        height: width * 0.65,
    },
    button: {
        width: "90%",
        height: 56,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 32,
        marginHorizontal: 24,
        borderRadius: 56
    },
    buttonText: {
        fontWeight: "700",
    }
});
