import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions, TextInput, Button, TouchableOpacity } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { Colors } from '../../app.json';
import React, { useEffect, useState } from 'react';
import UserIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/MaterialIcons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const { width, height } = Dimensions.get('screen');


export default function LoginScreen({route, navigation}: any) {

    const [showLogin, setShowLogin] = useState<Boolean | null>(null);
    const [errorCode, setErrorCode] = useState<string | null>(null);

    const auth = getAuth();

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().min(5, 'Isim En az 5 karakter olmalı').required('Ad Soyad zorunlu'),
        email: Yup.string().email('Geçersiz e-posta').required('E-posta zorunlu'),
        password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre zorunlu'),
        passwordCheck: Yup.string()
            .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
            .required('Şifre doğrulama zorunlu'),
    });

    const validationSchemaLogin = Yup.object().shape({
        email: Yup.string().email('Geçersiz e-posta').required('E-posta zorunlu'),
        password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre zorunlu'),
    });

    useEffect(() => {
        setShowLogin(route?.params?.isLogin)
    }, [])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setErrorCode(null)
        }, 2000)


        return () => {
            clearTimeout(timeOut)
        }

    }, [errorCode])

    const formik = useFormik({
        initialValues: { fullName: '', email: '', password: '', passwordCheck: '' },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log({values}, showLogin);
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("register user: ", user)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                {
                                    name: "Main"
                                }
                            ],
                        })
                    )
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorCode(errorMessage);
                    console.log({errorCode, errorMessage})
                });
        },
    });

    const formikLogin = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validationSchemaLogin,
        onSubmit: values => {
            console.log({values});
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("login user: ", user)

                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                {
                                    name: "Main"
                                }
                            ],
                        })
                    )
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorCode(errorMessage);
                    console.log({errorCode, errorMessage})
            });
        },
    });

    
    if (showLogin === null) {
        return
    }

    function handleResetNav(isLogin: boolean) {
        navigation.dispatch(
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


    function renderRegisterContent() {
        return (
                <ScrollView contentContainerStyle={{minHeight: "95%"}}
                style={styles.registerContainer}>
                    <View style={{}}>
                        <View style={styles.input}>
                            <UserIcon name="user" size={16} color={Colors.TextColor} />
                            <TextInput
                                value={formik.values.fullName}
                                maxLength={36}
                                style={styles.inputText}
                                onChangeText={formik.handleChange("fullName")}
                                onBlur={formik.handleBlur("fullName")}
                                placeholder="Ad Soyad"
                                placeholderTextColor={Colors.TextColor}
                            />
                            <View style={{position: 'absolute', bottom: -22, left: 10 }}>
                                {formik.touched.fullName && formik.errors.fullName &&
                                <Text style={{color: 'red'}}>{formik.errors.fullName}</Text>}
                            </View>
                        </View>
                        
                        <View style={styles.input}>
                            <EmailIcon name="email" size={16} color={Colors.TextColor} />
                            <TextInput
                                value={formik.values.email}
                                maxLength={36}
                                style={styles.inputText}
                                onChangeText={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                                placeholder="E-posta"
                                placeholderTextColor={Colors.TextColor}
                            />
                            <View style={{position: 'absolute', bottom: -22, left: 10 }}>
                                {formik.touched.email && formik.errors.email &&
                                <Text style={{color: 'red'}}>{formik.errors.email}</Text>}
                            </View>
                        </View>
                        <View style={styles.input}>
                            <PasswordIcon name="key" size={16} color={Colors.TextColor} />
                            <TextInput
                                maxLength={36}
                                style={styles.inputText}
                                value={formik.values.password}
                                onBlur={formik.handleBlur("password")}
                                onChangeText={formik.handleChange("password")}
                                placeholder="Şifre"
                                placeholderTextColor={Colors.TextColor}
                                secureTextEntry
                            />
                            <View style={{position: 'absolute', bottom: -22, left: 10 }}>
                                {formik.touched.password && formik.errors.password &&
                                <Text style={{color: 'red'}}>{formik.errors.password}</Text>}
                            </View>
                        </View>
                        <View style={styles.input}>
                            <PasswordIcon name="key" size={16} color={Colors.TextColor} />
                            <TextInput
                                style={styles.inputText}
                                maxLength={36}
                                onBlur={formik.handleBlur("passwordCheck")}
                                value={formik.values.passwordCheck}
                                onChangeText={formik.handleChange("passwordCheck")}
                                placeholder="Şifreyi doğrula"
                                placeholderTextColor={Colors.TextColor}
                                secureTextEntry
                            />
                            <View style={{position: 'absolute', bottom: -22, left: 10 }}>
                                {formik.touched.passwordCheck && formik.errors.passwordCheck &&
                                <Text style={{color: 'red'}}>{formik.errors.passwordCheck}</Text>}
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", marginLeft: 10, marginTop: 20 }}>
                        <Text style={{color: Colors.TextColor}}> 
                            Zaten hesabım var.     
                        </Text>
                        <TouchableOpacity onPress={() => {
                            handleResetNav(true)
                        }} style={{ marginLeft: 5}}>
                                <Text style={{color: Colors.PrimaryLightColor }}>
                                    GİRİŞ YAP
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        {
                            errorCode &&
                            <Text style={styles.errorText}>{errorCode}</Text>
                        }
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => formik.handleSubmit()}>
                            <Text style={{color: Colors.TextColor, textAlign: 'center', fontWeight: "700" }}>KAYDOL</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        )
    }

    function renderLoginContent() {
        return (
            <View style={styles.loginContainer}>
                <View style={{}}>
                    <View style={styles.input}>
                        <EmailIcon name="email" size={16} color={Colors.TextColor} />
                        <TextInput
                            value={formikLogin.values.email}
                            maxLength={36}
                            style={styles.inputText}
                            onChangeText={formikLogin.handleChange("email")}
                            onBlur={formikLogin.handleBlur("email")}
                            placeholder="E-posta"
                            placeholderTextColor={Colors.TextColor}
                        />
                        <View style={{position: 'absolute', bottom: -22, left: 10 }}>
                                {formikLogin.touched.email && formikLogin.errors.email &&
                                <Text style={{color: 'red'}}>{formikLogin.errors.email}</Text>}
                        </View>
                    </View>
                    <View style={styles.input}>
                        <PasswordIcon name="key" size={16} color={Colors.TextColor} />
                        <TextInput
                            maxLength={36}
                            style={styles.inputText}
                            value={formikLogin.values.password}
                            onChangeText={formikLogin.handleChange("password")}
                            onBlur={formikLogin.handleBlur("password")}
                            placeholder="Şifre"
                            placeholderTextColor={Colors.TextColor}
                            secureTextEntry
                        />
                        <View style={{position: 'absolute', bottom: -22, left: 10 }}>
                                {formikLogin.touched.password && formikLogin.errors.password &&
                                <Text style={{color: 'red'}}>{formikLogin.errors.password}</Text>}
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: "row", marginLeft: 10, marginTop: 20 }}>
                    <Text style={{color: Colors.TextColor}}> 
                        Filmania'da yeniyim.    
                    </Text>
                    <TouchableOpacity onPress={() => {
                        handleResetNav(false)
                    }} style={{ marginLeft: 5}}>
                            <Text style={{color: Colors.PrimaryLightColor }}>
                                KAYDOL
                            </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center" }}>
                    {
                        errorCode &&
                        <Text style={styles.errorText}>{errorCode}</Text>
                    }
                    <TouchableOpacity style={[styles.buttonContainer, { bottom: -30}]} onPress={() => formikLogin.handleSubmit()}>
                        <Text style={{color: Colors.TextColor, textAlign: 'center', borderBottomWidth: 1 , borderBottomColor: "red", fontWeight: "700" }}>GİRİŞ YAP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderContent() {
        
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={{color: Colors.TextColor, fontSize: 35, textAlign: "center"}}>FILMANIA</Text>
                </View>
                <View style={styles.content}>
                    {
                        showLogin ?
                        renderLoginContent()
                        :
                        renderRegisterContent()
                    }
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderContent()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PrimaryDarkColor
    },
    wrapper: {

    },
    errorText: {
        color: 'red',
        marginTop: 30,
    },
    header: {
        height: "25%",
        justifyContent: "center"
    },
    content: {
        backgroundColor: "#23324D",
        height: height,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    input: {
        height: 50,
        borderRadius: 16,
        borderColor: Colors.TextColor,
        borderWidth: 1,
        color: Colors.TextColor,
        padding: 10,
        marginBottom: 26,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        position: 'relative'
    },
    inputText: {
        color: Colors.TextColor,
        width: "80%"
    },
    registerContainer: {
        marginTop: 60,
        margin: 30,
    },
    buttonContainer: {
        height: 30,
        width: 100,
        justifyContent: "center",
        textAlign: 'center',
        borderBottomColor: Colors.PrimaryLightColor,
        borderBottomWidth: 2,
        marginTop: 30
    },
    loginContainer: {
        marginTop: 60,
        margin: 30,
    }
});