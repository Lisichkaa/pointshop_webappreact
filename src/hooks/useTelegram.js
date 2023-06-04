const tg = window.Telegram.WebApp;

export function useTelegram() {    

    const onClose = () => {
        tg.close()
    }
    
    console.log(window.Telegram);

    return {     
        onClose,   
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}