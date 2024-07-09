import { CommonActions } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import * as React from "react";
import { Colors } from '../../app.json';
import { Dimensions, StyleSheet, Image, Text, TouchableOpacity, View, Platform, Linking, SafeAreaView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import SplashScreen from 'react-native-splash-screen';

const { width, height } = Dimensions.get("screen");

function getWalktroughList() {
    return [
        {
            title: "Bugün ne izlesem?",
            description: "Artık düşünmeye gerek yok çünkü Filmania`da buldun!",
            image: <Walkthrough_1 />
        },
        {
            title: "Tek tıkla keşfet! Filmania senin için seçsin...",
            description: "Rastgele filmlerle bilmediğin dünyalara yolculuğa çık!",
            image: <Walkthrough_2 />
        },
        {
            title: "Kaydet, kendi listeni oluştur",
            description: "Favori film ve dizilerini kendi oluşturduğun listene kaydet",
            image: <Walkthrough_3 />
        },
        {
            title: "Ve daha fazlası için ara!",
            description: "Favori filmler, IMDB puanları, fragmanlar, merak ettiklerin için şimdi...",
            image: <Walkthrough_4 />
        }
    ]
}

export class Walkthrough extends React.Component<{ navigation: any, route: any }, { activeIndex: number }> {
    _carousel: any = null;
    WALKTHROUGHS = getWalktroughList();

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

    handleResetNav(isLogin: boolean) {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "Login",
                        params: {
                            isLogin: isLogin
                        }
                    }
                ],
            })
        )
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

        const isLastIndex: boolean = activeIndex == this.WALKTHROUGHS.length - 1

        let text = isLastIndex ? "Giriş Yap" : "İleri";

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => {
                    this._carousel.scrollTo({ index: this.WALKTHROUGHS.length - 1, animated: true });
                    this.setState({ activeIndex: this.WALKTHROUGHS.length - 1 });
                }} style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>Atla</Text>
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
                <Pagination activeIndex={activeIndex} dotsLength={this.WALKTHROUGHS.length} />
                <View style={styles.buttonContainer}>
                    {
                        isLastIndex &&
                        <TouchableOpacity style={styles.button} activeOpacity={0.6}
                        onPress={() => {
                            this.handleResetNav(false)
                        }}>
                        <Text style={styles.buttonText}>Kaydol</Text>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button} activeOpacity={0.6}
                        onPress={() => {
                            if (activeIndex < this.WALKTHROUGHS.length - 1) {
                                this._carousel.next();
                                this.setState({ activeIndex: activeIndex + 1 });
                            } else {
                                this.handleResetNav(true)
                            }
                        }}>
                        <Text style={styles.buttonText}>{text}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 50 }} />
            </SafeAreaView>
        );
    }
}

const Walkthrough_1 = () => {
    return <LottieView source={require("../assets/0.json")} autoPlay loop style={styles.image} />
}

const Walkthrough_2 = () => {
    return <LottieView source={require("../assets/1.json")} autoPlay loop style={styles.image} />
}

const Walkthrough_3 = () => {
    return <LottieView source={require("../assets/2.json")} autoPlay loop style={styles.image} />
}

const Walkthrough_4 = () => {
    return <LottieView source={require("../assets/3.json")} autoPlay loop style={styles.image} />
}

const Pagination = ({ activeIndex, dotsLength }: any) => {
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: dotsLength }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeIndex === index ? styles.activeDot : styles.inactiveDot,
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: Colors.PrimaryDarkColor
    },
    pagination: {
        marginTop: -12,
        padding: 0,
        width: width,
        justifyContent: "center",
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
        padding: 24,
    },
    header: {
        color: Colors.TextColor,
        fontSize: 32,
        fontWeight: "700",
        marginTop: 32,
        textAlign: 'center',
        marginBottom: 8,
    },
    description: {
        color: Colors.TextColor,
        marginTop: 30,
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 26,
    },
    image: {
        width: width * 0.60,
        height: width * 0.60,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    button: {
        width: "25%",
        height: 30,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 24,
        borderBottomColor: Colors.PrimaryLightColor,
        borderBottomWidth: 2,
    },
    buttonText: {
        fontWeight: "700",
        fontSize: 20,
        color: Colors.TextColor,
        textAlign: 'center',
    },
    skipButton: {
        position: 'absolute',
        top: 100,
        right: 20,
        zIndex: 1000,
        borderBottomColor: Colors.PrimaryLightColor,
        borderBottomWidth: 2,
    },
    skipButtonText: {
        color: Colors.TextColor,
        fontSize: 18,
        width: 40,
        height: 23,
        textAlign: 'center'
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginBottom: 40,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: Colors.PrimaryLightColor,
    },
    inactiveDot: {
        backgroundColor: Colors.TextColor,
        opacity: 0.4
    },
});
