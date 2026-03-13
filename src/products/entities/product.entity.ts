import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {


    @PrimaryGeneratedColumn('uuid')  //Esto es para generar un id unico usamos el uuid que viene de typeorm
    id: String;

    @Column('text', { unique: true }) //Esto es para generar un titulo unico usamos el text que viene de typeorm Y el
    //unique es para que no se repita el titulo
    title: String;

    @Column('text', { unique: true })
    description: String;


    @Column('float')
    price: Number;

    @Column('text', { unique: true })
    slug: String;



    @Column('float')
    stock: Number;

    @Column('text', { array: true })  //arreglo de strings
    sizes: String[];
}
