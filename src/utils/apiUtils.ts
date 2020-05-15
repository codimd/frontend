import {getMe} from "../api/user";
import {LoginStatus, UserState} from "../redux/user/types";
import {setUser} from "../redux/user/methods";
import {store} from "./store";

export const getAndSetUser = () => {
    getMe()
        .then((me) => {
            if (me.status === 200) {
                return (me.json() as Promise<UserState>);
            }
        })
        .then(user => {
            if (!user) {
                return;
            }
            setUser({
                status: LoginStatus.ok,
                id: user.id,
                name: user.name,
                photo: user.photo,
            });
        });
}

export const getBackendUrl = () => {
    return store.getState().frontendConfig.backendUrl;
}

export const expectResponseCode = (code: number = 200): ((response: Response) => Promise<any>) => {
    return (response: Response) => {
        if (response.status !== code) {
            return Promise.reject(`Response code not ${code}`);
        } else {
            return Promise.resolve(response);
        }
    }
}