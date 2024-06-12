import { Provider } from "react-redux";
import { store } from "../model/store";

export const ReactStoreProviderDecorator = (story: any) => {
    return <Provider store={store}>{story()}</Provider>

}