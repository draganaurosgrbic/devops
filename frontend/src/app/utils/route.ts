export enum Route {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    OFFER_FORM = 'offer-form',
    OFFERS = 'offers',
    PROFILES = 'profiles',
    PUBLIC_PROFILES = 'profiles/public',
    CONNECTIONS = 'profiles/connections',
    CONNECTION_REQUESTS = 'profiles/connection_requests',
    PROFILE_FORM = 'profile-form',
    NOTIFICATIONS = 'notifications',
    EVENTS = 'events',
    MESSAGE = 'message/:sender_id/:recepient_id',
    POSTS = 'posts/:id',
    PUBLIC_POSTS = 'posts/public/:id',
    COMMENTS = 'comments/:id',
    PUBLIC_COMMENTS = 'comments/public/:id',
    POST_FORM = 'post-form',
    UPLOAD = '/api/posts/upload',
    MY_POSTS = "posts/private/mine"
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}
