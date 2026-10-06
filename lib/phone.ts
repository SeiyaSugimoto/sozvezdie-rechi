export function telephone(phone:string){return `tel:${phone.replace(/^8/,'+7').replace(/[^+\d]/g,'')}`;}
