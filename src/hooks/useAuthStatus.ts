import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useAuthStatus = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
            const useToken = await AsyncStorage.getItem("userToken");
            setIsSignedIn(!!useToken);
            } catch (error) {
                console.log("Failed to load token",error)
            } finally {
                setTimeout(() => setIsLoading(false),5000);
            }
        };
        checkAuthStatus();
    }, [])

    return {isLoading, isSignedIn}
}

export default useAuthStatus;