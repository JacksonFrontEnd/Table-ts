export type addressType = { 
    street:string, 
    suite:string, 
    city: string, 
    zipcode:string, 
    geo:{ 
        lat:string,
        lng:string
    }
}
export type companyType = {
    name: string, 
    catchPhrase: string, 
    bs:string
}
export type tableRow = {
    id:number,
    name:string,
    username:string,
    email:string, 
    address:{ 
        street:string, 
        suite:string, 
        city: string, 
        zipcode:string, 
        geo:{ 
            lat:string,
            lng:string
        }
    }, 
    company:{ 
        name: string, 
        catchPhrase: string, 
        bs:string
    }
}
