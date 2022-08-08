export type EpisodeMetadata = {
    series_id: string;
    series_title: string;
    series_slug_title: string;
    season_id: string;
    season_title: string;
    season_slug_title: string;
    season_number: number;
    episode_number: number;
    episode: string;
    sequence_number: number;
    duration_ms: number;
    episode_air_date: Date;
    is_premium_only: boolean;
    is_mature: boolean;
    mature_blocked: boolean;
    is_subbed: boolean;
    is_dubbed: boolean;
    is_clip: boolean;
    available_offline: boolean;
    maturity_ratings: string[];
    subtitle_locales: string[];
    availability_notes: string;
};

export type Item = {
    __class__: string;
    __href__: string;
    __links__: any;
    __actions__: any;
    id: string;
    external_id: string;
    channel_id: string;
    title: string;
    description: string;
    promo_title: string;
    promo_description: string;
    type: string;
    slug: string;
    slug_title: string;
    images: any;
    episode_metadata: EpisodeMetadata;
    playback: string;
    linked_resource_key: string;
};

export interface EpisodeIdObject {
    __class__: string;
    __href__: string;
    __resource_key__: string;
    __links__: any;
    __actions__: any;
    total: number;
    items: Item[];
}