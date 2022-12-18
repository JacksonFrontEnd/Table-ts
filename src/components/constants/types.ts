export type columnType = Array<{
 field:string,
 fieldName: string, 
 isSort:boolean,
 type?:string
}>
export type endpointType = {
    id: string,
    status: 'active' | 'archive'
    sum: number,
    qty: number,
    volume: number,
    name: string,
    delivery_date: string,
    currency: string
}