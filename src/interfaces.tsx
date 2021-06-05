export interface user{
    "id": string;
    "firstname": string;
    "lastname": string;
    "avatarUrl": string;
    "email": string;
    "phone": string;
    "hasPremium": Boolean
    "bids": bid[];
    "showNotification": false,
    "redirect": false,
    "isValid": false,
    "isError": false,
    validation: Boolean;
}
export interface bid{
    "id": string;
    "carTitle": string;
    "amount": number;
    "created": string;
}