import { authenticationApi } from './network-agents';

const postTokenInformation = async (
    requestBody: string,
    onSuccess: () => void,
    onError: () => void,
): Promise<any> => {
    try {
        await authenticationApi.postToken(requestBody);
        onSuccess();
    } catch (error) {
        onError();
    }
}

const getIndexData = async (
    onSuccess: () => void,
    onError: () => void,
): Promise<any> => {
    try {
        await authenticationApi.getIndex();
        onSuccess();
    } catch (error) {
        onError();
    }
}

export default {
    postTokenInformation,
    getIndexData,
};