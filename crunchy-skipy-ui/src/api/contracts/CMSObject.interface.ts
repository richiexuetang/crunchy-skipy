export type CMSContent = {
    bucket: string,
    policy: string,
    signature: string,
    key_pair_id: string,
    expires: string
};

export interface CMSObject {
    cms: CMSContent,
    cms_beta: CMSContent,
    service_available: boolean,
    default_marketing_opt_in: boolean,
};