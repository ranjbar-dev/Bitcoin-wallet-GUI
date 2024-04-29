export const useConfig = () => {

    const conf = useAppConfig()

    return {
        
        username: conf.username,
        password: conf.password,
    }
} 