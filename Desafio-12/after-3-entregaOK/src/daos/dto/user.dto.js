export class GetContactDto{
    constructor(contactDB){
        this.nombreCompleto = contactDB.nombreCompleto;
        this.telefono = contactDB.telefono;
        this.email = contactDB.email;
    }
};
