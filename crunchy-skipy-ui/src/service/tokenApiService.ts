import { tokenApi } from './network-agents';

const postTokenInformation = async (
    requestBody: string,
    onSuccess: () => void,
    onError: () => void,
): Promise<any> => {
    try {
        await tokenApi.postToken(requestBody);
        onSuccess();
    } catch (error) {
        onError();
    }
}

export default {
    postTokenInformation,
};